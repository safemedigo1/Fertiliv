import React from 'react'
import styles from './index.module.scss'
import { Container, Typography } from '@mui/material'
import Link from 'next/link'
import imgs from '../../../assets/constants/imgs'
import Image from 'next/image'
const WhyFertiliv = () => {
  const { Success, Packages, Experience } = imgs;


  return (
    <section id={styles.WhyFertiliv}>
      <Container>
        <div className={styles.title}>
          <Typography variant='h3'>Why Choose Fertiliv?</Typography>
        </div>

        <div className={styles.boxes_container}>

          <div className={styles.box} >
            <div className={styles.icon_container}>
              <Image src={Success} alt="ICON" />
            </div>

            <div className={styles.box_title}>
              <Typography variant='h4'>High Success</Typography>
            </div>

            <div className={styles.desc}>
              <Typography>
                Trust our team to <br />
                understand your unique  <br />
                needs and create a  <br />
                personalized strategy for  <br />
                starting a family. Let us  <br />
                make your dreams a reality.
              </Typography>
            </div>

            <div className={styles.link}>
              <Link href='/'>Meet our team</Link>
            </div>
          </div>

          <div className={styles.box} >
            <div className={styles.icon_container}>
              <Image src={Packages} alt="ICON" />
            </div>

            <div className={styles.box_title}>
              <Typography variant='h4'>Affordable Packages</Typography>
            </div>

            <div className={styles.desc}>
              <Typography>
                Affordable advanced fertility <br />
                treatments Seeking to make <br />
                it easier for everyone to <br />
                have a baby. Enjoy your <br />
                free online initial <br />
                consultations.
              </Typography>
            </div>

            <div className={styles.link}>
              <Link href='/'>Book a consultation</Link>
            </div>
          </div>

          <div className={styles.box} >
            <div className={styles.icon_container}>
              <Image src={Experience} alt="ICON" />
            </div>

            <div className={styles.box_title}>
              <Typography variant='h4'>The A-Z Experience</Typography>
            </div>

            <div className={styles.desc}>
              <Typography>
                We offer a seamless journey <br />
                to parenthood, providing: <br />
                1-accommodations <br />
                2-transportation <br />
                3-assistance with unrelated <br />
                treatments in Turkey.
              </Typography>
            </div>

            <div className={styles.link}>
              <Link href='/'>Let us call you</Link>
            </div>
          </div>
        </div>

        {/* <div className={styles.video}>
          <iframe src="" frameborder="0"></iframe>

          <Typography>Fertility clinic Fertiliv in Istanbul</Typography>
        </div> */}
      </Container>
    </section>
  )
}

export default WhyFertiliv