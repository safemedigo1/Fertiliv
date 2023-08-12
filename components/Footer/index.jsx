import React from 'react'
import styles from './index.module.scss';
import { Button, Container, Typography } from '@mui/material';
import imgs from '../../assets/constants/imgs';
import Image from 'next/image';
import Link from 'next/link';
const Footer = () => {
  const { logo, facebook,
    instagram,
    youtube,
    twitter,
    tr,
    en,
    ar, } = imgs;
  return (
    <>
      <footer id='footeer' className={styles.footer}>
        <Container>
          <div className={styles.footer_container}>
            <div className={styles.text_container}>
              <Link href={'/'} className={styles.logo}>
                <Image src={logo} alt="logo" />
                <Typography variant='h1'>Fertiliv</Typography>
              </Link>

              <div className={styles.desc}>
                <Typography>Advanced Fertility Center Fertiliv</Typography>
              </div>

              <div className={styles.language} >
                <Link href='/'>
                  <Image src={en} alt="en" />
                  <Typography>
                    English
                  </Typography>
                </Link>
                <Link href='/'>
                  <Image src={ar} alt="ar" />
                  <Typography>
                    Arabic
                  </Typography>
                </Link>
                <Link href='/'>
                  <Image src={tr} alt="tr" />
                  <Typography>
                    Turkish
                  </Typography>
                </Link>
              </div>

            </div>


            <div className={styles.media_container}>
              <div className={styles.media}>
                <Link href="">
                  <Image src={twitter} alt="twitter" />
                </Link>
                <Link href="">
                  <Image src={facebook} alt="facebook" />
                </Link>
                <Link href="">
                  <Image src={instagram} alt="instagram" />
                </Link>
                <Link href="">
                  <Image src={youtube} alt="youtube" />
                </Link>
              </div>

              <div className={styles.subscribe_container}>
                <div className={styles.title}>
                  <Typography>Subscribe To Our Newsletter</Typography>
                </div>

                <div className={styles.input_container}>
                  <label htmlFor="email">
                    <Button>
                      Send
                    </Button>
                  </label>
                  <input type="email" placeholder='email@example.com' />
                </div>
              </div>
            </div>
          </div>

        </Container>
      </footer>

      <Typography sx={{ textAlign: 'center', color: '#1B0968', fontSize: '18px', fontWeight: '400', fontFamily: 'Quicksand' }}>Fertiliv 2023 protected copy write</Typography>
    </>

  )
}

export default Footer