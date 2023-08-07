import { Checkbox, Container, Typography, FormControlLabel, Button } from '@mui/material'
import React, { useState } from 'react'
import imgs from '../../../assets/constants/imgs';
import styles from './index.module.scss';
import Image from 'next/image';
import PhoneInput from 'react-phone-input-2';
import { motion } from "framer-motion";

const Quote = () => {
  const { quote } = imgs;
  const [step, setStep] = useState(2);


  const treatments = [
    { treatment: 'Unknown problems after trying to conceive for a year or more.' },
    { treatment: 'Repeated failed IVF/ICSI/Repeated Miscarriages/Blocked tubes' },
    { treatment: 'Irregular periods/Polycystic Ovary Syndrome/Ovulation disorders/endocrinology problems' },
    { treatment: 'Pelvic or Back pain/Uterine problems' },
    { treatment: 'Very low/zero sperm count/quality (the husband)' },
    { treatment: 'Personal factors/overage/Unexplained infertility.' },
  ]

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
          <div className={styles.img_container}>
            <Image src={quote} alt="quote" />
          </div>



          <div className={styles.steps_container}>

            <form action="">

              {step === 1 &&
                <motion.div
                  animate={{ opacity: 1 }}
                  initial={{ opacity: 0 }}>


                  {treatments.map((treatment, index) =>


                    <FormControlLabel
                      key={index}

                      sx={{
                        marginLeft: 0

                      }}
                      required
                      control={<Checkbox
                        value={treatment.treatment}
                        // checked={selectedValues.includes(treatment.treatment)}
                        // onChange={handleCheckboxChange}
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

                  <div className={styles.nextBtn} onClick={() => setStep(2)}>
                    <Button>
                      Next
                    </Button>
                  </div>

                </motion.div>

              }


              {step === 2 &&

                <motion.div
                  animate={{ opacity: 1 }}
                  initial={{ opacity: 0 }}

                  className={styles.input_container}>

                  <div className={styles.name}>
                    <input type="text" placeholder='Your First Name' />
                    <input type="text" placeholder='Your Second Name' />
                  </div>

                  <div className={styles.phone}>
                    <PhoneInput
                      country={'tr'}
                      value=''
                      // onChange={handleChangePhone}
                      // onChange={newPhoneVal => setPhoneNum(newPhoneVal)}

                      inputProps={{
                        name: 'phone',
                        required: true,
                      }}
                    />
                  </div>

                  <div className={styles.email}>
                    <input type="email" placeholder='E-mail' />
                  </div>


                  <div className={styles.nextBtn} onClick={() => setStep(1)}>
                    <Button>
                      Next
                    </Button>
                  </div>
                </motion.div>
              }



            </form>


          </div>


        </div>
      </Container>

    </section>
  )
}

export default Quote