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
    { icon: Reproductive, title: 'Reproductive health and infertility association' },
    { icon: Eshre, title: 'European society of human reproduction and embryology' },
    { icon: arms, title: 'American society for reproductive medicine' },
    { icon: Tesvikler, title: 'Republic of turkey ministry of health' },
    { icon: International, title: 'International health tourism authorization certificate' },
    { icon: golden, title: 'Quality management system by ISO' },
    { icon: Junior, title: 'Junior chamber international' },
    { icon: ISO, title: 'International organization for standardization' },
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