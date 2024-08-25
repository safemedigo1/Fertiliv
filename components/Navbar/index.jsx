import { AppBar, Container, Box } from '@mui/material'
import React, { useState } from 'react'
import styles from './index.module.scss'

import { BiChevronDown, } from 'react-icons/bi'
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import CssBaseline from '@mui/material/CssBaseline';
import useScrollTrigger from '@mui/material/useScrollTrigger';
import Slide from '@mui/material/Slide';
import Link from 'next/link';
import imgs from '../../public/assets/constants/imgs'
import Image from 'next/image';
import { GiHamburgerMenu } from 'react-icons/gi'
import { motion } from 'framer-motion'
import CloseIcon from '@mui/icons-material/Close';
import { useTranslation } from 'react-i18next';
import { useRouter } from 'next/router';
import menuStyles from "./languages-navbar.module.scss";
import { IoIosArrowDown } from "react-icons/io";

// Hide navbar on scroll (to bottom)
function HideOnScroll(props) {
  const { children, window } = props;
  // Note that you normally won't need to set the window ref as useScrollTrigger
  // will default to window.
  // This is only being set here because the demo is in an iframe.
  const trigger = useScrollTrigger({
    target: window ? window() : undefined,
  });

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  );
}


const Navbar = (props) => {
  const [showLangMenu, setShowLangMenu] = useState(false);
  const { t } = useTranslation();
  const { locale } = useRouter();
  const router = useRouter();
  const { whatsapp, logo, en, arrowDown, ar, tr } = imgs;
  const [showMenu, setShowMenu] = useState(false);

  const NavLinks = [
    { title: t("common:steps"), link: '#HowItWorks' },
    { title: t("common:quote"), link: '/quote' },
    { title: t("common:about"), link: '#IvfClinic' },
    { title: t("common:blogs"), link: '/blogs' },
    { title: t("common:contact"), link: '#consultation' },
  ]

  return (
    <>
      <CssBaseline />

      <HideOnScroll {...props} >

        <AppBar sx={{ backgroundColor: '#ffffff' }}>

          <Toolbar>
            <Container>

              <div className={styles.navbar} dir={locale === 'ar' ? 'rtl' : 'ltr'}>
                <Link href='/' className={styles.logo}>
                  <div className={styles.icon_container}>
                    <Image src={logo} alt="logo" />
                  </div>
                  <Typography variant={'h1'}>{t("common:site_name")}</Typography>
                </Link>

                <div className={styles.links}>
                  {NavLinks.map((link, idx) =>
                    <Link href={link.link} key={idx}>
                      {link.title}
                    </Link>)}



                </div>



                <div className={styles.num} dir='ltr'>


                  <div className={menuStyles.auth_methods} dir={`${router.locale === 'ar' ? 'rtl' : 'ltr'}`}>
                    <div className={menuStyles.lang}>
                      <div className={menuStyles.img_container}>
                        {router.locale === 'ar' &&
                          <Image
                            src={ar.src}
                            alt=""
                            width={20.7}
                            height={12.88}
                          />
                        }

                        {router.locale === 'en' &&
                          <Image
                            src={en.src}
                            alt=""
                            width={20.7}
                            height={12.88}
                          />
                        }



                        {router.locale === 'tr' &&
                          <Image
                            src={tr.src}
                            alt=""
                            width={20.7}
                            height={12.88}
                          />
                        }

                      </div>

                      <div className={menuStyles.lang_type}>
                        {router.locale === 'en' &&
                          <span>
                            EN
                          </span>
                        }

                        {router.locale === 'ar' &&
                          <span>
                            ع
                          </span>
                        }
                        {router.locale === 'tr' &&
                          <span>
                            TR
                          </span>
                        }
                      </div>

                      <div className={menuStyles.icon_container}>
                        <IoIosArrowDown

                        />

                      </div>

                      <div className={menuStyles.menuLinks__container}>
                        <ul>
                          {router.locales.slice().reverse().map((lang, idx) => (
                            <>
                              {
                                router.locale !== lang &&
                                < li >
                                  <a href={`/${lang}${router.asPath}`} key={idx}>
                                    {lang === 'en' && <>EN</>}
                                    {lang === 'tr' && <>TR</>}
                                    {lang === 'ar' && <>ع</>}
                                    <div className={menuStyles.img_container}>
                                      <Image
                                        src={lang === 'ar' ? ar.src : lang === 'en' ? en.src : lang === 'tr' ? tr.src : ''}
                                        alt="Picture of the author"
                                        width={20.7}
                                        height={12.88}
                                      />
                                    </div>
                                  </a>
                                </li>
                              }
                            </>

                          ))}
                        </ul>
                      </div>

                    </div>
                  </div>

                  <div className={styles.img_container}>
                    <Image src={whatsapp} alt="whatsapp" />
                  </div>
                  <Link href="https://wa.me/905011148060" target="_blank"> 90 501 114 80 60</Link>


                </div>

                <div className={styles.menu} >
                  <div className={styles.icon_container} onClick={() => setShowMenu(true)}>
                    <GiHamburgerMenu />
                  </div>

                  <Link href="https://wa.me/905011148060" className={styles.num}>
                    <div className={styles.img_container}>
                      <Image src={whatsapp} alt="whatsapp" />
                    </div>
                  </Link>

                </div>




                {showMenu &&
                  <motion.div className={styles.sidebar_container} animate={{ x: [300, 0] }}
                    transition={{ duration: 0.85, ease: "easeOut" }}>
                    <div className={styles.sidebar_inner}>
                      <div className={styles.close_icon} onClick={() => setShowMenu(false)}>
                        <CloseIcon />
                      </div>

                      <div className={styles.links}>
                        {NavLinks.map((link, idx) =>
                          <Link href={link.link} key={idx} onClick={() => setShowMenu(false)}>
                            {link.title}
                          </Link>)}
                      </div>

                      <Box className={styles.lang} display='flex' onClick={() => setShowLangMenu((prev) => !prev)}>
                        <div className={styles.img_container}>
                          {router.locale === 'en' &&
                            <Image
                              src={en.src}
                              alt="Picture of the author"
                              width={20.7}
                              height={12.88}
                            />
                          }

                          {router.locale === 'ar' &&
                            <Image
                              src={ar.src}
                              alt="Picture of the author"
                              width={20.7}
                              height={12.88}
                            />
                          }

                          {router.locale === 'tr' &&
                            <Image
                              src={tr.src}
                              alt="Picture of the author"
                              width={20.7}
                              height={12.88}
                            />
                          }
                        </div>
                        <div className={styles.lang_type}>
                          <span>
                            {router.locale === "ar" && <>ع</>}
                            {router.locale === "en" && <>EN</>}
                            {router.locale === "tr" && <>TR</>}
                          </span>
                        </div>

                        <div className={`${styles.icon_container} ${showLangMenu && styles.active}`} >
                          <BiChevronDown />
                        </div>
                      </Box>


                      {showLangMenu &&
                        <motion.ul
                          animate={{
                            y: [-40, 0],
                            opacity: 1
                          }}
                          transition={{ duration: 0.80, ease: "easeOut" }}
                          initial={{ opacity: 0 }}
                        >
                          {router.locales.slice().reverse().map((lang, idx) => (
                            <>
                              {
                                router.locale !== lang &&
                                <li>
                                  <a href={`/${lang}${router.asPath}`} key={idx}>
                                    {lang === 'en' && <>EN</>}
                                    {lang === 'tr' && <>TR</>}
                                    {lang === 'ar' && <>ع</>}
                                    <div className={styles.img_container}>
                                      <Image
                                        src={lang === 'ar' ? ar.src : lang === 'en' ? en.src : lang === 'tr' ? tr.src : ''}
                                        alt="Picture of the author"
                                        width={20.7}
                                        height={12.88}
                                      />
                                    </div>
                                  </a>
                                </li>
                              }
                            </>
                          ))}
                        </motion.ul>
                      }
                    </div>
                  </motion.div>

                }
              </div>



            </Container>

          </Toolbar>

        </AppBar>

      </HideOnScroll >

      <Toolbar />
    </>
  )
}

export default Navbar