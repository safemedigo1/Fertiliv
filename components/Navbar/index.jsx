import { AppBar, Container, Box } from '@mui/material'
import React, { useState } from 'react'
import styles from './index.module.scss'


import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import CssBaseline from '@mui/material/CssBaseline';
import useScrollTrigger from '@mui/material/useScrollTrigger';
import Slide from '@mui/material/Slide';
import Link from 'next/link';
import imgs from '../../assets/constants/imgs'
import Image from 'next/image';
import { GiHamburgerMenu } from 'react-icons/gi'
import { motion } from 'framer-motion'
import CloseIcon from '@mui/icons-material/Close';

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

const NavLinks = [
  { title: 'IVF Steps', link: '#HowItWorks' },
  { title: 'Get A Quote', link: '/quote' },
  { title: 'About Fertiliv Clinic', link: '#IvfClinic' },
  { title: 'Contact Us', link: '#consultation' },
]

const Navbar = (props) => {
  const { whatsapp, logo } = imgs;
  const [showMenu, setShowMenu] = useState(false);

  return (
    <>
      <CssBaseline />
      <HideOnScroll {...props} >
        <AppBar sx={{ backgroundColor: '#ffffff' }}>
          <Toolbar>
            <Container>

              <div className={styles.navbar}>
                <Link href='/' className={styles.logo}>
                  <div className={styles.icon_container}>
                    <Image src={logo} alt="logo" />
                  </div>
                  <Typography variant={'h1'}>Fertiliv</Typography>
                </Link>

                <div className={styles.links}>
                  {NavLinks.map((link, idx) =>
                    <Link href={link.link} key={idx}>
                      {link.title}
                    </Link>)}
                </div>

                <div className={styles.num}>
                  <div className={styles.img_container}>
                    <Image src={whatsapp} alt="whatsapp" />
                  </div>
                  <Link href="tel:(+90) 552 502 6000">0090 552 502 6000</Link>
                </div>

                <div className={styles.menu} >
                  <div className={styles.icon_container} onClick={() => setShowMenu(true)}>
                    <GiHamburgerMenu />
                  </div>

                  <Link href="tel:(+90) 552 502 6000" className={styles.num}>
                    <div className={styles.img_container}>
                      <Image src={whatsapp} alt="whatsapp" />
                    </div>
                  </Link>

                </div>

                {showMenu &&
                  <motion.div className={styles.sidebar_container} animate={{ x: [300, 0] }}
                    transition={{ duration: 0.85, ease: "easeOut" }}
                  >
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