import React from 'react'
import styles from './index.module.scss'
import { Container, Typography } from '@mui/material'
import imgs from '../../../assets/constants/imgs'
import Image from 'next/image'
const IvfClinic = () => {
  const { small_1, small_2, small_3, small_4, big } = imgs
  return (
    <section id='IvfClinic' className={styles.IvfClinic}>
      <Container>
        <div className={styles.title}>
          <Typography variant='h3'>IVF Clinic In Istanbul</Typography>
        </div>
        <div className={styles.desc}>
          <Typography>Clinic Fertiliv was founded in 1997. Since then we have helped thousands <br />
            of couples from all over the world to fulfill their dream of having children. In <br />
            2022, we moved to brand new premises, where we offer our clients maximum <br />
            comfort and the best medical care. Our IVF clinic is located 45 minutes from <br />
            Istanbul airport and is very accessible by car and public transport.</Typography>
        </div>

        <div className={styles.images_container}>
          <div className={styles.main_img}>
            <Image src={big} alt='hospital image' />
          </div>

          <div className={styles.small_images}>
            <Image src={small_1} alt='hospital image' />
            <Image src={small_2} alt='hospital image' />
            <Image src={small_3} alt='hospital image' />
            <Image src={small_4} alt='hospital image' />

          </div>
        </div>
      </Container>
    </section>
  )
}

export default IvfClinic