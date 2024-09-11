import { Container, Typography, Dialog, DialogContent, Accordion, AccordionDetails, AccordionSummary, Box, List, ListItem, DialogTitle } from '@mui/material';
import Link from 'next/link';
import styles from '../../../src/styles/hospital.module.scss'
import { useEffect, useState } from "react";
import Image from "next/image";
import { styled } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useRouter } from "next/router";
import axios from "axios";
import { useTranslation } from "react-i18next";
import PageHeader from "../../PageHeader";

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { HiChevronLeft, HiChevronRight } from 'react-icons/hi';


const DoctorComponent = ({ dataDoctorSlug, dataDoctorMainSpecializations, dataDoctorTreatments, dataDoctorCertificatest, dataDoctorLanguagesBySlug, dataDoctorMedias, dataDoctorLeaflets, dataDoctorCareer, dataDoctorEducation, dataDoctorMemberShip, dataDoctorProcedure, dataDoctorHospitalClinics, dataDoctorPackage, dataSubSpecializations }) => {

  const [cilincs, setCilincs] = useState([])
  const [hospitals, setHospitals] = useState([])


  useEffect(() => {
    const cilincsFilter = dataDoctorHospitalClinics?.filter((cilinc) => cilinc.isClinic === true)
    setCilincs(cilincsFilter)
    const hospitalsFilter = dataDoctorHospitalClinics?.filter((cilinc) => cilinc.isClinic === false)
    setHospitals(hospitalsFilter)
  }, [])

  const { t } = useTranslation();
  const router = useRouter();
  const { locale } = useRouter();
  const [expanded, setExpanded] = useState(false);

  const [similarDocs, setSimilarDocs] = useState([]);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };


  const [open, setOpen] = useState(false);

  const [selectedCard, setSelectedCard] = useState(null)


  const handleClickOpen = (card) => {
    setOpen(true);
    setSelectedCard(card)
  };
  const handleClose = () => {
    setOpen(false);
  };

  const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
      padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
      padding: theme.spacing(1),
    },
  }));

  function BootstrapDialogTitle(props) {
    const { children, onClose, ...other } = props;

    return (
      <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
        {children}
        {onClose ? (
          <IconButton
            aria-label="close"
            onClick={onClose}
            sx={{
              position: 'absolute',
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>
        ) : null}
      </DialogTitle>
    );
  }

  const numbers = dataDoctorTreatments.map((item) => item.count);
  const total = numbers.reduce((a, b) => a + b, 0);



  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageClick = (imageSrc) => {
    setSelectedImage(imageSrc);
  };

  const handleCloseImage = () => {
    setSelectedImage(null);
  };

  function createMarkup() {
    return { __html: decodeURI(dataDoctorSlug.about) };
  }

  useEffect(() => {
    getSimilarDocs();
  }, [])

  const getSimilarDocs = async () => {
    const similarDocs = await axios.post("https://api2.safemedigo.com/api/v1/Doctor/ListSimilarDoctors", {
      "lang": router.locale,
      "mainSpecializationIds": [1]
    }, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    }).catch((error) => console.log(error))

    setSimilarDocs(similarDocs)
  }

  const AccordionStyles = {
    marginTop: '8px',
    '&:before': {
      display: 'none',
    }
  }

  const AccordionSummaryStyles1 = {
    '&:hover': { backgroundColor: '#ffeee1' }, transition: 'all 0.3s ease', height: '55px', borderRadius: '5px', backgroundColor: '#E7EDEC', color: '#000000'
  }
  const AccordionSummaryStyles2 = {
    backgroundColor: '#1b0968', color: '#FFFFFF', height: '55px', minHeight: '55px !important', borderRadius: '5px'
  }

  const ExpandMoreIconStyles1 = {
    color: ' #000000', width: '30px', height: "30px"
  }

  const ExpandMoreIconStyles2 = {
    color: '#FFFFFF', width: '30px', height: "30px", marginBottom: '5px',
  }
  const TypographyStyles = {
    fontSize: { xs: '16px', sm: '16px', md: '16px', lg: '18px' }, fontWeight: 'bold', fontFamily:
      router.locale === 'ar' ? 'var(--arabic-font)' : 'var(--quickstand-font)'
  }
  const AccordionDetailsStyles = {
    fontSize: { xs: '16px', sm: '16px', md: '16px', lg: '18px' }, fontWeight: 'bold', fontFamily:
      router.locale === 'ar' ? 'var(--arabic-font)' : 'var(--quickstand-font)'
  }

  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true)
  }, [])
  if (isClient)





    return (
      <>
        <PageHeader dataDoctorSlug={dataDoctorSlug} dataDoctorMainSpecializations={dataDoctorMainSpecializations} dataDoctorTreatments={dataDoctorTreatments} />

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
            <img src={dataDoctorSlug.image} alt={dataDoctorSlug.firstName} />
          </div>

          <Container sx={{ maxWidth: "1239px" }} maxWidth={false}>
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


              <div className={styles.boxes_container}>
                <div className={styles.box}>
                  <div className={styles.num}>
                    <Typography>+{dataDoctorSlug.lastYearPatients}</Typography>
                  </div>
                  <div className={styles.yearly}>
                    <Typography>{t("most_popular:PatientsTreatedLastYear")}</Typography>
                  </div>
                </div>
                <div className={styles.box}>
                  <div className={styles.num}>
                    <Typography>+{dataDoctorSlug.experienceYears}</Typography>
                  </div>

                  <div className={styles.yearly}>
                    <Typography>{t("most_popular:yearsOfExp")}</Typography>
                  </div>

                </div>

                <div className={styles.box}>
                  <div className={styles.num}>
                    <p>+{total}</p>
                  </div>
                  <div className={styles.yearly}>
                    <p>{t("most_popular:treatmentsCount")}</p>
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
          <section id='overview' className={styles.overview} dir={`${router.locale === 'ar' ? 'rtl' : 'ltr'}`}>
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
                <div className={styles.desc_boxes}>
                  {dataDoctorLanguagesBySlug.length !== 0 &&
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
                  }
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


                {dataDoctorEducation.length !== 0 &&
                  <Accordion disableGutters elevation={0}
                    square={false} sx={{
                      marginTop: '8px',
                      '&:before': {
                        display: 'none',
                      }
                    }}
                    expanded={expanded === 'panel3'} onChange={handleChange('panel3')}>
                    <AccordionSummary
                      sx={expanded !== 'panel3' ? AccordionSummaryStyles1
                        : AccordionSummaryStyles2
                      }
                      expandIcon={<ExpandMoreIcon sx={expanded !== 'panel3' ? ExpandMoreIconStyles1 : ExpandMoreIconStyles2} />}
                      aria-controls="panel3d-content" id="panel3d-header">
                      <Typography sx={TypographyStyles}>

                        {t("hospital:education")}

                      </Typography>
                    </AccordionSummary>

                    <AccordionDetails sx={AccordionDetailsStyles}>






                      <ul>
                        {dataDoctorEducation?.map((education, index) => (

                          <li key={index}>
                            <Typography variant="h5" sx={{
                              display: 'block', fontWeight: '500'
                            }}>{education.title} ({education.yearFrom} - {education.tillNow === true ? t('hospital:tillnow') : education.yearTo})</Typography>

                            <p>
                              {education.description}
                            </p>
                          </li>
                        ))}
                      </ul>


                    </AccordionDetails>

                  </Accordion>
                }

                {dataDoctorCareer.length !== 0 &&
                  <Accordion disableGutters elevation={0}
                    square={false} sx={{
                      marginTop: '8px',
                      '&:before': {
                        display: 'none',
                      }
                    }}
                    expanded={expanded === 'panel5'} onChange={handleChange('panel5')}>
                    <AccordionSummary
                      sx={expanded !== 'panel5' ? AccordionSummaryStyles1
                        : AccordionSummaryStyles2
                      }
                      expandIcon={<ExpandMoreIcon sx={expanded !== 'panel5' ? ExpandMoreIconStyles1 : ExpandMoreIconStyles2} />}
                      aria-controls="panel5d-content" id="panel5d-header">
                      <Typography sx={
                        TypographyStyles
                      }>
                        {t("hospital:career")}
                      </Typography>
                    </AccordionSummary>

                    <AccordionDetails sx={AccordionDetailsStyles}>

                      <ul>
                        {dataDoctorCareer?.map((career, index) => (

                          <li key={index}>
                            <Typography variant="h5" sx={{
                              display: 'block', fontWeight: '500'
                            }}>{career.title} {career.institution} ({career.yearFrom} - {career.tillNow === true ? t('hospital:tillnow') : career.yearTo})</Typography>

                            <p> {career.description}</p>
                          </li>
                        ))}
                      </ul>


                    </AccordionDetails>

                  </Accordion>
                }

                {dataDoctorMemberShip.length !== 0 &&
                  <Accordion disableGutters elevation={0}
                    square={false} sx={AccordionStyles}
                    expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
                    <AccordionSummary
                      sx={
                        expanded !== 'panel2' ?
                          AccordionSummaryStyles1 : AccordionSummaryStyles2
                      }
                      expandIcon={<ExpandMoreIcon sx={expanded !== 'panel2' ? ExpandMoreIconStyles1 : ExpandMoreIconStyles2} />}

                      aria-controls="panel2d-content" id="panel2d-header">
                      <Typography sx={TypographyStyles}>
                        {t("hospital:memberships")}

                      </Typography>
                    </AccordionSummary>

                    <AccordionDetails sx={AccordionDetailsStyles}>
                      <ul>
                        {dataDoctorMemberShip?.map((memberShip, index) => (

                          <li key={index}>
                            <p>
                              {memberShip.memberShipName}
                            </p>

                            <Typography variant="h5" sx={{
                              display: 'block', fontWeight: '500'
                            }}>
                              {` `}

                              {memberShip.yearFrom !== null && memberShip.yearFrom !== null &&
                                <>
                                  {memberShip.yearFrom} - {memberShip.tillNow === true ? t('hospital:tillnow') : memberShip.yearTo}
                                </>
                              }
                            </Typography>


                          </li>
                        ))}
                      </ul>
                    </AccordionDetails>
                  </Accordion>
                }

                {dataDoctorLeaflets.length !== 0 &&
                  <Accordion disableGutters elevation={0}
                    square={false} sx={AccordionStyles}
                    expanded={expanded === 'panel22'} onChange={handleChange('panel22')}>
                    <AccordionSummary
                      sx={
                        expanded !== 'panel22' ?
                          AccordionSummaryStyles1 : AccordionSummaryStyles2
                      }
                      expandIcon={<ExpandMoreIcon sx={expanded !== 'panel22' ? ExpandMoreIconStyles1 : ExpandMoreIconStyles2} />}

                      aria-controls="panel2d-content" id="panel2d-header">
                      <Typography sx={TypographyStyles}>
                        {t("hospital:Publications")}

                      </Typography>
                    </AccordionSummary>

                    <AccordionDetails sx={AccordionDetailsStyles}>
                      <ul>
                        {dataDoctorLeaflets?.map((leaf, index) => (

                          <li key={index}>
                            <Typography variant="h5" sx={{
                              display: 'block', fontWeight: '500'
                            }}>{leaf.memberShipName}
                              {leaf.publishDate !== null &&
                                <>
                                  {leaf.publishDate}
                                </>
                              }</Typography>


                            {/* <p>
                              {leaf.leafletsDescription}
                            </p> */}

                            {leaf.leafletsDescription &&
                              leaf.leafletsDescription.split(' ').map((word, i) => {
                                if (word.startsWith('http://') || word.startsWith('https://')) {
                                  return (
                                    <a key={i} href={word} style={{ textDecoration: 'underline' }} target="_blank" rel="noopener noreferrer">
                                      {word}{' '}
                                    </a>
                                  );
                                } else {
                                  return word + ' ';
                                }
                              })}

                          </li>
                        ))}
                      </ul>
                    </AccordionDetails>
                  </Accordion>
                }


                {dataDoctorProcedure.length !== 0 &&
                  <Accordion disableGutters elevation={0}
                    square={false} sx={{
                      marginTop: '8px',
                      '&:before': {
                        display: 'none',
                      }
                    }}



                    expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
                    <AccordionSummary
                      sx={expanded !== 'panel1' ? AccordionSummaryStyles1
                        : AccordionSummaryStyles2
                      }
                      expandIcon={<ExpandMoreIcon sx={expanded !== 'panel1' ? ExpandMoreIconStyles1 : ExpandMoreIconStyles2} />}
                      aria-controls="panel1d-content" id="panel1d-header">
                      <Typography sx={TypographyStyles}>
                        {t("hospital:procedures")}
                      </Typography>
                    </AccordionSummary>

                    <AccordionDetails sx={AccordionDetailsStyles}>
                      <ul>
                        {dataDoctorProcedure?.map((procedure, index) => (

                          <li key={index}>
                            <Typography variant="h5" sx={{
                              display: 'block', fontWeight: '500'
                            }}> {procedure.title}</Typography>


                            <p>
                              {procedure.name}
                            </p>
                          </li>
                        ))}
                      </ul>
                    </AccordionDetails>

                  </Accordion>
                }






              </div>


              <div className={styles.certificates_boxes}>
                {dataDoctorCertificatest.length !== 0 &&
                  <>
                    <div className={styles.title}>
                      <Typography variant={'h3'}>
                        {t("hospital:certificates")}
                      </Typography>
                    </div>

                    <div className={styles.slider_container}>
                      <Swiper
                        modules={[Navigation, Pagination]}
                        slidesPerView={1.1}
                        navigation={{
                          prevEl: '.left_arrow',
                          nextEl: '.right_arrow',
                        }}
                        pagination={false}
                        className={styles.swiper}
                        dir={locale === 'ar' ? 'rtl' : 'ltr'}
                      >
                        {dataDoctorCertificatest?.map((card, index) => (
                          <SwiperSlide key={index}>
                            <div className={styles.box} onClick={() => handleClickOpen(card)}>
                              <div className={styles.title}>
                                <Typography variant="h6">{card.name} - {card.certificateDate}</Typography>
                              </div>
                              <div className={styles.boxes_container}>
                                <div className={styles.box_header}>
                                  <div className={styles.img_container}>
                                    <img src={card?.image} alt="" />
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

                            {selectedCard != null && (
                              <BootstrapDialog
                                onClose={handleClose}
                                aria-labelledby="customized-dialog-title"
                                open={open}
                              >
                                <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose}>
                                  {selectedCard.name}
                                </BootstrapDialogTitle>
                                <DialogContent
                                  dividers
                                  sx={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    minWidth: { sm: '100%', md: '600px', lg: '600px' }
                                  }}
                                >
                                  <Box
                                    sx={{
                                      height: '200px',
                                      margin: 'auto',
                                      marginTop: '10px',
                                      marginBottom: '20px',
                                      '& img': {
                                        objectFit: 'contain',
                                        width: '100%',
                                        height: '100%',
                                      }
                                    }}
                                  >
                                    <img src={selectedCard.image} alt={selectedCard.name} />
                                  </Box>
                                  <Typography gutterBottom>
                                    {selectedCard.description}
                                  </Typography>
                                </DialogContent>
                              </BootstrapDialog>
                            )}
                          </SwiperSlide>
                        ))}

                        {/* Custom Navigation Arrows */}
                        <div className="left_arrow">
                          <HiChevronLeft />
                        </div>
                        <div className="right_arrow">
                          <HiChevronRight />
                        </div>
                      </Swiper>
                    </div>
                  </>
                }
              </div>
            </div>

          </section>
        </Container >
      </>
    )
}

export default DoctorComponent



