// import React from 'react'
// import styles from './index.module.scss'
// import { Container } from '@mui/material'
// import { Swiper, SwiperSlide } from 'swiper/react';
// import 'swiper/css';
// import Link from 'next/link';
// import { IoIosArrowBack } from 'react-icons/io';

// const DoctorsSection = ({ popularDoctors }) => {
//   console.log(popularDoctors, "popularDoctors")

//   const doctors = [
//     {
//       name: 'Dr Nilay Karaca',
//       specialist: 'IVF Gynaecologist',
//       image: '/nilay.png',
//     },
//     {
//       name: 'Doç. Dr. A.Kadir Tepeler',
//       specialist: 'IVF Urologist',
//       image: '/kadir.png',
//     },
//     {
//       name: 'Op. Dr. Mehmet Remzi Erdem',
//       specialist: 'IVF Urologist',
//       image: 'mehmet.png',
//     },
//     {
//       name: 'Mr Majd Khaled',
//       specialist: 'Patient Manager',
//       image: 'majd.png',
//     },
//   ]
//   return (
//     <section id='doctorsSection' className={styles.doctors_section}>
//       <Container>
//         <div className={styles.section_container}>
//           <div className={styles.title}>

//             <div className={styles.sec_title}>
//               <h3>MEDICAL PROFESSIONALS</h3>
//             </div>

//             <div className={styles.main_title}>
//               <h3>Experienced Doctors</h3>

//             </div>
//           </div>

//           <div className={styles.desc}>
//             <p>
//               Every team member possesses extensive expertise in infertility treatment from leading assisted reproduction centers in Turkey and internationally. Seasoned professionals enhance our clients' likelihood of achieving a successful pregnancy.
//             </p>
//           </div>

//           <Swiper
//             breakpoints={{
//               300: {
//                 slidesPerView: 1.2,
//                 spaceBetween: 0,
//               },
//               400: {
//                 slidesPerView: 1.2,
//                 spaceBetween: 0,
//               },
//               414: {
//                 slidesPerView: 1.2,
//                 spaceBetween: 0,
//               },
//               640: {
//                 slidesPerView: 1.2,
//                 spaceBetween: 0,
//               },
//               768: {
//                 slidesPerView: 1.8,
//                 spaceBetween: 10,
//               },
//               900: {
//                 slidesPerView: 1.8,
//                 spaceBetween: 10,
//               },
//               1024: {
//                 slidesPerView: 3.1,
//                 spaceBetween: 10,
//               },
//               1124: {
//                 slidesPerView: 2.1,
//                 spaceBetween: 10,
//               },
//               1400: {
//                 slidesPerView: 3.2,
//                 spaceBetween: 10,
//               },
//             }}
//             dir={`ltr`}
//             className={styles.swiper_container}
//           >


//             {doctors.map((doctor, index) =>

//               <SwiperSlide key={index} className={styles.swiper_slide_box}>
//                 <div className={styles.box}>
//                   <div className={styles.image_container}>
//                     <img src={doctor.image} alt={doctor.name} />
//                   </div>

//                   <div className={styles.title}>
//                     <p>{`${doctor.name}`}</p>
//                   </div>

//                   <div className={styles.buttom_container}>
//                     <div className={styles.specialist}>
//                       <p>{doctor.specialist}</p>
//                     </div>
//                     <div className={styles.icon_container}>
//                       <IoIosArrowBack />
//                     </div>
//                   </div>
//                 </div>
//               </SwiperSlide>


//             )}


//           </Swiper>
//         </div>
//       </Container>
//     </section>
//   )
// }

// export default DoctorsSection



import React, { useEffect, useRef, useState } from 'react'
import styles from './index.module.scss'
import { Container } from '@mui/material'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css/navigation';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
import { useTranslation } from 'react-i18next';
import { useRouter } from 'next/router';
import Link from 'next/link';

const doctors = [
  {
    name: 'Dr Nilay Karaca',
    specialist: 'IVF Gynaecologist',
    image: '/nilay.png',
    link: 'Dr-Nilay-Karaca'
  },
  {
    name: 'Doç. Dr. A.Kadir Tepeler',
    specialist: 'IVF Urologist',
    image: '/kader.png',
    link: 'Doc-Dr-A-Kadir-Tepeler'

  },
  {
    name: 'Op. Dr. Mehmet Remzi Erdem',
    specialist: 'IVF Urologist',
    image: '/mehmet.png',
    link: 'Dr-remzi-erdem'

  },
  {
    name: 'Mr Majd Khaled',
    specialist: 'Patient Manager',
    image: '/majd.png',
  },
];

const DoctorsSection = ({ dataMostPopularDocs }) => {
  const { t } = useTranslation()
  const { locale } = useRouter()
  const prevRef = useRef(null);
  const nextRef = useRef(null);
  const swiperRef = useRef(null);



  const [isSwiperInitialized, setIsSwiperInitialized] = useState(false);


  useEffect(() => {
    if (swiperRef.current && prevRef.current && nextRef.current) {
      swiperRef.current.navigation.init();
      swiperRef.current.navigation.update();
      setIsSwiperInitialized(true);
    }
  }, [swiperRef, prevRef, nextRef]);



  const [doctorArray, setDoctorArray] = useState(dataMostPopularDocs);

  // Find the doctor with id 78
  const idSeventyEight = doctorArray.find(item => item.id === 78);

  // Filter out the doctor with id 78
  const filteredArray = doctorArray.filter(item => item.id !== 78);

  // Reorder the array with doctor id 78 at the start
  const reorderedArray = idSeventyEight ? [idSeventyEight, ...filteredArray] : doctorArray;


  return (
    <section id='doctorsSection' className={styles.doctors_section} dir={locale === 'ar' ? 'rtl' : 'ltr'}>

      <Container>
        <div className={styles.section_container}>

          <div className={styles.title}>
            <div className={styles.sec_title}>
              <h3>{t("doctor:medical_title")}</h3>
            </div>
            <div className={styles.main_title}>
              <h3>{t("doctor:medical_title2")}</h3>
            </div>
          </div>

          <div className={styles.desc}>
            <p>
              {t("doctor:medical_desc")}
            </p>
          </div>

          <Swiper
            ref={swiperRef}
            navigation={{
              prevEl: prevRef.current,
              nextEl: nextRef.current,
            }}

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
                slidesPerView: 3.1,
                spaceBetween: 10,
              },
              1400: {
                slidesPerView: 3.2,
                spaceBetween: 10,
              },
            }}
            modules={[Navigation, Pagination]}
            dir={'rtl'}

            onSwiper={(swiper) => {
              swiperRef.current = swiper;
              if (!isSwiperInitialized) {
                swiper.navigation.init();
                swiper.navigation.update();
              }
            }}
            className={styles.swiper_container}
          >
            {reorderedArray.map((doctor, index) => (
              <SwiperSlide key={index} className={styles.swiper_slide_box}>
                <Link href={`${`/doctor/${doctor.slug}`}`} className={styles.box}>
                  <div className={styles.image_container}>
                    <img src={doctor.image} alt={doctor.name} />
                  </div>
                  <div className={styles.title}>
                    <p>{doctor.doctorLevel} {doctor.firstName} {doctor.lastName}</p>
                  </div>
                  <div className={styles.specialist}>
                    <p>{doctor.mainSpecialization}</p>
                  </div>
                  <div className={styles.buttom_container}>
                    <div className={styles.specialist}>
                      <p>{doctor.specialist}</p>
                    </div>
                    <div className={styles.icon_container}>
                      <IoIosArrowBack />
                    </div>
                  </div>
                </Link>
              </SwiperSlide>
            ))}



          </Swiper>

          <div ref={prevRef} className={styles.icon_container_right2}>
            <IoIosArrowBack />
          </div>

          <div ref={nextRef} className={styles.icon_container_left2}>
            <IoIosArrowForward />
          </div>

        </div>
      </Container>

    </section>
  )
}

export default DoctorsSection
