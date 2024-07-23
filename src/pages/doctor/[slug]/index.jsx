import React, { useEffect, useState } from 'react';
import PageHeaderSec from '../../../../components/PageHeaderSec';
import BeforeAfter from '../../../../components/BeforeAfter';
import MostPopular from '../../../../components/MostPopular';

import { Accordion, AccordionDetails, AccordionSummary, Box, Container, List, ListItem, Typography, } from '@mui/material'
import { FaChevronLeft, FaChevronRight, FaShieldAlt } from 'react-icons/fa'
import styles from './index.module.scss'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { useTranslation } from "react-i18next";
import Link from 'next/link'
import { MdLocationOn } from 'react-icons/md'
import Carousel from 'react-elastic-carousel';
import { consts } from 'react-elastic-carousel';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import CloseIcon from '@mui/icons-material/Close';
import Footer from '../../../../components/Footer';

const index = ({
  dataDoctorSlug, dataDoctorMainSpecializations, dataDoctorTreatments, dataDoctorCertificatest, dataDoctorLanguagesBySlug, dataDoctorMedias, dataDoctorCareer, dataDoctorEducation, dataDoctorMemberShip, dataDoctorProcedure, dataDoctorHospitalClinics, dataDoctorPackage, dataSubSpecializations
}) => {
  const router = useRouter()
  const { t } = useTranslation();
  const [expanded, setExpanded] = useState(false);
  const [similarDocs, setSimilarDocs] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [cilincs, setCilincs] = useState([])
  const [hospitals, setHospitals] = useState([])

  useEffect(() => {
    const cilincsFilter = dataDoctorHospitalClinics?.filter((cilinc) => cilinc.isClinic === true)
    setCilincs(cilincsFilter)
    const hospitalsFilter = dataDoctorHospitalClinics?.filter((cilinc) => cilinc.isClinic === false)
    setHospitals(hospitalsFilter)
  }, [])

  const handleImageClick = (imageSrc) => {
    setSelectedImage(imageSrc);
  };


  const handleCloseImage = () => {
    setSelectedImage(null);
  };

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  function createMarkup() {
    return { __html: decodeURI(dataDoctorSlug.about) };
  }

  const [breakPoints] = useState([
    { width: 1, itemsToShow: 1, showPagination: false },
  ])

  const [hospitalBreakPoints] = useState([
    { width: 1, pagination: true, showArrows: false },
    { width: 300, pagination: true, showArrows: false, itemsToShow: 1.1, itemsToScroll: 1 },
    { width: 400, pagination: true, itemsToShow: 2.5, itemsToScroll: 1, showArrows: false },
    { width: 800, pagination: true, itemsToShow: 2.5, itemsToScroll: 1, transitionMs: 1000, showArrows: false },
    { width: 900, pagination: false, itemsToShow: 2.5, itemsToScroll: 1, transitionMs: 1000 },

  ])

  function myArrow({ type, onClick, isEdge }) {
    const pointer = type === consts.PREV ?
      <div className='left_arrow'>
        <FaChevronLeft />
      </div>

      :
      <div className='right_arrow'>
        <FaChevronRight />
      </div>
      ;

    return (
      <button className='main_btn' onClick={onClick} disabled={isEdge}>
        {pointer}
      </button>
    );
  }

  return (
    <>

      <PageHeaderSec dataDoctorSlug={dataDoctorSlug} dataDoctorMainSpecializations={dataDoctorMainSpecializations} dataDoctorTreatments={dataDoctorTreatments} />

      <Box
        sx={{
          display: {
            xs: "block",
            sm: "block",
            lg: "none"
          }
        }}
        id={styles.hospital_header} dir={`${router.locale === 'ar' ? 'rtl' : 'ltr'}`}>
        <div className={styles.img_container}>
          <Image
            width={300}
            height={218}
            src={dataDoctorSlug.image} alt={dataDoctorSlug.firstName} />
        </div>

        <Container sx={{ maxWidth: "1239px" }} maxWidth={false}>

          {dataDoctorSlug.isVerifid &&

            <div className={styles.header}>
              <div className={styles.icon_container}>
                <FaShieldAlt />
              </div>
              <div className={styles.text}>
                <Typography>
                  {t("most_popular:verified")}
                </Typography>
              </div>
            </div>
          }



          <div className={styles.title}>
            <Typography variant="h3">
              {`${dataDoctorSlug.doctorLevel === null ? '' : dataDoctorSlug.doctorLevel} ${dataDoctorSlug.firstName} ${dataDoctorSlug.fatherName} ${dataDoctorSlug.lastName} `}




            </Typography>
          </div>

          <div className={styles.text_container}>

            <div className={styles.name}>
              <Typography >
                {dataDoctorMainSpecializations[0]?.name}
              </Typography>
            </div>

            {/* <div className={styles.rating}>
              <Rating defaultValue={dataDoctorSlug?.rating} size="small" readOnly />
              <span className={styles.reviews_num}>{dataDoctorSlug?.totalReviews} {t("hospital:Reviews")}</span>
            </div> */}


            <div className={styles.location}>
              <MdLocationOn />
              <Typography >
                {dataDoctorSlug?.location}
              </Typography>
            </div>

            <div className={styles.boxes_container}>
              <div className={styles.box}>
                <div className={styles.num}>
                  <Typography>{dataDoctorSlug.lastYearPatients}</Typography>
                </div>
                <div className={styles.yearly}>
                  <Typography>{t("most_popular:PatientsTreatedLastYear")}</Typography>
                </div>
              </div>
              <div className={styles.box}>
                <div className={styles.num}>
                  <Typography>{dataDoctorSlug.experienceYears}</Typography>
                </div>
                <div className={styles.yearly}>
                  <Typography>{t("most_popular:yearsOfExp")}</Typography>
                </div>
              </div>
              <div className={styles.box}>
                <div className={styles.num}>
                  <Typography>{dataDoctorTreatments?.length}</Typography>
                </div>
                <div className={styles.yearly}>
                  <Typography>{t("most_popular:treatmentsCount")}</Typography>
                </div>
              </div>

            </div>

            {dataDoctorSlug?.isOnline === true &&
              <div className={styles.button_container}>
                <Link href={'/quote'}>
                  <button>{t("hospital:Book")}</button>
                </Link>
              </div>
            }

          </div>

        </Container>
      </Box>
      <Container sx={{ maxWidth: "1239px" }} maxWidth={false}>
        <section id='overview' className={styles.overview}>
          <div className={styles.text_inner}>
            <div
              id={"apply"}
              className="ck-content"
              dangerouslySetInnerHTML={createMarkup()}
              dir={`${router.locale === 'ar' ? 'rtl' : 'ltr'}`}
            />
          </div>

          <div className={styles.info}>
            <div className={styles.boxes_container}>
              <div className={styles.certificates_boxes}>
                <div className={styles.title}>
                  <Typography variant={'h3'}>

                    {t("hospital:certificates")}
                  </Typography>
                </div>


                <div className={styles.slider_container}>
                  <Carousel
                    breakPoints={breakPoints}
                    itemsToScroll={1}
                    renderArrow={myArrow}
                    pagination={false}
                  >
                    {console.log(dataDoctorCertificatest, "dataDoctorCertificatest")}
                    {dataDoctorCertificatest?.map((card, index) => (
                      <>
                        <div className={styles.box} key={index} onClick={() => handleClickOpen(card)}>
                          <div className={styles.title}>
                            <Typography variant="h6">{card.name} - {card.certificateDate}</Typography>
                          </div>
                          <div className={styles.boxes_container}>
                            <div className={styles.box_header}>
                              <div className={styles.img_container}>
                                <Image width={66.87} height={99.78} src={card?.image} alt="" />
                              </div>

                            </div>

                            <div className={styles.desc}>
                              <Typography>
                                {card.description}
                              </Typography>

                              <button>{t("hospital:ReadAll")}</button>
                            </div>
                          </div>

                        </div>




                        {selectedCard != null &&
                          <BootstrapDialog
                            onClose={handleClose}
                            aria-labelledby="customized-dialog-title"
                            open={open}
                          >
                            <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose}>
                              {selectedCard.name}
                            </BootstrapDialogTitle>
                            <DialogContent dividers sx={{ display: 'flex', flexDirection: 'column', minWidth: { sm: '100%', md: '600px', lg: '600px' } }}>
                              <Box sx={{
                                height: '200px', margin: 'auto',
                                marginTop: '10px',
                                marginBottom: '20px',

                                '& img': {
                                  objectFit: 'contain', width: '100%', height: '100%',
                                }
                              }}>
                                <Image width={66.87} height={99.78} src={selectedCard.image} alt={selectedCard.name} />
                              </Box>

                              <Typography gutterBottom>
                                {selectedCard.description}
                              </Typography>

                            </DialogContent>
                          </BootstrapDialog >
                        }
                      </>
                    ))}

                  </Carousel>
                </div>

              </div>
              <div className={styles.desc_boxes}>

                <div className={styles.box}>
                  <div className={styles.title}>
                    <Typography variant={'h3'}>
                      {t("hospital:languages")}
                    </Typography>
                  </div>

                  <ul>
                    {dataDoctorLanguagesBySlug?.map((lang, idx) =>
                      <li key={idx}>{lang?.languageName}</li>
                    )}
                  </ul>
                </div>
                <div className={styles.box}>
                  <div className={styles.title}>
                    <Typography variant={'h3'}>

                      {t("hospital:specialties")}

                    </Typography>
                  </div>
                  <ul>
                    {dataSubSpecializations?.map((special, idx) =>
                      <li key={idx}>{special?.name}</li>
                    )}
                  </ul>
                </div>



              </div>
            </div>

            <div className={styles.links}>
              <Accordion disableGutters elevation={0}
                square={false} sx={{
                  '&:before': {
                    display: 'none',
                  }
                }}
                expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
                <AccordionSummary
                  sx={expanded !== 'panel1' ? { '&:hover': { backgroundColor: '#C5DFDC' }, transition: 'all 0.3s ease', height: '55px', borderRadius: '5px', backgroundColor: '#E7EDEC', color: '#000000' }
                    : { backgroundColor: '#004747', color: '#FFFFFF', height: '55px', minHeight: '55px !important', borderRadius: '5px' }
                  }
                  expandIcon={<ExpandMoreIcon sx={expanded !== 'panel1' ? { color: ' #000000', width: '30px', height: "30px" } : { color: '#FFFFFF', width: '30px', height: "30px", marginBottom: '5px', }} />}
                  aria-controls="panel1d-content" id="panel1d-header">
                  <Typography sx={{ fontSize: { xs: '16px', sm: '16px', md: '16px', lg: '18px' }, fontWeight: 'bold', fontFamily: router.locale === 'ar' ? 'var(--arabic-font)' : 'var(--quickstand-font)' }}>
                    {t("hospital:procedures")}
                  </Typography>
                </AccordionSummary>

                <AccordionDetails sx={{ background: '#F4F9F8', overflowX: 'auto', maxHeight: '50vh', }}>

                  <List sx={{
                    listStyleType: 'disc',
                    padding: '0px',
                    '& .MuiListItem-root': {

                      listStylePosition: 'inside',
                      padding: '0px',
                    },
                  }}
                  >


                    {dataDoctorProcedure?.map((procedure) => (
                      <>
                        <Typography variant="h5">{procedure.title}</Typography>
                        <ListItem variant='li' sx={{ fontSize: { xs: '16px', sm: '16px', md: '16px', lg: '18px' }, fontWeight: 'var(--font-medium)', fontFamily: 'var(--quickstand-font)' }}>
                          {procedure.name}
                        </ListItem  >
                      </>
                    ))}



                  </List>
                </AccordionDetails>

              </Accordion>
              <Accordion disableGutters elevation={0}
                square={false} sx={{
                  marginTop: '8px',
                  '&:before': {
                    display: 'none',
                  }
                }}
                expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
                <AccordionSummary
                  sx={expanded !== 'panel2' ? { '&:hover': { backgroundColor: '#C5DFDC' }, transition: 'all 0.3s ease', height: '55px', borderRadius: '5px', backgroundColor: '#E7EDEC', color: '#000000' }
                    : { backgroundColor: '#004747', color: '#FFFFFF', height: '55px', borderRadius: '5px' }
                  }
                  expandIcon={<ExpandMoreIcon sx={expanded !== 'panel2' ? { color: ' #000000', width: '30px', height: "30px" } : { color: '#FFFFFF', width: '30px', height: "30px", marginBottom: '5px', }} />}
                  aria-controls="panel2d-content" id="panel2d-header">
                  <Typography sx={{ fontSize: { xs: '16px', sm: '16px', md: '16px', lg: '18px' }, fontWeight: 'bold', fontFamily: router.locale === 'ar' ? 'var(--arabic-font)' : 'var(--quickstand-font)' }}>
                    {t("hospital:memberships")}

                  </Typography>
                </AccordionSummary>

                <AccordionDetails sx={{ background: '#F4F9F8', overflowX: 'auto', maxHeight: '50vh', }}>

                  <List sx={{
                    listStyleType: 'disc',
                    padding: '0px',
                    '& .MuiListItem-root': {

                      listStylePosition: 'inside',
                      padding: '0px',
                    },
                  }}
                  >

                    {dataDoctorMemberShip?.map((memberShip) => (
                      <>
                        <ListItem variant='li' sx={{
                          fontSize: { xs: '16px', sm: '16px', md: '16px', lg: '18px' }, fontWeight: 'var(--font-medium)', fontFamily: router.locale === 'ar' ? 'var(--arabic-font)' : 'var(--quickstand-font)'
                        }}>
                          {memberShip.startdate !== null && memberShip.startdate !== null &&
                            <Typography variant="h5" sx={{
                              fontFamily: router.locale === 'ar' ? 'var(--arabic-font)' : 'var(--quickstand-font)'
                            }}>{memberShip.memberShipName} ({memberShip.startdate} - {memberShip.endDate})</Typography>
                          }
                        </ListItem  >
                      </>
                    ))}



                  </List>
                </AccordionDetails>

              </Accordion>
              <Accordion disableGutters elevation={0}
                square={false} sx={{
                  marginTop: '8px',
                  '&:before': {
                    display: 'none',
                  }
                }}
                expanded={expanded === 'panel3'} onChange={handleChange('panel3')}>
                <AccordionSummary
                  sx={expanded !== 'panel3' ? { '&:hover': { backgroundColor: '#C5DFDC' }, transition: 'all 0.3s ease', height: '55px', borderRadius: '5px', backgroundColor: '#E7EDEC', color: '#000000' }
                    : { backgroundColor: '#004747', color: '#FFFFFF', height: '55px', borderRadius: '5px' }
                  }
                  expandIcon={<ExpandMoreIcon sx={expanded !== 'panel3' ? { color: ' #000000', width: '30px', height: "30px" } : { color: '#FFFFFF', width: '30px', height: "30px", marginBottom: '5px', }} />}
                  aria-controls="panel3d-content" id="panel3d-header">
                  <Typography sx={{ fontSize: { xs: '16px', sm: '16px', md: '16px', lg: '18px' }, fontWeight: 'bold', fontFamily: router.locale === 'ar' ? 'var(--arabic-font)' : 'var(--quickstand-font)' }}>

                    {t("hospital:education")}

                  </Typography>
                </AccordionSummary>

                <AccordionDetails sx={{ background: '#F4F9F8', overflowX: 'auto', maxHeight: '50vh', }}>

                  <List sx={{
                    listStyleType: 'disc',
                    padding: '0px',
                    '& .MuiListItem-root': {

                      listStylePosition: 'inside',
                      padding: '0px',
                    },

                  }}
                  >

                    {dataDoctorEducation?.map((education) => (
                      <>
                        <Typography variant="h5" sx={{
                          fontFamily: router.locale === 'ar' ? 'var(--arabic-font)' : 'var(--quickstand-font)'

                        }}>{education.title} ({education.yearFrom} - {education.yearTo})</Typography>
                        <ListItem variant='li' sx={{
                          fontSize: { xs: '16px', sm: '16px', md: '16px', lg: '18px' }, fontWeight: 'var(--font-medium)',
                          fontFamily: router.locale === 'ar' ? 'var(--arabic-font)' : 'var(--quickstand-font)'

                        }}>
                          {education.description}
                        </ListItem  >
                      </>
                    ))}


                  </List>
                </AccordionDetails>

              </Accordion>
              <Accordion disableGutters elevation={0}
                square={false} sx={{
                  marginTop: '8px',
                  '&:before': {
                    display: 'none',
                  }
                }}
                expanded={expanded === 'panel5'} onChange={handleChange('panel5')}>
                <AccordionSummary
                  sx={expanded !== 'panel5' ? { '&:hover': { backgroundColor: '#C5DFDC' }, transition: 'all 0.3s ease', height: '55px', borderRadius: '5px', backgroundColor: '#E7EDEC', color: '#000000' }
                    : { backgroundColor: '#004747', color: '#FFFFFF', height: '55px', borderRadius: '5px' }
                  }
                  expandIcon={<ExpandMoreIcon sx={expanded !== 'panel5' ? { color: ' #000000', width: '30px', height: "30px" } : { color: '#FFFFFF', width: '30px', height: "30px", marginBottom: '5px', }} />}
                  aria-controls="panel5d-content" id="panel5d-header">
                  <Typography sx={{
                    fontSize: { xs: '16px', sm: '16px', md: '16px', lg: '18px' }, fontWeight: 'bold', fontFamily:
                      router.locale === 'ar' ? 'var(--arabic-font)' : 'var(--quickstand-font)'
                  }}>
                    {t("hospital:career")}
                  </Typography>
                </AccordionSummary>

                <AccordionDetails sx={{ background: '#F4F9F8', overflowX: 'auto', maxHeight: '50vh', }}>

                  <List sx={{
                    listStyleType: 'disc',
                    padding: '0px',
                    '& .MuiListItem-root': {

                      listStylePosition: 'inside',
                      padding: '0px',
                    },
                  }}
                  >

                    {dataDoctorCareer?.map((career) => (
                      <>
                        <Typography variant="h5" sx={{
                          fontFamily: router.locale === 'ar' ? 'var(--arabic-font)' : 'var(--quickstand-font)'

                        }}>{career.title} ({career.yearFrom} - {career.yearTo})</Typography>
                        <ListItem variant='li' sx={{
                          fontSize: { xs: '16px', sm: '16px', md: '16px', lg: '18px' }, fontWeight: 'var(--font-medium)', fontFamily: 'var(--quickstand-font)',
                          fontFamily: router.locale === 'ar' ? 'var(--arabic-font)' : 'var(--quickstand-font)'
                        }}>
                          {career.description}
                        </ListItem  >
                      </>
                    ))}



                  </List>
                </AccordionDetails>

              </Accordion>
            </div>

          </div>

        </section>
      </Container >


      <section id='reviews' className={styles.reviews} dir={router.locale === 'ar' ? 'rtl' : 'ltr'}>
        <Container className={`${router.locale === 'ar' ? 'mycontainer_ar' : 'mycontainer'}`} sx={{ maxWidth: '1239px', paddingLeft: { sm: "0px", md: "0px" }, }} maxWidth={false} >
          <div className={styles.title_mob}>
            <Typography variant={'h4'}>
              {t('hospital:media')}
            </Typography>
          </div>

          <div className={styles.boxes_container}>
            <div className={styles.text_container}>
              <div className={styles.title}>
                <Typography variant={'h4'}>
                  {t('hospital:media')}
                </Typography>
              </div>

              <div className={styles.desc}>
                <Typography sx={{
                  color: "var(--main-dark-color)",
                  fontSize: '18px',
                  fontWeight: "var(--font-sem-bold)",
                  fontFamily: router.locale === 'ar' ? 'var(--arabic-font)' : 'var(--quickstand-font)',
                  letterSpacing: '0',
                  marginRight: '20px'
                }}>
                  {t("hospital:mediaDesc")}
                </Typography>
              </div>
            </div>
            <div className={styles.slider_container}>
              <Carousel
                breakPoints={hospitalBreakPoints}
                itemsToScroll={1}
                renderArrow={myArrow}
                isRTL={router.locale === 'ar' ? true : false}
              >



                {dataDoctorMedias?.map((clinic, index) => (
                  <div onClick={() => handleImageClick(clinic.img)} className={styles.box} key={index}>
                    <div className={styles.img_container}>
                      <img src={clinic.path} alt={clinic.title} />
                    </div>
                  </div>
                ))}
              </Carousel>

              {selectedImage && (
                <div className={styles.fullscreen_container} onClick={handleCloseImage}>
                  <img src={selectedImage} className={styles.fullscreen_img} />
                  <CloseIcon />
                </div>
              )}


            </div>
          </div>
        </Container>
      </section>

      <BeforeAfter dataDoctorTreatments={dataDoctorTreatments} />


      <Box >
        <MostPopular doctorClinics={cilincs} />
      </Box>

      <Box >
        <MostPopular doctorHospitals={hospitals} />
      </Box>


      <Footer />


    </>
  )
}

export default index


export async function getStaticPaths() {
  const resDoctorsSlugs = await fetch("https://api2.safemedigo.com/api/v1/Doctor/ListAllDoctorSlugs");
  const dataDoctorsSlugs = await resDoctorsSlugs.json();

  const paths = dataDoctorsSlugs.map((slug) => {
    return {
      params: { slug: slug }
    };
  });

  const validPaths = paths.map((path) => {
    return {
      ...path,
    };
  });

  return {
    paths: validPaths,
    fallback: "blocking",
  };
}

export async function getStaticProps({ locale, params }) {
  const resDoctorSlug = await fetch("https://api2.safemedigo.com/api/v1/Doctor/GetDoctorBySlug", {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      "doctorSlug": params.slug,
      "lang": locale
    })
  })
  const dataDoctorSlug = await resDoctorSlug.json()


  const resDoctorMainSpecializations = await fetch("https://api2.safemedigo.com/api/v1/Doctor/GetDoctorMainSpecializationsBySlug  ", {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      "doctorSlug": params.slug,
      "lang": locale
    })
  })
  const dataDoctorMainSpecializations = await resDoctorMainSpecializations.json()
  const resSubSpecializations = await fetch("https://api2.safemedigo.com/api/v1/Doctor/GetDoctorSubSpecializationsBySlug  ", {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      "doctorSlug": params.slug,
      "lang": locale
    })
  })
  const dataSubSpecializations = await resSubSpecializations.json()

  const resDoctorTreatments = await fetch("https://api2.safemedigo.com/api/v1/Doctor/GetDoctorTreatmentsBySlug  ", {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      "doctorSlug": params.slug,
      "lang": locale
    })
  })
  const dataDoctorTreatments = await resDoctorTreatments.json()


  const resDoctorCertificatest = await fetch("https://api2.safemedigo.com/api/v1/Doctor/GetDoctorCertificatestBySlug  ", {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      "doctorSlug": params.slug,
      "lang": locale
    })
  })
  const dataDoctorCertificatest = await resDoctorCertificatest.json()


  const resDoctorLanguagesBySlug = await fetch("https://api2.safemedigo.com/api/v1/Doctor/GetDoctorLanguagesBySlug  ", {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      "doctorSlug": params.slug,
      "lang": locale
    })
  })
  const dataDoctorLanguagesBySlug = await resDoctorLanguagesBySlug.json()


  const resDoctorMedias = await fetch("https://api2.safemedigo.com/api/v1/Doctor/GetDoctorMediasBySlug  ", {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      "doctorSlug": params.slug,
      "lang": locale
    })
  })
  const dataDoctorMedias = await resDoctorMedias.json()


  const resDoctorCareer = await fetch("https://api2.safemedigo.com/api/v1/Doctor/GetDoctorCareerBySlug  ", {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      "doctorSlug": params.slug,
      "lang": locale
    })
  })
  const dataDoctorCareer = await resDoctorCareer.json()



  const resDoctorEducation = await fetch("https://api2.safemedigo.com/api/v1/Doctor/GetDoctorEducationBySlug  ", {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      "doctorSlug": params.slug,
      "lang": locale
    })
  })
  const dataDoctorEducation = await resDoctorEducation.json()



  const resDoctorMemberShip = await fetch("https://api2.safemedigo.com/api/v1/Doctor/GetDoctorMemberShipBySlug  ", {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      "doctorSlug": params.slug,
      "lang": locale
    })
  })
  const dataDoctorMemberShip = await resDoctorMemberShip.json()




  const resDoctorProcedure = await fetch("https://api2.safemedigo.com/api/v1/Doctor/GetDoctorProcedureBySlug  ", {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      "doctorSlug": params.slug,
      "lang": locale
    })
  })
  const dataDoctorProcedure = await resDoctorProcedure.json()




  const resDoctorHospitalClinics = await fetch("https://api2.safemedigo.com/api/v1/Doctor/GetDoctorHospitalClinicsBySlug  ", {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      "doctorSlug": params.slug,
      "lang": locale
    })
  })
  const dataDoctorHospitalClinics = await resDoctorHospitalClinics.json()



  const resDoctorPackage = await fetch("https://api2.safemedigo.com/api/v1/Doctor/GetDoctorPackageBySlug  ", {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      "doctorSlug": params.slug,
      "lang": locale
    })
  })
  const dataDoctorPackage = await resDoctorPackage.json()



  return {
    props: {
      dataDoctorSlug, dataDoctorMainSpecializations, dataDoctorTreatments, dataDoctorCertificatest, dataDoctorLanguagesBySlug, dataDoctorMedias, dataDoctorCareer, dataDoctorEducation, dataDoctorMemberShip, dataDoctorProcedure, dataDoctorHospitalClinics, dataDoctorPackage, dataSubSpecializations,

    },
  };
}
