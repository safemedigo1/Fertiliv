import React from 'react'
import imgs from '../../../public/assets/constants/imgs'
import styles from './index.module.scss'
import { Button, Container, Typography } from '@mui/material'
import Image from 'next/image'
import Link from 'next/link'
import Carousel from '@itseasy21/react-elastic-carousel';
import { consts } from '@itseasy21/react-elastic-carousel';
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useRouter } from 'next/router'


const HowItWorks = () => {
  const { Planning,
    Stimulation,
    Collection,
    Laboratory,
    Transfer, } = imgs;
  const { t } = useTranslation();
  const { locale } = useRouter();

  const [breakPoints] = useState([
    { width: 1, itemsToShow: 2, },
    { width: 550, itemsToShow: 3, },
    { width: 850, itemsToShow: 3 },
    { width: 1150, itemsToShow: 4, },
    { width: 1450, itemsToShow: 5 },
    { width: 1750, itemsToShow: 6, },


  ])


  const steps = [
    { icon: Planning, title: t("howItWorks:box1_title"), desc: t("howItWorks:box1_desc") },
    { icon: Stimulation, title: t("howItWorks:box2_title"), desc: t("howItWorks:box2_desc") },
    { icon: Collection, title: t("howItWorks:box3_title"), desc: t("howItWorks:box3_desc") },
    { icon: Laboratory, title: t("howItWorks:box4_title"), desc: t("howItWorks:box4_desc") },
    { icon: Transfer, title: t("howItWorks:box5_title"), desc: t("howItWorks:box5_desc") },
  ]
  return (
    <section id='HowItWorks' className={styles.HowItWorks} dir={locale === 'ar' ? 'rtl' : 'ltr'}>
      <Container>
        <div className={styles.title}>
          <Typography variant='h3'>{t("howItWorks:sec_title")}</Typography>
        </div>

        <div className={styles.desc}>
          <Typography >{t("howItWorks:sec_desc")}</Typography>

        </div>

        <div className={styles.steps_container}>
          {steps.map((step, idx) =>
            <div key={idx} className={styles.step_box}>
              <div className={styles.icon_container}>
                <Image src={step.icon} alt={step.title} />
              </div>

              <div className={styles.title}>
                <Typography variant='h4'>
                  {step.title}
                </Typography>
              </div>


              <div className={styles.desc}>
                <Typography>{step.desc}</Typography>
              </div>

            </div>

          )}
        </div>


        <div className={styles.steps_container_mob} >
          <Carousel showArrows={false}
            breakPoints={breakPoints} pagination={true}>

            {steps.map((step, idx) =>
              <div key={idx} className={styles.step_box} >
                <div className={styles.icon_container}>
                  <Image src={step.icon} alt={step.title} />
                </div>

                <div className={styles.title}>
                  <Typography variant='h4'>
                    {step.title}
                  </Typography>
                </div>


                <div className={styles.desc}>
                  <Typography>{step.desc}</Typography>
                </div>

              </div>

            )}

          </Carousel>

        </div>

        <div className={styles.stepBtn}>
          <Button>
            <Link href='/quote'>{t("howItWorks:btn")}</Link>
          </Button>
        </div>
      </Container>
    </section >
  )
}

export default HowItWorks



