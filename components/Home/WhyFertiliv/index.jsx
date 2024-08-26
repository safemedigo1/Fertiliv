import React from 'react'
import styles from './index.module.scss'
import { Container, Typography } from '@mui/material'
import Link from 'next/link'
import imgs from '../../../public/assets/constants/imgs'
import Image from 'next/image';
import { useTranslation } from "react-i18next";
import { useRouter } from 'next/router'

const WhyFertiliv = () => {
  const { Success, Packages, Experience } = imgs;
  const { t } = useTranslation()
  const { locale } = useRouter()

  return (
    <section id={styles.WhyFertiliv} dir={locale === 'ar' ? 'rtl' : 'ltr'}>
      <Container>
        <div className={styles.section_container}>
          <div className={styles.title}>
            <Typography variant='h3'>
              {t("why_feriliv:title")}
            </Typography>
          </div>

          <div className={styles.boxes_container}>

            <div className={styles.box} >
              <div className={styles.icon_container}>
                <Image src={Success} alt="ICON" />
              </div>

              <div className={styles.box_title}>
                <Typography variant='h4'>
                  {t("why_feriliv:box_title1")}
                </Typography>
              </div>

              <div className={styles.desc}>
                <Typography>
                  {t("why_feriliv:desc1")}

                </Typography>
              </div>

              <div className={styles.link}>
                <Link href='#doctor'>{t("why_feriliv:team1")}</Link>
              </div>
            </div>

            <div className={styles.box} >
              <div className={styles.icon_container}>
                <Image src={Packages} alt="ICON" />
              </div>

              <div className={styles.box_title}>
                <Typography variant='h4'>{t("why_feriliv:box_title2")}</Typography>
              </div>

              <div className={styles.desc}>
                <Typography>
                  {t("why_feriliv:desc2")}
                  <br />
                  {t("why_feriliv:desc5")}
                </Typography>
              </div>

              <div className={styles.link}>
                <Link href='#consultation'>{t("why_feriliv:team2")}</Link>
              </div>
            </div>

            <div className={styles.box} >
              <div className={styles.icon_container}>
                <Image src={Experience} alt="ICON" />
              </div>

              <div className={styles.box_title}>
                <Typography variant='h4'>{t("why_feriliv:box_title3")}</Typography>
              </div>

              <div className={styles.desc}>
                <Typography>
                  {t("why_feriliv:desc3")}
                  <br />
                  {t("why_feriliv:desc3_1")}
                  <br />
                  {t("why_feriliv:desc3_2")}
                  <br />
                  {t("why_feriliv:desc3_3")}
                </Typography>
              </div>

              <div className={styles.link}>
                <Link href='/quote'>{t("why_feriliv:team3")}</Link>
              </div>
            </div>

          </div>
        </div>

      </Container>
    </section >
  )
}

export default WhyFertiliv