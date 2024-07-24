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



import React, { useRef } from 'react'
import styles from './index.module.scss'
import { Container } from '@mui/material'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { Navigation, Thumbs, FreeMode, Pagination } from 'swiper/modules';
import 'swiper/css/navigation';
import Link from 'next/link';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';

const DoctorsSection = () => {
  const prevRef = useRef(null);
  const nextRef = useRef(null);

  const doctors = [
    {
      name: 'Dr Nilay Karaca',
      specialist: 'IVF Gynaecologist',
      image: '/nilay.png',
    },
    {
      name: 'Doç. Dr. A.Kadir Tepeler',
      specialist: 'IVF Urologist',
      image: '/kadir.png',
    },
    {
      name: 'Op. Dr. Mehmet Remzi Erdem',
      specialist: 'IVF Urologist',
      image: '/mehmet.png',
    },
    {
      name: 'Mr Majd Khaled',
      specialist: 'Patient Manager',
      image: '/majd.png',
    },
  ];

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
            // navigation={true}

            navigation={{
              prevEl: prevRef.current,
              nextEl: nextRef.current,
            }}
            // onBeforeInit={(swiper) => {
            //   swiper.params.navigation.prevEl = prevRef.current;
            //   swiper.params.navigation.nextEl = nextRef.current;
            // }}
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
            modules={[Navigation, Pagination]}

            dir={`ltr`}
            className={styles.swiper_container}
          >
            {doctors.map((doctor, index) => (
              <SwiperSlide key={index} className={styles.swiper_slide_box}>
                <div className={styles.box}>
                  <div className={styles.image_container}>
                    <img src={doctor.image} alt={doctor.name} />
                  </div>
                  <div className={styles.title}>
                    <p>{doctor.name}</p>
                  </div>
                  <div className={styles.buttom_container}>
                    <div className={styles.specialist}>
                      <p>{doctor.specialist}</p>
                    </div>
                    <div className={styles.icon_container}>
                      <IoIosArrowBack />
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}



          </Swiper>


          <div ref={prevRef} className={styles.icon_container2}>
            <IoIosArrowBack />
          </div>

          <div ref={nextRef} className={styles.icon_container2}>
            <IoIosArrowForward />
          </div>
        </div>
      </Container>
    </section>
  )
}

export default DoctorsSection
