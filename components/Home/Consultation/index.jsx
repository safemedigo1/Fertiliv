import React from 'react';
import styles from './index.module.scss';
import { Button, Container, Typography } from '@mui/material';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css'
import imgs from '../../../assets/constants/imgs'
import Image from 'next/image';
const Consultation = () => {
  const { Consultation_girl } = imgs;
  return (
    <Container>
      <section id={'consultation'} className={styles.consultation}>
        <div className={styles.title}>
          <Typography variant='h3'>Free Initial Consultation</Typography>
        </div>

        <div className={styles.cards_container}>
          <div className={styles.text_card}>
            <div className={styles.img_container}>
              <Image src={Consultation_girl} alt="" />
            </div>
            <div className={styles.text_container}>
              <div className={styles.title}>
                <Typography variant='h4'>Do you have a question?</Typography>
              </div>

              <div className={styles.desc}>
                <Typography>Our highly efficient health care
                  <br />
                  coordinating team will be at your <br />
                  disposal full time. leave your <br />
                  information and your question and <br />
                  we will reply you back.</Typography>
              </div>
            </div>


          </div>

          <div className={styles.input_container}>
            <form action="">

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

              <div className={styles.textarea}>
                <textarea name="" id="" placeholder='Your Question'></textarea>
              </div>

            </form>
          </div>
        </div>

        <div className={styles.terms}>
          <Typography>I agree to my given details including health data may be processed by Fertilive for the purpose of obtaining quotes. The consent can be revoked at any time with effect for the future.*</Typography>
        </div>
        <div className={styles.subBtn}>
          <Button>Submit</Button>
        </div>

      </section>
    </Container>
  )
}

export default Consultation