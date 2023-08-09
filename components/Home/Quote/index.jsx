import { Checkbox, Container, Typography, FormControlLabel, Button } from '@mui/material'
import React, { useEffect, useState } from 'react'
import imgs from '../../../assets/constants/imgs';
import styles from './index.module.scss';
import Image from 'next/image';
import PhoneInput from 'react-phone-input-2';
import { motion } from "framer-motion";

const Quote = () => {
  const { quoteImg } = imgs;
  const [step, setStep] = useState(1);
  const [phoneNum, setPhoneNum] = useState();
  const [updatedFormData, setUpdatedFormData] = useState()
  const [formData, setFormData] = useState({
    fname: '',
    lname: '',
    email: '',
    phone: '',
    selectedForm: '',

  });
  const [selectedValues, setSelectedValues] = useState([]);




  const treatments = [
    { treatment: 'Unknown problems after trying to conceive for a year or more.' },
    { treatment: 'Repeated failed IVF / ICSI / Repeated Miscarriages / Blocked tubes' },
    { treatment: 'Polycystic Ovary Syndrome Treatment' },
    { treatment: 'Irregular periods / Polycystic Ovary Syndrome / Ovulation disorders / endocrinology problems' },
    { treatment: 'Pelvic or Back pain / Uterine problems' },
    { treatment: 'Very low / zero sperm count / quality(the husband)' },
    { treatment: 'Personal factors / overage / Unexplained infertility' },
  ]

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
    setUpdatedFormData({ ...formData, phone: phoneNum, selectedForm: selectedValues, })


  }, [formData]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    // Submit the form data to the server
    // Add the phone number to the form data
    // const updatedFormData = { ...formData, phone: phoneNum };

    if (updatedFormData) {
      const url = `/api/sendEmailSec`;
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ ...updatedFormData }),
      });

      if (response) {
        // setIsLoading(false)
        console.log(response)
        console.log(updatedFormData)
      }
      if (response.status === 200) {
        // handleCodeSubmit();
        setStep(step + 1);

      }
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

  return (
    <section id='quote' className={styles.quote}>
      <Container>
        <div className={styles.text_container}>
          <div className={styles.title}>
            <Typography variant='h3'>Let us help you!</Typography>
          </div>

          <div className={styles.desc}>
            <Typography>Tell us little bit about yourself to get personalized recommendations! Do you have any of the following conditions?</Typography>
          </div>

        </div>



        <div className={styles.section_container}>
          {step != 3 &&
            <div className={styles.img_container}>
              <Image src={quoteImg} alt="quote" />
            </div>
          }



          <div className={styles.steps_container}>

            <form action="">

              {step === 1 &&
                <>

                  <motion.div
                    animate={{ opacity: 1 }}
                    initial={{ opacity: 0 }}
                    className={styles.treatments}
                  >


                    {treatments.map((treatment, index) =>
                      <FormControlLabel
                        key={index}

                        sx={{
                          marginLeft: 0,

                        }}
                        required
                        control={<Checkbox
                          value={treatment.treatment}
                          checked={selectedValues.includes(treatment.treatment)}
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

                          }} />} label={treatment.treatment} />
                    )}


                  </motion.div>
                  <div className={styles.nextBtn} onClick={() => setStep(2)}>
                    <Button>
                      Next
                    </Button>
                  </div>
                </>
              }


              {step === 2 &&

                <motion.div
                  animate={{ opacity: 1 }}
                  initial={{ opacity: 0 }}

                  className={styles.input_container}>

                  <div className={styles.name}>
                    <input type="text" placeholder='Your First Name' name='fname' onChange={handleChangeFrom} required />
                    <input type="text" placeholder='Your Second Name' name='lname' onChange={handleChangeFrom} required />
                  </div>

                  <div className={styles.phone}>
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
                    <input type="email" placeholder='E-mail' name='email' onChange={handleChangeFrom} required />
                  </div>


                  <div className={styles.nextBtn} onClick={handleSubmit}>
                    <Button>
                      Submit
                    </Button>
                  </div>
                </motion.div>
              }



            </form>

            {step === 3 &&
              <motion.div
                animate={{ opacity: 1 }}
                initial={{ opacity: 0 }}
                className={styles.conf_msg}
              >
                <div className={styles.title}>
                  <Typography variant='h5'>We Got Your Request</Typography>
                </div>

                <div className={styles.desc}>
                  <Typography>Thank You For Your Submission. Our Team Will Evaluate Your Request And Respond To You In A Timely Manner</Typography>
                </div>

              </motion.div>

            }


          </div>


        </div>
      </Container>

    </section>
  )
}

export default Quote