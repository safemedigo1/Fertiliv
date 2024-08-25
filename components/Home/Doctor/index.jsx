import React from 'react'
import styles from './index.module.scss'
import imgs from '../../../public/assets/constants/imgs';
import { Button, Container, Typography } from '@mui/material';
import Image from 'next/image';
import Link from 'next/link';
import { useTranslation } from 'react-i18next';
import { useRouter } from 'next/router';
const Doctor = () => {
  const { t } = useTranslation();
  const { locale } = useRouter();
  const { doctor } = imgs;

  return (
    <section id='doctor' className={styles.doctor} dir={locale === 'ar' ? 'rtl' : 'ltr'}>
      <Container>
        <div className={styles.card}>

          <div className={styles.title}>
            <Typography variant='h3'>{t('doctor:sec_title')}</Typography>
          </div>

          <div className={styles.desc}>
            <Typography>{t('doctor:sec_desc')}</Typography>
          </div>

          <div className={styles.img_container}>
            <Image src={doctor} alt="Doctor Nilay" />
          </div>

          <div className={styles.title2}>
            <Typography variant='h3'>{t('doctor:dr_name')}</Typography>
          </div>

          <div className={styles.desc}>
            <Typography>{t('doctor:dr_name')}</Typography>
          </div>


          <div className={styles.docBtn}>
            <Button>
              <Link href='#consultation'>{t('doctor:question')}</Link>
            </Button>
          </div>

        </div>
      </Container>
    </section>
  )
}

export default Doctor