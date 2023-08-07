import { AppBar, Container, Grid } from '@mui/material'
import React from 'react'
import styles from './index.module.scss'


import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import CssBaseline from '@mui/material/CssBaseline';
import useScrollTrigger from '@mui/material/useScrollTrigger';
import Box from '@mui/material/Box';
import Slide from '@mui/material/Slide';
import Link from 'next/link';
import imgs from '../../assets/constants/imgs'
import Image from 'next/image';

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
  { title: 'IVF Steps', link: '/IVF-Steps' },
  { title: 'Get A Quote', link: '/quote' },
  { title: 'About Fertiliv Clinic', link: '/about-us' },
  { title: 'Contact Us', link: '/Contact-Us' },
]

const Navbar = (props) => {
  const { whatsapp, logo } = imgs;
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