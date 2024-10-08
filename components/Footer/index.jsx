import React, { useEffect, useState } from 'react'
import styles from './index.module.scss';
import { Button, Container, Typography } from '@mui/material';
// import imgs from '../../../public/assets/constants/imgs';

import Image from 'next/image';
import Link from 'next/link';
import imgs from '../../public/assets/constants/imgs';
import { useTranslation } from 'react-i18next';
import { useRouter } from 'next/router';
const Footer = () => {
  const { t } = useTranslation();
  const { locale } = useRouter();
  const router = useRouter();

  const { logo, facebook,
    instagram,
    youtube,
    twitter,
    tr,
    en,
    ar, } = imgs;



  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true)
  }, [])
  if (isClient)

    return (
      <>
        <footer id='footeer' className={styles.footer} dir={locale === 'ar' ? 'rtl' : 'ltr'}>
          <Container>
            <div className={styles.footer_container}>
              <div className={styles.text_container}>
                <Link href={'/'} className={styles.logo}>
                  <Image src={logo} alt="logo" />
                  <Typography variant='h1'>{t("common:site_name")}</Typography>
                </Link>

                <div className={styles.desc}>
                  <Typography>{t("hero:hero_title_sec")}</Typography>
                </div>

                <div className={styles.language} >
                  <a href={`/en${router.asPath}`}>
                    <Image src={en} alt="en" />
                    <Typography>
                      English
                    </Typography>
                  </a>
                  <a href={`/ar${router.asPath}`}>
                    <Image src={ar} alt="ar" />
                    <Typography>
                      Arabic
                    </Typography>
                  </a>
                  <a href={`/tr${router.asPath}`}>
                    <Image src={tr} alt="tr" />
                    <Typography>
                      Turkish
                    </Typography>
                  </a>
                </div>

                <div className={styles.media_container}>
                  <div className={styles.media}>
                    {/* <Link href="">
                    <Image src={twitter} alt="twitter" />
                  </Link> */}

                    <Link href="https://www.facebook.com/profile.php?id=100089693390459" target='_blank'>
                      <Image src={facebook} alt="facebook" />
                    </Link>

                    <Link href="https://www.instagram.com/fertiliv/" target='_blank'>
                      <Image src={instagram} alt="instagram" />
                    </Link>


                    {/* <Link href="">
                    <Image src={youtube} alt="youtube" />
                  </Link> */}
                  </div>

                  {/* <div className={styles.subscribe_container}>
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
                </div> */}
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