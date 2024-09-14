import React, { useState, } from 'react'
import styles from './index.module.scss'
import { Container, Typography, } from '@mui/material'

import { useTranslation } from 'react-i18next';
import { useRouter } from 'next/router';
import PatientReviews from '../../PatientReviews';

const Reviews = ({ dataReviews }) => {
  const { t } = useTranslation();
  const { locale } = useRouter();


  return (
    <section id='reviews' className={styles.reviews} dir={locale === 'ar' ? 'rtl' : 'ltr'}>
      <Container >
        <div className={styles.section_container}>
          <div className={styles.text_container}>
            <div className={styles.title}>
              <Typography variant='h3'>
                {t("reviews:title")}
              </Typography>
            </div>
            <div className={styles.title2}>
              <Typography variant='h3'>
                92%
              </Typography>
            </div>

            <div className={styles.desc}>
              <Typography>
                {t("reviews:desc")}
              </Typography>
            </div>

          </div>



          <PatientReviews dataReviews={dataReviews} />

        </div>


      </Container>


    </section>
  )
}

export default Reviews