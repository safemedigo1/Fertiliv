// import React, { useState } from 'react'
// import { useRouter } from 'next/router';
// import styles from './index.module.scss';
// import { Container, FormControl, MenuItem, Select, Typography, } from '@mui/material';
// import { useTranslation } from "react-i18next";
// import Carousel, { consts } from 'react-elastic-carousel';
// import { useEffect } from 'react';
// import { HiChevronLeft, HiChevronRight } from 'react-icons/hi'
// import Image from 'next/image';
// import ExpandMoreOutlinedIcon from "@mui/icons-material/ExpandMoreOutlined";
// import axios from 'axios';

// const BeforeAfter = ({ treatments, beforeCards, dataDoctorTreatments }) => {
//   const router = useRouter();
//   const { t } = useTranslation();
//   const [treatmentsBeforeAFter, setTreatmentsBeforeAFter] = useState()
//   useEffect(() => {
//     setTreatmentsBeforeAFter(treatments)
//     router.pathname === '/doctor/[slug]' && setTreatmentsBeforeAFter(beforeCards)
//   }, [])



//   const [BeforeAfterbreakPoints] = useState([
//     { width: 1, pagination: true, showArrows: false },
//     { width: 300, pagination: true, showArrows: false, itemsToShow: 1, itemsToScroll: 1 },
//     { width: 400, pagination: true, itemsToShow: 1, itemsToScroll: 1, showArrows: false },
//     { width: 800, pagination: true, itemsToShow: 4, itemsToScroll: 1, showArrows: false },
//     { width: 900, pagination: false, itemsToShow: 3, itemsToScroll: 1 },

//   ])


//   function myArrow({ type, onClick, isEdge }) {
//     const pointer = type === consts.PREV ?
//       <div className='left_arrow'>
//         <HiChevronLeft />
//       </div>

//       :
//       <div className='right_arrow'>
//         <  HiChevronRight />
//       </div>

//       ;
//     return (
//       <button className='main_btn' onClick={onClick} disabled={isEdge}>
//         {pointer}
//       </button>
//     );
//   }


//   // Select Style
//   const SelecetStyleEn = {
//     backgroundColor: "#1b0968",
//     color: "#FFFFFF",
//     fontSize: "18px",
//     fontWeight: "bold",
//     fontFamily: 'Quicksand',
//     borderRadius: '0px',
//     '&:focus': {
//       backgroundColor: 'red !important',
//     },
//   }
//   const SelecetStyleAr = {
//     backgroundColor: "#1b0968",
//     color: "#FFFFFF",
//     fontSize: "18px",
//     fontWeight: "bold",
//     fontFamily: 'Tajawal',


//   }


//   // Filter Logic
//   const [treatmentImages, setTreatmentImages] = useState([]);
//   const [value, setValue] = useState();
//   const [treatmentSlug, setTreatmentSlug] = useState(dataDoctorTreatments[0]?.treatmentSlug);
//   const handleFilterChanges = (event, value) => {
//     setTreatmentSlug(value.props.children)
//     setValue(value.props.children)
//   }

//   const getTreatmentImages = async () => {
//     const resTreatmentData = await axios.post("https://api1.fertiliv.com/api/v1/Doctor/GetDoctorTreatmentsImages", {
//       "doctorSlug": router.query.slug,
//       "treatmentSlug": dataDoctorTreatments[0]?.treatmentSlug,
//       "lang": router.locale
//     }, {
//       headers: {
//         'Accept': 'application/json',
//         'Content-Type': 'application/json'
//       }
//     }).catch((error) => console.log(error))

//     if (resTreatmentData?.status === 200) {
//       setTreatmentImages(resTreatmentData.data)
//     } else {
//       setTreatmentImages([])
//     }
//   }
//   useEffect(() => {
//     getTreatmentImages()
//   }, [treatmentSlug])


//   return (
//     <>
//       {
//         // dataDoctorTreatments.length > 0 &&
//         <section id={styles.before_after} dir={`${router.locale === 'ar' ? 'rtl' : 'ltr'}`}>
//           <Container sx={{ maxWidth: "1239px" }} maxWidth={false}>
//             <div className={styles.sec_contianer}>
//               <div className={styles.filter_sec}>
//                 <FormControl fullWidth  >
//                   <Select
//                     displayEmpty
//                     value={dataDoctorTreatments.length > 0 ? dataDoctorTreatments[0].treatmentSlug : ''}
//                     inputProps={{ 'aria-label': 'Without label' }}
//                     IconComponent={ExpandMoreOutlinedIcon}
//                     onChange={handleFilterChanges}
//                     MenuProps={{
//                       anchorOrigin: { horizontal: 'right', vertical: 'bottom' },
//                       transformOrigin: { horizontal: 'right', vertical: 'top' },
//                     }}
//                     style={router.locale === 'ar' ? SelecetStyleAr : SelecetStyleEn}
//                     sx={{
//                       '.MuiSelect-icon': {
//                         color: '#FFFFFF !important',
//                         width: '25px',
//                         height: '25px',

//                       },
//                       '.MuiSelect-iconOpen': {
//                         color: 'rgb(0, 71, 71) !important',
//                       },
//                       '.MuiSelect-select ': {
//                         padding: '11px 18px 0px 18px !important',
//                         height: '40px!important',
//                       },
//                     }}
//                   >
//                     {dataDoctorTreatments.length > 0 &&
//                       dataDoctorTreatments.map((treatment, idx) => (
//                         <MenuItem
//                           dir={`${router.locale === 'ar' ? 'rtl' : 'ltr'}`}
//                           key={idx}
//                           value={treatment.treatmentSlug}
//                           sx={{
//                             fontFamily: router.locale === 'ar' ? 'var(--arabic-font)' : 'var(--quickstand-font)'
//                           }}
//                         >
//                           {treatment.treatmentName}
//                         </MenuItem>
//                       ))}
//                   </Select>

//                 </FormControl>

//               </div>

//               <div className={styles.title}>
//                 <Typography variant='h3'>
//                   {t('proceduresSymptoms_single:before_after2')}
//                 </Typography>
//               </div>

//             </div>
//           </Container >

//           <Container>
//             <div className={styles.slider_container}>
//               <Carousel
//                 breakPoints={BeforeAfterbreakPoints}
//                 itemsToScroll={1} renderArrow={myArrow}
//                 isRTL={router.locale === 'ar' ? true : false}
//               >

//                 {
//                   treatmentImages?.map((card, index) => (
//                     <div className={styles.box} key={index}>
//                       <div className={styles.imgs_container}>
//                         <Image width={388} height={200} src={card.imgBefore} alt="" />
//                         <Image width={388} height={200} src={card.imgAfter} alt="" />
//                       </div>
//                       <div className={styles.box_title}>
//                         <Typography variant='h5'>{t('proceduresSymptoms_single:before')}</Typography>
//                         <Typography variant='h5'>{t('proceduresSymptoms_single:after')}</Typography>
//                       </div>
//                       <div className={styles.desc}>
//                         <Typography>
//                           {card.description}
//                         </Typography>
//                       </div>
//                     </div>
//                   ))}

//               </Carousel>
//             </div>
//           </Container>
//         </section>


//       }
//     </>
//   )
// }

// export default BeforeAfter



import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import styles from './index.module.scss';
import { Container, FormControl, MenuItem, Select, Typography } from '@mui/material';
import { useTranslation } from "react-i18next";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import { HiChevronLeft, HiChevronRight } from 'react-icons/hi';
import Image from 'next/image';
import ExpandMoreOutlinedIcon from "@mui/icons-material/ExpandMoreOutlined";
import axios from 'axios';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const BeforeAfter = ({ treatments, beforeCards, dataDoctorTreatments }) => {
  const router = useRouter();
  const { t } = useTranslation();
  const [treatmentsBeforeAFter, setTreatmentsBeforeAFter] = useState();

  useEffect(() => {
    setTreatmentsBeforeAFter(treatments);
    if (router.pathname === '/doctor/[slug]') {
      setTreatmentsBeforeAFter(beforeCards);
    }
  }, [treatments, beforeCards, router.pathname]);

  const breakPoints = {
    1: { slidesPerView: 1 },
    300: { slidesPerView: 1 },
    400: { slidesPerView: 1 },
    800: { slidesPerView: 4 },
    900: { slidesPerView: 3 },
  };

  const [treatmentImages, setTreatmentImages] = useState([]);
  const [value, setValue] = useState();
  const [treatmentSlug, setTreatmentSlug] = useState(dataDoctorTreatments[0]?.treatmentSlug);

  const handleFilterChanges = (event, value) => {
    setTreatmentSlug(value.props.value);
    setValue(value.props.value);
  };

  const getTreatmentImages = async () => {
    const resTreatmentData = await axios.post("https://api1.fertiliv.com/api/v1/Doctor/GetDoctorTreatmentsImages", {
      doctorSlug: router.query.slug,
      treatmentSlug: treatmentSlug,
      lang: router.locale
    }, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    }).catch((error) => console.log(error));

    if (resTreatmentData?.status === 200) {
      setTreatmentImages(resTreatmentData.data);
    } else {
      setTreatmentImages([]);
    }
  };

  useEffect(() => {
    getTreatmentImages();
  }, [treatmentSlug], getTreatmentImages);

  const SelecetStyleEn = {
    backgroundColor: "#1b0968",
    color: "#FFFFFF",
    fontSize: "18px",
    fontWeight: "bold",
    fontFamily: 'Quicksand',
    borderRadius: '0px',
    '&:focus': {
      backgroundColor: 'red !important',
    },
  };

  const SelecetStyleAr = {
    backgroundColor: "#1b0968",
    color: "#FFFFFF",
    fontSize: "18px",
    fontWeight: "bold",
    fontFamily: 'Tajawal',
  };

  return (
    <>
      <section id={styles.before_after} dir={router.locale === 'ar' ? 'rtl' : 'ltr'}>
        <Container sx={{ maxWidth: "1239px" }} maxWidth={false}>
          <div className={styles.sec_contianer}>
            <div className={styles.filter_sec}>
              <FormControl fullWidth>
                <Select
                  displayEmpty
                  value={treatmentSlug || ''}
                  inputProps={{ 'aria-label': 'Without label' }}
                  IconComponent={ExpandMoreOutlinedIcon}
                  onChange={handleFilterChanges}
                  MenuProps={{
                    anchorOrigin: { horizontal: 'right', vertical: 'bottom' },
                    transformOrigin: { horizontal: 'right', vertical: 'top' },
                  }}
                  style={router.locale === 'ar' ? SelecetStyleAr : SelecetStyleEn}
                  sx={{
                    '.MuiSelect-icon': {
                      color: '#FFFFFF !important',
                      width: '25px',
                      height: '25px',
                    },
                    '.MuiSelect-iconOpen': {
                      color: 'rgb(0, 71, 71) !important',
                    },
                    '.MuiSelect-select': {
                      padding: '11px 18px 0px 18px !important',
                      height: '40px!important',
                    },
                  }}
                >
                  {dataDoctorTreatments.length > 0 && dataDoctorTreatments.map((treatment, idx) => (
                    <MenuItem
                      dir={router.locale === 'ar' ? 'rtl' : 'ltr'}
                      key={idx}
                      value={treatment.treatmentSlug}
                      sx={{
                        fontFamily: router.locale === 'ar' ? 'var(--arabic-font)' : 'var(--quickstand-font)'
                      }}
                    >
                      {treatment.treatmentName}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </div>

            <div className={styles.title}>
              <Typography variant='h3'>
                {t('proceduresSymptoms_single:before_after2')}
              </Typography>
            </div>
          </div>
        </Container>

        <Container>
          <div className={styles.slider_container}>
            <Swiper
              modules={[Navigation, Pagination]}
              breakpoints={breakPoints}
              rtl={router.locale === 'ar'}
            >
              {treatmentImages?.map((card, index) => (
                <SwiperSlide key={index}>
                  <div className={styles.box}>
                    <div className={styles.imgs_container} dir='ltr'>
                      <Image width={388} height={200} src={card.imgBefore} alt="" />
                      <Image width={388} height={200} src={card.imgAfter} alt="" />
                    </div>
                    <div className={styles.box_title}>
                      <Typography variant='h5'>{t('proceduresSymptoms_single:before')}</Typography>
                      <Typography variant='h5'>{t('proceduresSymptoms_single:after')}</Typography>
                    </div>
                    <div className={styles.desc}>
                      <Typography>{card.description}</Typography>
                    </div>
                  </div>
                </SwiperSlide>
              ))}

              {/* Custom Arrows */}
              {/* <div className="swiper-button-prev">
                <HiChevronLeft />
              </div>
              <div className="swiper-button-next">
                <HiChevronRight />
              </div> */}
            </Swiper>
          </div>
        </Container>
      </section>
    </>
  );
};

export default BeforeAfter;
