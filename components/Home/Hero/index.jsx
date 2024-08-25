import { Button, Container, Typography } from '@mui/material'
import React from 'react'
import styles from './index.module.scss'
import imgs from '../../../public/assets/constants/imgs'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { useTranslation } from 'react-i18next';

const Hero = () => {
  const { t } = useTranslation()
  const { Hero_baby } = imgs;
  const router = useRouter();
  const { locale } = useRouter()



  //   hero_title
  // hero_title_sec
  // online_quote
  return (
    <section id={styles.hero} dir={locale === 'ar' ? 'rtl' : 'ltr'
    }>
      <Container>

        <div className={styles.card}>
          <div className={styles.card_inner}>
            <div className={styles.text_container}>
              <div className={styles.title}>
                <Typography variant='h2'> {t("hero:hero_title")}</Typography>
              </div>

              <div className={styles.desc}>
                <Typography>
                  {t("hero:hero_title_sec")}

                </Typography>
              </div>


              <div className={styles.btn}>
                <Button onClick={() => router.push('#consultation')}>
                  {t("hero:online_quote")}

                </Button>
              </div>
            </div>
            <div className={styles.img_container}>
              <Image src={Hero_baby} alt="" />
            </div>
          </div>
          <div className={styles.card_inner_mob}>
            <div className={styles.title}>
              <Typography variant='h2'> {t("hero:hero_title")}</Typography>
            </div>

            <div className={styles.img_container}>
              <Image src={Hero_baby} alt="" />
            </div>
            <div className={styles.desc}>
              <Typography>
                {t("hero:hero_title_sec")}

              </Typography>
            </div>
            <div className={styles.btn}>
              <Button onClick={() => router.push('#consultation')}> {t("hero:online_quote")}</Button>
            </div>
          </div>
        </div>
      </Container>
    </section >
  )
}

export default Hero