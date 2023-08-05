import { Button, Container, Typography } from '@mui/material'
import React from 'react'
import styles from './index.module.scss'
import imgs from '../../../assets/constants/imgs'
import Image from 'next/image'


const Hero = () => {
  const { Hero_baby } = imgs;
  return (
    <section id={styles.hero}>
      <Container>
        <div className={styles.card}>
          <div className={styles.car_inner}>
            <div className={styles.text_container}>
              <div className={styles.title}>
                <Typography variant='h2'>Let us help you bring hope, happiness and a new life <br />
                  into the world.</Typography>
              </div>

              <div className={styles.desc}>
                <Typography>
                  Advanced Fertility Center Fertiliv
                </Typography>
              </div>


              <div className={styles.btn}>
                <Button>Free Online Consultation</Button>
              </div>
            </div>
            <div className={styles.img_container}>
              <Image src={Hero_baby} alt="" />
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}

export default Hero