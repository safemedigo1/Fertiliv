import React, { useState, } from 'react'
import styles from './index.module.scss'
import { Container, Typography, } from '@mui/material'

import { useTranslation } from 'react-i18next';
import { useRouter } from 'next/router';
import PatientReviews from '../../PatientReviews';
import BlogsSection from '../BlogsSection';

const Blogs = ({ blogs }) => {
  const { t } = useTranslation();
  const { locale } = useRouter();


  return (
    <section id='reviews' className={styles.reviews} dir={locale === 'ar' ? 'rtl' : 'ltr'}>
      <Container >
        <div className={styles.section_container}>
          <div className={styles.text_container}>
            <div className={styles.title}>
              <Typography variant='h3'>
                {t("blogs_page:hero_title")}

              </Typography>
            </div>

            <div className={styles.desc}>
              <Typography>
                {t("blogs_page:hero_desc")}
              </Typography>
            </div>

          </div>



          <BlogsSection blogs={blogs} />

        </div>


      </Container>


    </section>
  )
}

export default Blogs