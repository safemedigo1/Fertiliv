import React from 'react'
import styles from './index.module.scss';
import imgs from '../../../assets/constants/imgs';
import { Container, Typography } from '@mui/material';
import Image from 'next/image';
const Memberships = () => {
  const { ISO,
    golden,
    International,
    Reproductive,
    arms,
    Eshre,
    Junior,
    Tesvikler, } = imgs;

  const memberships = [
    { icon: Reproductive, title: 'Reproductive Health And Infertility Association' },
    { icon: Eshre, title: 'European Society Of Human Reproduction And Embryology' },
    { icon: arms, title: 'American Society For Reproductive Medicine' },
    { icon: Tesvikler, title: 'Republic Of Turkey Ministry Of Health' },
    { icon: International, title: 'International Health Tourism Authorization Certificate' },
    { icon: golden, title: 'Quality Management System By ISO' },
    { icon: Junior, title: 'Junior Chamber International' },
    { icon: ISO, title: 'International Organization For Standardization' },
  ]
  return (
    <section id='memberships' className={styles.memberships}>
      <Container>
        <div className={styles.section_container}>

          <div className={styles.text_container}>
            <div className={styles.title}>
              <Typography variant='h3'>
                Memberships & Quality Standards</Typography>
            </div>
            <div className={styles.title2}>
              <Typography variant='h3'>
                Fertiliv clinic </Typography>
            </div>

            <div className={styles.desc}>
              <Typography>Is dedicated to providing  the best possible care for our patients. That's why we strictly follow the protocols set by leading organizations such as:</Typography>
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