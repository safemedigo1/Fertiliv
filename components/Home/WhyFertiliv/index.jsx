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
        <div className={styles.section_container}>
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
                  Trust our team to
                  understand your unique
                  needs and create a
                  personalized strategy for
                  starting a family.
                  <br />Let us
                  make your dreams a reality.
                </Typography>
              </div>

              <div className={styles.link}>
                <Link href='#doctor'>Meet our team</Link>
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
                  Affordable advanced fertility
                  treatments Seeking to make
                  it easier for everyone to
                  have a baby.<br /> Enjoy your
                  free online initial
                  consultations.

                </Typography>
              </div>

              <div className={styles.link}>
                <Link href='#consultation'>Book a consultation</Link>
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
                  We offer a seamless journey
                  to parenthood, providing: <br />
                  1-accommodations <br />
                  2-transportation <br />
                  3-assistance with unrelated <br />
                  treatments in Turkey.
                </Typography>
              </div>

              <div className={styles.link}>
                <Link href='/quote'>Let us call you</Link>
              </div>
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