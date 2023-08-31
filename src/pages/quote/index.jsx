import React, { useEffect, useState } from 'react'
import { Checkbox, FormControlLabel, Typography, } from '@mui/material';
import imgs from "../../../assets/constants/imgs";
import styles from './index.module.scss'
import Image from 'next/image';
import CloseIcon from '@mui/icons-material/Close';
import { FaArrowLeft } from 'react-icons/fa';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import DatePicker from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
import { DigitalClock } from '@mui/x-date-pickers/DigitalClock';
import PhoneInput from "react-phone-input-2";
import 'react-phone-input-2/lib/style.css'
import AuthCode from 'react-auth-code-input';
import { motion } from "framer-motion";
import { BsCheckLg } from 'react-icons/bs';
import Link from 'next/link';
import ProgressBar from "@ramonak/react-progress-bar";
import toast from 'react-hot-toast';
import { ThreeDots } from 'react-loader-spinner'
import { useRouter } from 'next/router';
import { useTranslation } from 'react-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';


const Quote = () => {
  const { t } = useTranslation();
  const { logo, } = imgs;
  const [step, setStep] = useState(1);
  const router = useRouter();
  const [selectedDate, setSelectedDate] = useState(null);
  const [timeValue, setTimeValue] = useState(null);
  const [phoneNum, setPhoneNum] = useState('');
  const [asp, setAsp] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedValues, setSelectedValues] = useState([]);
  const [forValues, setForValues] = useState([]);
  const [formData, setFormData] = useState({
    fname: '',
    lname: '',
    email: '',
    phone: '',
    agree: false,
    selectedForm_1: '',
    selectedForm_2: '',
    selectedDate: '',
    selectedTime: ''

  });

  const [updatedFormData, setUpdatedFormData] = useState();
  const [message, setMessage] = useState();
  const [enteredOtp, setEnteredOtp] = useState("");
  const [otp, setOtp] = useState('');

  const handleAsp = () => {
    setAsp(true)
    setTimeValue(null)
    setStep(step + 2);
  }

  function handleGoBack() {
    router.back()
  }


  const treatments = [
    { title: t("quote_page:treatment_1") },
    { title: t("quote_page:treatment_2") },
    { title: t("quote_page:treatment_3") },
    { title: t("quote_page:treatment_4") },
    { title: t("quote_page:treatment_5") },
    { title: t("quote_page:treatment_6") },
    { title: t("quote_page:treatment_7") },
    { title: t("quote_page:treatment_8") },
    { title: t("quote_page:treatment_9") },
    { title: t("quote_page:treatment_10") },
    { title: t("quote_page:treatment_11") },
    { title: t("quote_page:treatment_12") },
    { title: t("quote_page:treatment_13") },
    { title: t("quote_page:treatment_14") },
    { title: t("quote_page:treatment_15") },
  ]
  const question = [
    { title: t("quote_page:answer_1") },
    { title: t("quote_page:answer_2") },
  ]


  const nextStep = (e) => {
    e.preventDefault();
    {
      step !== 6
      setStep(step + 1);
    }


  };

  const prevStep = () => {
    if (step === 5 && asp === true) {
      setStep(step - 2);
    } else {
      setStep(step - 1);
    }

  };



  useEffect(() => {
    window.scrollTo(0, 0);
    if (step === 7) {
      const timer = setTimeout(() => {
        router.push('/');
      }, 5000);

      return () => {
        clearTimeout(timer);
      };
    }
  }, [step, router]);






  useEffect(() => {
    if (selectedDate != null) {
      setStep((prevStep) => prevStep + 1);
    }
  }, [selectedDate])




  const handleforValues = (event) => {
    const value = event.target.value;
    const checked = event.target.checked;

    if (checked) {
      setForValues([...forValues, value]);
    } else {
      setForValues(forValues.filter((val) => val !== value));
    }
  };


  const handleCheckboxChange = (event) => {
    const value = event.target.value;
    const checked = event.target.checked;

    if (checked) {
      setSelectedValues([...selectedValues, value]);
    } else {
      setSelectedValues(selectedValues.filter((val) => val !== value));
    }
  };


  // Step 5



  const handleChangeFrom = (event) => {
    const { name, value, checked } = event.target;


    setFormData({
      ...formData,
      [name]: name === 'agree' ? checked : value,
    });


  };

  const handleChangePhone = (newPhoneVal, countryData) => {
    setPhoneNum(newPhoneVal);
  };



  useEffect(() => {
    setUpdatedFormData({ ...formData, phone: phoneNum, selectedForm_1: selectedValues, selectedForm_2: forValues, selectedDate: selectedDate?.$d?.toLocaleDateString(), selectedTime: timeValue, asp: asp })
  }, [formData, phoneNum, selectedValues, forValues, selectedDate, timeValue, asp])



  const handleSubmit = async (event) => {
    event.preventDefault();
    // Submit the form data to the server
    // Add the phone number to the form data
    // const updatedFormData = { ...formData, phone: phoneNum };
    setIsLoading(true)


    if (formData.agree !== true) {
      toast.error("Terms must be selected !")
      setIsLoading(false)
    }


    if (updatedFormData && updatedFormData.agree === true) {
      setIsLoading(true)

      const url = `/api/sendEmail`;
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ ...updatedFormData }),
      });

      if (response) {
        setIsLoading(false)
      }
      if (response.status === 200) {
        handleCodeSubmit();
        setStep(step + 1);
        setIsLoading(false)

      }


    }

  };

  // Handle OTP


  const handleCodeSubmit = async (event) => {
    // event.preventDefault();
    try {
      const response = await fetch('/api/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: updatedFormData?.email, enteredOtp })
      });
      const data = await response.json();
      setOtp(data.otp);





    } catch (error) {
      setMessage('Failed to send OTP code');
    }

  };


  function verifyOTP(otp, enteredOtp) {
    return otp === enteredOtp;
  }

  const handleConfirmation = async (event) => {
    if (verifyOTP(otp, enteredOtp)) {
      setMessage('code is valid');
      setStep(step + 1)

    } else {
      setMessage(t("quote_page:invalid_code"));
    }
  };

  const handleCodeChange = (code) => {
    setEnteredOtp(code);
  };



  return (
    <>


      <div className={styles.card_wrapper} dir={router.locale === "ar" ? 'rtl' : 'ltr'}>
        <div className={styles.quote_card} dir={router.locale === "ar" ? 'rtl' : 'ltr'}>
          {step <= 5 &&
            <div className={styles.progressBar}>
              <ProgressBar
                completed={step}
                bgColor="#1B0968"
                height="8px"
                isLabelVisible={false}
                maxCompleted={5}
                borderRadius="0px"
              />
            </div>
          }

          {step !== 7 &&
            <div className={styles.header}>
              <button onClick={handleGoBack} className={styles.navbar__logo}>
                <Image
                  src={logo.src}
                  alt="Picture of the author"
                  width={51.34}
                  height={45}
                />
                <h1>Fertiliv</h1>
              </button>

              <div className={styles.close} onClick={handleGoBack}>
                <CloseIcon />
              </div>

              {step >= 2 && step !== 6 &&
                <div className={styles.back} onClick={prevStep}>
                  <Typography>
                    {t("quote_page:back")}
                  </Typography>
                  <FaArrowLeft />
                </div>
              }

            </div>
          }


          {step === 1 &&
            <div className={styles.desc}>
              <Typography>{t("quote_page:title")}</Typography>
            </div>
          }


          {step === 5 &&
            <motion.h4
              animate={{ opacity: 1 }}
              initial={{ opacity: 0 }}
              style={{ fontWeight: 'bold' }}
              className={styles.question}>
              {t("quote_page:title_2")}
              <span style={{ color: 'red' }}>*</span>
            </motion.h4>
          }
          <div className={styles.question}>
            {step === 1 &&
              <motion.h4
                animate={{ opacity: 1 }}
                initial={{ opacity: 0 }}
              >
                {t("quote_page:ask_1")}
              </motion.h4 >
            }
            {step === 2 &&
              <motion.h4
                animate={{ opacity: 1 }}
                initial={{ opacity: 0 }}
              >
                {t("quote_page:ask_2")}
              </motion.h4 >
            }
            {step === 3 &&
              <motion.h4
                animate={{ opacity: 1 }}
                initial={{ opacity: 0 }}
              >
                {t("quote_page:select_date")}
              </motion.h4 >

            }
            {step === 4 &&
              <motion.h4
                animate={{ opacity: 1 }}
                initial={{ opacity: 0 }}
              >
                {t("quote_page:select_date")}
              </motion.h4 >
            }

          </div>

          {step !== 6 &&
            <motion.form
              animate={{ opacity: 1 }}
              initial={{ opacity: 0 }}
              onSubmit={handleSubmit}
              className={step === 1 && styles.form_1 || step === 2 && styles.form_2 || step === 3 && styles.form_3 || step === 4 && styles.form_4 || step === 5 && styles.form_5}

            >

              {step === 1 &&
                <>
                  {treatments.map((treatment, index) =>
                    <FormControlLabel
                      key={index}

                      sx={{
                        marginLeft: 0

                      }}
                      required
                      control={<Checkbox
                        value={treatment.title}
                        checked={selectedValues.includes(treatment.title)}
                        onChange={handleCheckboxChange}

                        sx={{
                          color: '#1B0968',
                          '.Mui-checked': {
                            color: '#1B0968 ',
                          },
                          '.MuiCheckbox-colorSecondary.Mui-checked': {
                            color: '#1B0968 ',
                          },
                          '.MuiIconButton-root': {
                            color: '#1B0968 ',
                          },
                          marginLeft: 0

                        }} />} label={treatment.title} />
                  )}

                  <FormControlLabel
                    className={styles.last_child}

                    sx={{
                      marginLeft: 0

                    }}

                    value={t("quote_page:treatment_16")}
                    checked={selectedValues.includes(t("quote_page:treatment_16"))}
                    onChange={handleCheckboxChange}

                    required control={<Checkbox sx={{
                      color: '#1B0968',
                      '.Mui-checked': {
                        color: '#1B0968 ',
                      },
                      '.MuiCheckbox-colorSecondary.Mui-checked': {
                        color: '#1B0968 ',
                      },
                      '.MuiIconButton-root': {
                        color: '#1B0968 ',
                      },
                      marginLeft: 0

                    }} />} label={t("quote_page:treatment_16")} />
                </>

              }

              {step === 2 &&
                <motion.div
                  animate={{ opacity: 1 }}
                  initial={{ opacity: 0 }}
                  className={styles.step_2}>

                  {question.map((q, index) => (
                    <FormControlLabel
                      key={index}
                      value={q.title}
                      checked={forValues.includes(q.title)}
                      onChange={handleforValues}

                      required
                      control={<Checkbox sx={{
                        color: '#1B0968',
                        '.Mui-checked': {
                          color: '#1B0968 ',
                        },
                        '.MuiCheckbox-colorSecondary.Mui-checked': {
                          color: '#1B0968 ',
                        },
                        '.MuiIconButton-root': {
                          color: '#1B0968 ',
                        },


                      }} />} label={q.title} />
                  ))}


                </motion.div>

              }


              {step === 4 &&
                asp && selectedDate === null && timeValue === null &&
                <motion.p
                  animate={{ opacity: 1 }}
                  initial={{ opacity: 0 }}
                  style={{ marginTop: 0, fontWeight: 'bold' }}
                  className={styles.selctedDate}>
                  {t("quote_page:ASP")}
                </motion.p>

              }


              <div className={styles.date} dir='ltr'>
                {
                  step === 3 &&
                  <motion.div
                    animate={{ opacity: 1 }}
                    initial={{ opacity: 0 }}
                  >
                    <LocalizationProvider dateAdapter={AdapterDayjs} DatePicker={DatePicker}>
                      <DateCalendar
                        value={selectedDate}
                        onChange={(newDateVal) => setSelectedDate(dayjs(newDateVal))}
                        format="MM/dd/yyyy"
                        inputVariant="outlined"
                        label="Select a date"
                        minDate={dayjs()}
                        sx={{
                          '.Mui-selected ':
                          {
                            backgroundColor: '#1B0968 !important',
                            color: 'white !important'
                          },
                          '.css-15a9mqf-MuiPickersYear-yearButton.Mui-selected': {
                            backgroundColor: '#1B0968 !important',
                            color: 'white !important'
                          },
                          '.css-vu42c1.Mui-selected': {
                            backgroundColor: '#1B0968 !important',
                            color: 'white !important'
                          }
                        }}
                      />
                    </LocalizationProvider>

                  </motion.div>
                }


              </div>





              <motion.div
                animate={{ opacity: 1 }}
                initial={{ opacity: 0 }}
                className={styles.time} style={step !== 4 && { display: 'none' }}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DigitalClock
                    value={timeValue?.$d?.toLocaleDateString("en-US", { hour: "numeric", minute: "numeric", hour12: true }).split(", ")[1]}
                    onChange={(newValue) => setTimeValue(newValue?.$d?.toLocaleDateString("en-US", { hour: "numeric", minute: "numeric", hour12: true }).split(", ")[1])}
                    skipDisabled
                    minTime={dayjs().set('hour', 9).set('minute', 30).second(0)}
                    maxTime={dayjs().set('hour', 18).set('minute', 0)}
                    onClick={() => setStep((prev) => prev + 1)}
                    sx={{
                      '.Mui-selected':
                      {
                        backgroundColor: '#1B0968 !important',
                        color: 'white !important'
                      },
                      '.css-186wig7.Mui-selected': {
                        backgroundColor: '#1B0968 !important',
                        color: 'white !important'
                      },
                      'ul': {
                        display: 'flex',
                        flexDirection: 'row',
                        flexWrap: 'wrap',
                        alignItems: 'center',
                        justifyContent: 'flex-start',

                        'li': {
                          backgroundColor: '#E7EDEC',
                          borderRadius: '5px',
                        }
                      },
                      maxHeight: "100%"

                    }}
                  />
                </LocalizationProvider>

                {step === 4 &&
                  selectedDate !== null && asp !== true &&
                  <motion.div
                    animate={{ opacity: 1 }}
                    initial={{ opacity: 0 }}
                    className={styles.selctedDate}
                  >
                    {timeValue === null &&
                      <Typography
                      >
                        {t("quote_page:testmycontext")}
                        {selectedDate?.$d?.toLocaleDateString()}
                      </Typography>
                    }
                  </motion.div >
                }

                {step === 4 &&
                  timeValue !== null &&
                  <motion.div
                    animate={{ opacity: 1 }}
                    initial={{ opacity: 0 }}
                    className={styles.selctedDate}
                  >
                    <Typography >
                      {t("quote_page:testmycontext")}  {selectedDate !== null && asp !== true && selectedDate?.$d?.toLocaleDateString()} {timeValue}
                    </Typography>
                  </motion.div >
                }



              </motion.div>

              {step === 5 &&
                <motion.div
                  animate={{ opacity: 1 }}
                  initial={{ opacity: 0 }}
                  className={styles.form_container}>
                  <div className={styles.username}>
                    <div className={styles.f_name}>
                      <label htmlFor="fname">{t("quote_page:first_name")} <span>*</span></label>
                      <input onChange={handleChangeFrom} required type="text" name='fname' placeholder='John' />
                    </div>
                    <div className={styles.l_name}>
                      <label htmlFor="lname">{t("quote_page:family_name")} <span>*</span></label>
                      <input onChange={handleChangeFrom} required type="text" name='lname' placeholder='Doe' />
                    </div>
                  </div>

                  <div className={styles.phone} dir='ltr'>
                    <label htmlFor="phone">{t("quote_page:phone_number")} <span>*</span></label>

                    <PhoneInput
                      country={'tr'}
                      value={phoneNum}
                      onChange={handleChangePhone}
                      // onChange={newPhoneVal => setPhoneNum(newPhoneVal)}

                      inputProps={{
                        name: 'phone',
                        required: true,
                      }}
                    />
                  </div>

                  <div className={styles.email}>
                    <label htmlFor="email">{t("quote_page:email")} <span>*</span></label>
                    <input onChange={handleChangeFrom} required type="email" name='email' placeholder='example@gmail.com' />
                  </div>


                  <div className={styles.terms_label}>
                    <FormControlLabel required control={<Checkbox
                      checked={formData.agree}
                      name="agree"
                      onChange={handleChangeFrom}

                      sx={{
                        color: '#1B0968',
                        marginTop: '8px',
                        marginBottom: '8px',
                        '.Mui-checked': {
                          color: '#1B0968 ',
                        },
                        '.MuiCheckbox-colorSecondary.Mui-checked': {
                          color: '#1B0968 ',
                        },
                        '.MuiIconButton-root': {
                          color: '#1B0968 ',
                        },



                      }} />} label={t("quote_page:terms")} />
                  </div>

                </motion.div>
              }



              {step === 5 &&
                <div className={styles.inquiry} >
                  <button type="submit">
                    {isLoading ?
                      <ThreeDots
                        height="25"
                        width="25"
                        radius="9"
                        color="#707070"
                        ariaLabel="three-dots-loading"
                        wrapperStyle={{}}
                        wrapperClassName="load_more_btn"
                        visible={true}
                      />
                      : t("quote_page:send")

                    }

                  </button>
                </div>
              }
            </motion.form>
          }


          {step === 6 &&
            <motion.div
              animate={{ opacity: 1 }}
              initial={{ opacity: 0 }}

              className={styles.conf_code}>
              <div className={styles.title}>
                <Typography variant={'h3'}>
                  {t("quote_page:conf_message")}
                </Typography>
              </div>
              <div className={styles.desc}>
                <Typography> {t("quote_page:desc_conf")}</Typography>
              </div>

              <div className={styles.mobile_num}>
                <Typography>
                  {updatedFormData?.email}
                </Typography>
              </div>
              <div className="input">

                <AuthCode containerClassName={styles.input_container} length={4} allowedCharacters='numeric' onChange={handleCodeChange}
                />
              </div>
              <div className={styles.resend}>
                <Typography>
                  {t("quote_page:email_receive")}<button onClick={handleCodeSubmit}>{t("quote_page:resend")}</button>
                </Typography>
                {message &&
                  <Typography sx={{ textDecoration: 'underline', color: 'red !important' }}>
                    {message}
                  </Typography>
                }
              </div>
            </motion.div>
          }


          {step === 7 &&
            <motion.div
              animate={{ opacity: 1 }}
              initial={{ opacity: 0 }}
              className={styles.step_7_container}
            >
              <div className={styles.step_8_container}>
                <div className={styles.icon_container}>
                  <BsCheckLg />
                </div>
                <div className={styles.title}>
                  <Typography variant='h3'>{t("quote_page:success")}</Typography>
                </div>
                <div className={styles.desc}>
                  <Typography>{t("quote_page:thank")}</Typography>
                </div>
              </div>
            </motion.div>

          }



          {step === 3 &&
            <div className={styles.asp_btn} onClick={handleAsp}>
              <button>{t("quote_page:ASP")}</button>
            </div>
          }

          {step === 1 &&
            <>
              {selectedValues.length === 0 &&
                < div className={styles.continue_btn_sec} >
                  <button>{t("quote_page:continue")}</button>
                </div>}
              {
                selectedValues.length > 0 &&
                < div className={styles.continue_btn} onClick={nextStep}>
                  <button>{t("quote_page:continue")}</button>
                </div>
              }
            </>
          }
          {step === 2 &&
            <>
              {forValues.length === 0 &&
                < div className={styles.continue_btn_sec} >
                  <button>{t("quote_page:continue")}</button>
                </div>}
              {
                forValues.length > 0 &&
                < div className={styles.continue_btn} onClick={nextStep}>
                  <button>{t("quote_page:continue")}</button>
                </div>
              }
            </>
          }

          {step === 7 &&
            <div className={styles.continue_btn} >
              <Link href='/'>
                <button>
                  {t("quote_page:done")}
                </button>
              </Link>
            </div>
          }

          {step === 6 &&
            <div className={styles.continue_btn} onClick={handleConfirmation}>
              <button>{t("quote_page:continue")}</button>
            </div>
          }


        </div>
      </div >
    </>

  )
}

export default Quote



export async function getStaticProps({ locale }) {

  return {
    props: {

      locale,
      ...(await serverSideTranslations(locale, ['quote_page'])),

    },
    revalidate: 10,
  }
}