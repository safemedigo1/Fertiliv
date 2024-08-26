import React from 'react'
import styles from './index.module.scss';
import imgs from '../../../public/assets/constants/imgs';
import { Container, Typography } from '@mui/material';
import Image from 'next/image';
import { useTranslation } from 'react-i18next';
import { useRouter } from 'next/router';
const Memberships = () => {
  const { t } = useTranslation();
  const { locale } = useRouter();
  const { ISO,
    golden,
    International,
    Reproductive,
    arms,
    Eshre,
    Junior,
    Tesvikler, } = imgs;

  const memberships = [
    { icon: Reproductive, title: t('members:reproductive') },
    { icon: Eshre, title: t('members:eruo') },
    { icon: arms, title: t('members:society') },
    { icon: Tesvikler, title: t('members:republic') },
    { icon: International, title: t('members:international') },
    { icon: golden, title: t('members:quality') },
    { icon: Junior, title: t('members:junior') },
    { icon: ISO, title: t('members:international') },
  ]

  return (
    <section id='memberships' className={styles.memberships} dir={locale === 'ar' ? 'rtl' : 'ltr'}>
      <Container>
        <div className={styles.section_container}>

          <div className={styles.text_container}>
            <div className={styles.title}>
              <Typography variant='h3'>
                {t('members:title')}</Typography>
            </div>
            <div className={styles.title2}>
              <Typography variant='h3'>
                {t('members:site_name')} </Typography>
            </div>

            <div className={styles.desc}>
              <Typography>{t('members:site_name')}</Typography>
            </div>
          </div>

          <div className={styles.memberships_container}>
            {memberships.map((member, idx) =>
              <div className={styles.member} key={idx}>
                <div className={styles.icon_container}>
                  <Image src={member.icon} alt={member.title} />
                </div>

                <div className={styles.title}>
                  <Typography>{member.title}</Typography>
                </div>
              </div>
            )}
          </div>
        </div>
      </Container>
    </section>
  )
}

export default Memberships


// AIzaSyCwPlE2HqkY2yS8J_74RwiZzRVXUSSyfHg