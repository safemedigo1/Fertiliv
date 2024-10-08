import React from 'react'
import styles from './index.module.scss'
import { Container, Typography } from '@mui/material'
import imgs from '../../../public/assets/constants/imgs'
import Image from 'next/image'
import ImageGallery from "react-image-gallery";
import CloseIcon from '@mui/icons-material/Close';
import { useState } from 'react'
import { motion } from 'framer-motion'
import { useRouter } from 'next/router'
import { useTranslation } from 'react-i18next'

const IvfClinic = () => {
  const { t } = useTranslation();
  const { small_1, small_2, small_3, small_4, big } = imgs;
  const [showGallery, setShowGallery] = useState(false)
  const { locale } = useRouter();

  const images = [
    {
      original: '/assets/imgs/gallery/1.webp',
      thumbnail: '/assets/imgs/gallery/1.webp',
    },
    {
      original: "/assets/imgs/gallery/2.webp",
      thumbnail: "/assets/imgs/gallery/2.webp",
    },
    {
      original: "/assets/imgs/gallery/3.webp",
      thumbnail: "/assets/imgs/gallery/3.webp",
    },
    {
      original: "/assets/imgs/gallery/4.webp",
      thumbnail: "/assets/imgs/gallery/4.webp",
    },
    {
      original: "/assets/imgs/gallery/5.webp",
      thumbnail: "/assets/imgs/gallery/5.webp",
    },
    {
      original: "/assets/imgs/gallery/6.webp",
      thumbnail: "/assets/imgs/gallery/6.webp",
    },
    {
      original: "/assets/imgs/gallery/8.webp",
      thumbnail: "/assets/imgs/gallery/8.webp",
    },
    {
      original: "/assets/imgs/gallery/9.webp",
      thumbnail: "/assets/imgs/gallery/9.webp",
    },
    {
      original: "/assets/imgs/gallery/10.webp",
      thumbnail: "/assets/imgs/gallery/10.webp",
    },
    {
      original: "/assets/imgs/gallery/11.webp",
      thumbnail: "/assets/imgs/gallery/11.webp",
    },
    {
      original: "/assets/imgs/gallery/12.webp",
      thumbnail: "/assets/imgs/gallery/12.webp",
    },
    {
      original: "/assets/imgs/gallery/13.webp",
      thumbnail: "/assets/imgs/gallery/13.webp",
    },
  ];

  return (
    <section id='IvfClinic' className={styles.IvfClinic} dir={locale === 'ar' ? 'rtl' : 'ltr'}>
      <Container>
        <div className={styles.title}>
          <Typography variant='h3'>{t("ivfClinic:sec_title")}</Typography>
        </div>
        <div className={styles.desc}>
          <Typography>
            {t("ivfClinic:desc_title")}
          </Typography>
        </div>

        <div className={styles.images_container} onClick={() => setShowGallery(true)}>
          <div className={styles.main_img}>
            <img src={'/assets/imgs/gallery/12.webp'} alt='Fertiliv' />
          </div>


          <div className={styles.small_images}>
            <img src={'/assets/imgs/gallery/1.webp'} alt='Fertiliv' />
            <img src={'/assets/imgs/gallery/7.webp'} alt='Fertiliv' />
            <img src={'/assets/imgs/gallery/3.webp'} alt='Fertiliv' />
            <img src={'/assets/imgs/gallery/9.webp'} alt='Fertiliv' />
            <img src={'/assets/imgs/gallery/5.webp'} alt='Fertiliv' />
            <img src={'/assets/imgs/gallery/6.webp'} alt='Fertiliv' />
          </div>
        </div>

        {showGallery &&
          <motion.div
            animate={{ opacity: 1 }}
            initial={{ opacity: 0 }}
            transition={{ duration: 0.5, }}

            className="fullscreen-image-gallery">
            <div className="fullscreen-image-gallery__wrapper">
              <ImageGallery items={images} showIndex={true} />
            </div>

            <div className="close_icon" onClick={() => setShowGallery(false)}>
              <CloseIcon />
            </div>
          </motion.div>

        }





      </Container>
    </section>
  )
}

export default IvfClinic



