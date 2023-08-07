import React from 'react'
import imgs from '../../../assets/constants/imgs'
import styles from './index.module.scss'
import { Button, Container, Typography } from '@mui/material'
import Image from 'next/image'
import Link from 'next/link'
const HowItWorks = () => {
  const { Planning,
    Stimulation,
    Collection,
    Laboratory,
    Transfer, } = imgs;


  const steps = [
    { icon: Planning, title: 'Planning', desc: 'Discuss with our specialists the reasons of your infertility and treatment options after initial consultation and tests (online or in person)' },
    { icon: Stimulation, title: 'Stimulation', desc: 'The ovaries are stimulated with medication and the development of the eggs is monitored with ultrasound over several visits' },
    { icon: Collection, title: 'Collection', desc: 'Collecting eggs under anesthesia by ultrasound while collecting sperm from the husband via ejaculation or performing TESA/PESA then give them all to embryology lab.' },
    { icon: Laboratory, title: 'Laboratory', desc: 'In our state-of-the-art lab, our embryologists collect and inject a single sperm into your eggs using ICSI, ensuring precise fertilization and increasing your chances of success.' },
    { icon: Transfer, title: 'Transfer &', desc: "Three to five days after fertilization, the healthy embryos will be transferred to your uterus. And two weeks later, a simple blood test will confirm if you're on the path to starting a family." },
  ]
  return (
    <section id='HowItWorks' className={styles.HowItWorks}>
      <Container>
        <div className={styles.title}>
          <Typography variant='h3'>How IVF Works! </Typography>
        </div>

        <div className={styles.desc}>
          <Typography >Our modern IVF method brings your dream of having a family to life </Typography>

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

        <div className={styles.stepBtn}>
          <Button>
            <Link href='/'>Take The First Step!</Link>
          </Button>
        </div>
      </Container>
    </section >
  )
}

export default HowItWorks