// import { Checkbox, Container, Typography, FormControlLabel, Button } from '@mui/material'
// import React, { useEffect, useState } from 'react'
// import imgs from '../../../public/assets/constants/imgs';
// import styles from './index.module.scss';
// import Image from 'next/image';
// import PhoneInput from 'react-phone-input-2';
// import { motion } from "framer-motion";
// import { ThreeDots } from 'react-loader-spinner'

// const Quote = () => {
//   const { quoteImg } = imgs;
//   const [step, setStep] = useState(1);
//   const [phoneNum, setPhoneNum] = useState();
//   const [updatedFormData, setUpdatedFormData] = useState();
//   const [formData, setFormData] = useState({
//     fname: '',
//     lname: '',
//     email: '',
//     phone: '',
//     selectedForm: '',

//   });
//   const [selectedValues, setSelectedValues] = useState([]);
//   const [isLoading, setIsLoading] = useState(false);

//   const treatments = [
//     { treatment: 'Unknown problems after trying to conceive for a year or more.' },
//     { treatment: 'Repeated failed IVF / ICSI / Repeated Miscarriages / Blocked tubes' },
//     { treatment: 'Irregular periods / Polycystic Ovary Syndrome / Ovulation disorders / endocrinology problems' },
//     { treatment: 'Pelvic or Back pain / Uterine problems' },
//     { treatment: 'Very low / zero sperm count / quality(the husband)' },
//     { treatment: 'Personal factors / overage / Unexplained infertility' },
//   ]

//   const handleChangeFrom = (event) => {
//     const { name, value, checked } = event.target;

//     setFormData({
//       ...formData,
//       [name]: name === 'agree' ? checked : value,
//     });
//   };

//   const handleChangePhone = (newPhoneVal, countryData) => {
//     setPhoneNum(newPhoneVal);
//   };

//   useEffect(() => {
//     setUpdatedFormData({ ...formData, phone: phoneNum, selectedForm: selectedValues, })


//   }, [formData, phoneNum, selectedValues]);

//   const handleSubmit = async (event) => {
//     event.preventDefault();
//     setIsLoading(true)
//     // Submit the form data to the server
//     // Add the phone number to the form data
//     // const updatedFormData = { ...formData, phone: phoneNum };

//     if (updatedFormData) {
//       const url = `/api/sendEmailSec`;
//       const response = await fetch(url, {
//         method: 'POST',
//         headers: {
//           'Accept': 'application/json',
//           'Content-Type': 'application/json'
//         },
//         body: JSON.stringify({ ...updatedFormData }),
//       });

//       if (response) {
//         setIsLoading(false)
//       }
//       if (response.status === 200) {
//         // handleCodeSubmit();
//         setIsLoading(false)
//         setStep(step + 1);
//       }
//     }
//   };

//   const handleCheckboxChange = (event) => {
//     const value = event.target.value;
//     const checked = event.target.checked;

//     if (checked) {
//       setSelectedValues([...selectedValues, value]);
//     } else {
//       setSelectedValues(selectedValues.filter((val) => val !== value));
//     }
//   };


//   useEffect(() => {
//     if (step === 3) {
//       const timer = setTimeout(() => {
//         setStep(1)
//       }, 4000);

//       return () => {
//         clearTimeout(timer);
//       };

//     }
//   }, [step])
//   return (
//     <section id='quote' className={styles.quote}>
//       <Container>
//         <div className={styles.text_container}>
//           <div className={styles.title}>
//             <Typography variant='h3'>Let us help you!</Typography>
//           </div>

//           <div className={styles.desc}>
//             <Typography>Tell us little bit about yourself to get personalized recommendations! Do you have any of the following conditions?</Typography>
//           </div>

//         </div>

//         <div className={styles.section_container}>
//           {step != 3 &&
//             <div className={styles.img_container}>
//               <Image src={quoteImg} alt="quote" />
//             </div>
//           }



//           <div className={styles.steps_container}>
//             <form action="">
//               {step === 1 &&
//                 <>

//                   <motion.div
//                     animate={{ opacity: 1 }}
//                     initial={{ opacity: 0 }}
//                     className={styles.treatments}
//                   >


//                     {treatments.map((treatment, index) =>
//                       <div className={styles.input_wrap} key={index}>

//                         <FormControlLabel


//                           sx={{
//                             marginLeft: 0,

//                           }}
//                           required
//                           control={<Checkbox
//                             value={treatment.treatment}
//                             checked={selectedValues.includes(treatment.treatment)}
//                             onChange={handleCheckboxChange}


//                             sx={{
//                               color: '#1b0968 !important',
//                               '&.Mui-checked': {
//                                 color: '#1b0968 !important',
//                               },

//                             }}


//                           />} label={treatment.treatment} />

//                       </div>

//                     )}


//                   </motion.div>
//                   <div className={styles.nextBtn} onClick={() => setStep(2)}>
//                     <Button>
//                       Next
//                     </Button>
//                   </div>
//                 </>
//               }


//               {step === 2 &&

//                 <motion.div
//                   animate={{ opacity: 1 }}
//                   initial={{ opacity: 0 }}

//                   className={styles.input_container}>

//                   <div className={styles.name}>
//                     <input type="text" placeholder='Your First Name' name='fname' onChange={handleChangeFrom} required />
//                     <input type="text" placeholder='Your Second Name' name='lname' onChange={handleChangeFrom} required />
//                   </div>

//                   <div className={styles.phone}>
//                     <PhoneInput
//                       country={'tr'}
//                       value={phoneNum}
//                       onChange={handleChangePhone}
//                       // onChange={newPhoneVal => setPhoneNum(newPhoneVal)}

//                       inputProps={{
//                         name: 'phone',
//                         required: true,
//                       }}
//                     />
//                   </div>

//                   <div className={styles.email}>
//                     <input type="email" placeholder='E-mail' name='email' onChange={handleChangeFrom} required />
//                   </div>


//                   <div className={styles.nextBtn} onClick={handleSubmit}>
//                     <Button>
//                       {isLoading ?
//                         <ThreeDots
//                           height="25"
//                           width="25"
//                           radius="9"
//                           color="#707070"
//                           ariaLabel="three-dots-loading"
//                           wrapperStyle={{}}
//                           wrapperClassName="load_more_btn"
//                           visible={true}
//                         />
//                         : "Submit"

//                       }

//                     </Button>
//                   </div>
//                 </motion.div>
//               }



//             </form>

//             {step === 3 &&
//               <motion.div
//                 animate={{ opacity: 1 }}
//                 initial={{ opacity: 0 }}
//                 className={styles.conf_msg}
//               >
//                 <div className={styles.title}>
//                   <Typography variant='h5'>We Got Your Request</Typography>
//                 </div>

//                 <div className={styles.desc}>
//                   <Typography>Thank You For Your Submission. Our Team Will Evaluate Your Request And Respond To You In A Timely Manner</Typography>
//                 </div>

//               </motion.div>
//             }


//           </div>


//         </div>
//       </Container>
//     </section>
//   )
// }

// export default Quote



import { Checkbox, Container, Typography, FormControlLabel, Button } from '@mui/material';
import React, { useEffect, useState } from 'react';
import imgs from '../../../public/assets/constants/imgs';
import styles from './index.module.scss';
import Image from 'next/image';
import PhoneInput from 'react-phone-input-2';
import { motion } from "framer-motion";
import { ThreeDots } from 'react-loader-spinner';
import toast, { Toaster } from 'react-hot-toast';
import { useTranslation } from 'react-i18next';
import { useRouter } from 'next/router';

const Quote = () => {
  const { t } = useTranslation()
  const { locale } = useRouter()
  const { quoteImg } = imgs;
  const [step, setStep] = useState(1);
  const [phoneNum, setPhoneNum] = useState('');
  const [updatedFormData, setUpdatedFormData] = useState({});
  const [formData, setFormData] = useState({
    fname: '',
    lname: '',
    email: '',
    phone: '',
    selectedForm: '',
  });
  const [selectedValues, setSelectedValues] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const treatments = [
    { treatment: t("help:question_1") },
    { treatment: t("help:question_2") },
    { treatment: t("help:question_3") },
    { treatment: t("help:question_4") },
    { treatment: t("help:question_5") },
    { treatment: t("help:question_6") },
  ];

  const handleChangeFrom = (event) => {
    const { name, value, checked } = event.target;
    setFormData({
      ...formData,
      [name]: name === 'agree' ? checked : value,
    });
  };

  const handleChangePhone = (newPhoneVal) => {
    setPhoneNum(newPhoneVal);
  };

  useEffect(() => {
    setUpdatedFormData({ ...formData, phone: phoneNum, selectedForm: selectedValues });
  }, [formData, phoneNum, selectedValues]);

  const validateForm = () => {
    const { fname, lname, email } = formData;
    if (!fname || !lname || !email || !phoneNum || selectedValues.length === 0) {
      toast.error("Please fill all forms.");
      return false;
    }
    return true;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);

    if (!validateForm()) {
      setIsLoading(false);
      return;
    }

    toast.promise(
      fetch('/api/sendEmailSec', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedFormData),
      })
        .then(async (response) => {
          if (response.ok) {
            setStep(step + 1);
            return response.json(); // Assuming the API returns JSON
          } else {
            const data = await response.text();
            throw new Error(data);
          }
        })
        .catch((error) => {
          throw error;
        }),
      {
        loading: 'Sending...',
        success: <b>Sent successfully!</b>,
        error: <b>Sending failed, try later.</b>,
      }
    );

    setIsLoading(false);
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

  useEffect(() => {
    if (step === 3) {
      const timer = setTimeout(() => {
        setStep(1);
      }, 4000);
      return () => {
        clearTimeout(timer);
      };
    }
  }, [step]);

  return (
    <section id='quote' className={styles.quote} dir={locale === 'ar' ? 'rtl' : 'ltr'}>
      <Container>
        <Toaster />
        <div className={styles.text_container}>
          <div className={styles.title}>
            <Typography variant='h3'>
              {t("help:title")}
            </Typography>
          </div>
          <div className={styles.desc}>
            <Typography>
              {t("help:desc")}

            </Typography>
          </div>
        </div>
        <div className={styles.section_container}>
          {step !== 3 && (
            <div className={styles.img_container}>
              <Image src={quoteImg} alt="quote" />
            </div>
          )}
          <div className={styles.steps_container}>
            <form onSubmit={handleSubmit}>
              {step === 1 && (
                <>
                  <motion.div
                    animate={{ opacity: 1 }}
                    initial={{ opacity: 0 }}
                    className={styles.treatments}
                  >
                    {treatments.map((treatment, index) => (
                      <div className={styles.input_wrap} key={index}>
                        <FormControlLabel
                          sx={{ marginLeft: 0 }}
                          required
                          control={
                            <Checkbox
                              value={treatment.treatment}
                              checked={selectedValues.includes(treatment.treatment)}
                              onChange={handleCheckboxChange}
                              sx={{
                                color: '#1b0968 !important',
                                '&.Mui-checked': {
                                  color: '#1b0968 !important',
                                },
                              }}
                            />
                          }
                          label={treatment.treatment}
                        />
                      </div>
                    ))}
                  </motion.div>
                  <div className={styles.nextBtn} onClick={() => setStep(2)}>
                    <Button>
                      {t("help:next")}
                    </Button>
                  </div>
                </>
              )}
              {step === 2 && (
                <motion.div
                  animate={{ opacity: 1 }}
                  initial={{ opacity: 0 }}
                  className={styles.input_container}
                >
                  <div className={styles.name}>
                    <input type="text" placeholder='Your First Name' name='fname' onChange={handleChangeFrom} required />
                    <input type="text" placeholder='Your Second Name' name='lname' onChange={handleChangeFrom} required />
                  </div>
                  <div className={styles.phone} dir='ltr'>
                    <PhoneInput
                      country={'tr'}
                      value={phoneNum}
                      onChange={handleChangePhone}
                      inputProps={{ name: 'phone', required: true }}
                    />
                  </div>
                  <div className={styles.email}>
                    <input type="email" placeholder='E-mail' name='email' onChange={handleChangeFrom} required />
                  </div>
                  <div className={styles.nextBtn} onClick={handleSubmit}>
                    <Button type="submit">
                      {isLoading ? (
                        <ThreeDots
                          height="25"
                          width="25"
                          radius="9"
                          color="#707070"
                          ariaLabel="three-dots-loading"
                          visible={true}
                        />
                      ) : (
                        t('why_feriliv:submit')
                      )}
                    </Button>
                  </div>
                </motion.div>
              )}
            </form>
            {step === 3 && (
              <motion.div
                animate={{ opacity: 1 }}
                initial={{ opacity: 0 }}
                className={styles.conf_msg}
              >
                <div className={styles.title}>
                  <Typography variant='h5'>{t('help:success_title')}</Typography>
                </div>
                <div className={styles.desc}>
                  <Typography>
                    {t('help:success_desc')}
                  </Typography>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </Container>
    </section>
  );
};

export default Quote;
