import React, { useEffect, useState } from 'react';
import styles from './index.module.scss';
import { Button, Container, Typography } from '@mui/material';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import imgs from '../../../public/assets/constants/imgs';
import Image from 'next/image';
import { ThreeDots } from 'react-loader-spinner';
import { motion } from 'framer-motion';
import { toast, Toaster } from 'react-hot-toast';
import { useTranslation } from 'react-i18next';
import { useRouter } from 'next/router';

const Consultation = () => {
  const { Consultation_girl } = imgs;
  const { t } = useTranslation();
  const { locale } = useRouter();
  const [phoneNum, setPhoneNum] = useState('');
  const [formData, setFormData] = useState({
    fname: '',
    lname: '',
    email: '',
    phone: '',
    text: '',
  });
  const [updatedFormData, setUpdatedFormData] = useState();
  const [isLoading, setIsLoading] = useState(false);

  const handleChangePhone = (newPhoneVal, countryData) => {
    setPhoneNum(newPhoneVal);
  };


  useEffect(() => {
    setUpdatedFormData({ ...formData, phone: phoneNum });
  }, [formData, phoneNum]);

  const handleChangeForm = (event) => {
    const { name, value } = event.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const resetForm = () => {
    setFormData({
      fname: '',
      lname: '',
      email: '',
      phone: '',
      text: '',
    });
    setPhoneNum('');
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);

    if (updatedFormData) {
      toast.promise(
        fetch('/api/sendEmailSec', {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            ...updatedFormData,
            selectedForm: updatedFormData.text,
          }),
        })
          .then(async (response) => {
            const data = await response.text();
            setIsLoading(false);
            if (response.ok) {
              resetForm();
            } else {
              console.error('Request failed with status:', response.status);
              throw new Error(data);
            }
          })
          .catch((error) => {
            setIsLoading(false);
            console.error('Request failed:', error);
            throw error;
          }),
        {
          loading: 'Processing...',
          success: <b>Your consultation request has been submitted successfully. Thank you!</b>,
          error: <b>Failed to send, please try again later.</b>,
        }
      );
    }
  };


  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true)
  }, [])
  if (isClient)

    return (
      <section id="consultation" className={styles.consultation} dir={locale === 'ar' ? 'rtl' : 'ltr'}>

        <Container>

          <div className={styles.section_container}>
            <div className={styles.title}>
              <Typography variant="h3">{t('why_feriliv:consultation_title')}</Typography>
            </div>

            <div className={styles.cards_container}>
              <div className={styles.text_card}>
                <div className={styles.img_container}>
                  <Image src={Consultation_girl} alt="" />
                </div>
                <div className={styles.text_container}>
                  <div className={styles.title}>
                    <Typography variant="h4">{t('why_feriliv:question')}</Typography>
                  </div>
                  {/* question */}
                  <div className={styles.desc}>
                    <Typography>
                      {/* Our highly efficient health care
                    <br />
                    coordinating team will be at your <br />
                    disposal full time. Leave your <br />
                    information and your question and <br />
                    we will reply to you back. */}


                      {t('why_feriliv:question_desc')}

                    </Typography>
                  </div>
                </div>
              </div>

              <motion.div
                initial={{ opacity: 0, x: -100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1 }}
                className={styles.input_container}
              >

                <form onSubmit={handleSubmit}>
                  <div className={styles.name}>
                    <input
                      type="text"
                      placeholder="Your First Name"
                      name="fname"
                      value={formData.fname}
                      onChange={handleChangeForm}
                      required
                    />
                    <input
                      type="text"
                      placeholder="Your Second Name"
                      name="lname"
                      value={formData.lname}
                      onChange={handleChangeForm}
                      required
                    />
                  </div>

                  <div className={styles.phone} dir='ltr'>
                    <PhoneInput
                      countryCodeEditable={false}
                      country="tr"
                      enableLongNumbers={true}
                      value={phoneNum}
                      onChange={handleChangePhone}
                      inputProps={{
                        name: 'phone',
                        required: true,
                      }}
                    />
                  </div>

                  <div className={styles.email}>
                    <input
                      type="email"
                      placeholder="E-mail"
                      name="email"
                      value={formData.email}
                      onChange={handleChangeForm}
                      required
                    />
                  </div>

                  <div className={styles.textarea}>
                    <textarea
                      name="text"
                      placeholder="Your Question"
                      value={formData.text}
                      onChange={handleChangeForm}
                    ></textarea>
                  </div>
                </form>


              </motion.div>

              <Toaster
                toastOptions={{
                  duration: 1000,
                  success: {
                    style: {
                      color: '#004747',
                      fontWeight: 'bold',
                    },
                    iconTheme: {
                      primary: '#004747',
                      secondary: '#ffffff',
                    },
                  },
                  error: {
                    style: {
                      color: 'red',
                      fontWeight: 'bold',
                    },
                  },
                }}
              />
            </div>

            <div className={styles.terms}>

              <Typography>
                {t('why_feriliv:terms')}
              </Typography>

            </div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1 }}
              className={styles.subBtn}
              onClick={handleSubmit}
            >
              <Button>
                {isLoading ? (
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
                ) : (
                  t('why_feriliv:submit')
                )}
              </Button>
            </motion.div>

          </div>

        </Container>

      </section>
    );
};

export default Consultation;
