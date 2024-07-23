import React from 'react'
import styles from './index.module.scss'
import { Container } from '@mui/material'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import Link from 'next/link';
import { IoIosArrowBack } from 'react-icons/io';

const DoctorsSection = ({ popularDoctors }) => {
  console.log(popularDoctors, "popularDoctors")
  return (
    <section id='doctorsSection' className={styles.doctors_section}>
      <Container>
        <div className={styles.section_container}>
          <div className={styles.title}>

            <div className={styles.sec_title}>
              <h3>MEDICAL PROFESSIONALS</h3>
            </div>

            <div className={styles.main_title}>
              <h3>Experienced Doctors</h3>

            </div>
          </div>

          <div className={styles.desc}>
            <p>
              Every team member possesses extensive expertise in infertility treatment from leading assisted reproduction centers in Turkey and internationally. Seasoned professionals enhance our clients' likelihood of achieving a successful pregnancy.
            </p>
          </div>

          <Swiper
            breakpoints={{
              300: {
                slidesPerView: 1.2,
                spaceBetween: 0,
              },
              400: {
                slidesPerView: 1.2,
                spaceBetween: 0,
              },
              414: {
                slidesPerView: 1.2,
                spaceBetween: 0,
              },
              640: {
                slidesPerView: 1.2,
                spaceBetween: 0,
              },
              768: {
                slidesPerView: 1.8,
                spaceBetween: 10,
              },
              900: {
                slidesPerView: 1.8,
                spaceBetween: 10,
              },
              1024: {
                slidesPerView: 3.1,
                spaceBetween: 10,
              },
              1124: {
                slidesPerView: 2.1,
                spaceBetween: 10,
              },
              1400: {
                slidesPerView: 3.2,
                spaceBetween: 10,
              },
            }}
            dir={`ltr`}
            className={styles.swiper_container}
          >


            {popularDoctors.map((doctor, index) =>

              <SwiperSlide key={index} className={styles.swiper_slide_box}>
                <Link href={`/doctor/${doctor.slug}`} className={styles.box}>
                  <div className={styles.image_container}>
                    <img src={doctor.image} alt={doctor.firstName} />
                  </div>

                  <div className={styles.title}>
                    <p>{`${doctor.firstName} ${doctor.fatherName} ${doctor.lastName}`}</p>
                  </div>

                  <div className={styles.buttom_container}>
                    <div className={styles.specialist}>
                      <p>{doctor.mainSpecialization}</p>
                    </div>
                    <div className={styles.icon_container}>
                      <IoIosArrowBack />
                    </div>
                  </div>
                </Link>
              </SwiperSlide>


            )}


          </Swiper>
        </div>
      </Container>
    </section>
  )
}

export default DoctorsSection