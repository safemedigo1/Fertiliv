import React from "react";
import styles from "./index.module.scss";
import imgs from "../../../public/assets/constants/imgs";
import { Container, Typography, Box, Rating } from "@mui/material";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";
import Image from 'next/image';
import { MdLocationOn } from 'react-icons/md'
import { FaShieldAlt } from 'react-icons/fa'
import Link from "next/link";


const PageHeader = ({ blog, treatment, dataHospitalSlug, dataDoctorSlug, dataDoctorMainSpecializations, dataDoctorTreatments }) => {
  const router = useRouter();

  const { pathname } = router;
  const { design, designMobile, post1, userimg } = imgs;
  const { t } = useTranslation();

  return (
    <>
      {pathname !== '/' &&
        <>
          {
            pathname === ('/hospitals/[slug]') &&
            <Box sx={{
              display: {
                xs: "none",
                sm: "none",
                lg: "block"
              }

            }} id={styles.hospital} dir={`${router.locale === 'ar' ? 'rtl' : 'ltr'}`}>
              <Container className={styles.sec_container}
                sx={{ maxWidth: "1239px" }}
                maxWidth={false}>
                <div className={styles.boxes_container}>
                  <div className={styles.hospital_box}>
                    <div className={styles.main_img}>
                      <Image width={400} height={260} src={dataHospitalSlug.logo} alt={dataHospitalSlug.name} />
                    </div>

                    <div className={styles.text_container}>

                      {dataHospitalSlug.isVerified &&

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

                      <div className={styles.name}>
                        <Typography variant="h3">
                          {dataHospitalSlug.name}
                        </Typography>
                      </div>
                      <div className={styles.location}>
                        <MdLocationOn />
                        <Typography >
                          {dataHospitalSlug.address}
                        </Typography>
                      </div>
                      {/* <div className={styles.rating}>
                        <Rating name="read-only" defaultValue={dataHospitalSlug.totalReviews} size="small" readOnly />
                        <span className={styles.reviews_num}>{dataHospitalSlug.totalReviews} {t("hospital:Reviews")}
                        </span>
                      </div> */}

                      <div className={styles.category}>
                        <Typography>
                          {dataHospitalSlug.hospitalKindName}
                        </Typography>
                      </div>

                    </div>
                  </div>



                  <div className={styles.info}>
                    <div className={styles.header}>

                      <Typography variant="h4">
                        {dataHospitalSlug.isActive === true ? t("hospital:online_appointment_available") : t("hospital:offline_appointment_available")}
                      </Typography>
                    </div>
                    <div className={styles.boxes_container}>
                      <div className={styles.box}>
                        <div className={styles.num}>
                          <Typography>{dataHospitalSlug?.yearlyPatient}</Typography>
                        </div>
                        <div className={styles.yearly}>
                          <Typography>{t("hospital:patient")}</Typography>
                        </div>
                      </div>
                      <div className={styles.box}>
                        <div className={styles.num}>
                          <Typography>{dataHospitalSlug.foundedYear}</Typography>
                        </div>
                        <div className={styles.yearly}>
                          <Typography>{t("hospital:year")}</Typography>
                        </div>
                      </div>
                      <div className={styles.box}>
                        <div className={styles.num}>
                          <Typography>{dataHospitalSlug.employeesCount}</Typography>
                        </div>
                        <div className={styles.yearly}>
                          <Typography>{t("hospital:Doctors_and_employees")}</Typography>
                        </div>
                      </div>

                    </div>

                    <div className={styles.button_container}>
                      <Link href={'/quote'}>
                        <button>{t("hospital:Book")}</button>
                      </Link>
                    </div>
                  </div>
                </div>
              </Container>
            </Box>
          }
          {

            <Box sx={{
              display: {
                xs: "none",
                sm: "none",
                lg: "block"
              }

            }} id={styles.hospital} dir={`${router.locale === 'ar' ? 'rtl' : 'ltr'}`}>
              <Container className={styles.sec_container}
                sx={{ maxWidth: "1239px" }}
                maxWidth={false}>
                <div className={styles.boxes_container}>
                  <div className={styles.hospital_box}>
                    <div className={styles.main_img}>
                      <Image width={400} height={240} src={dataDoctorSlug?.image} alt={""} />
                    </div>

                    <div className={styles.text_container}>
                      <div className={styles.header}>
                        {dataDoctorSlug.isVerifid &&
                          <>
                            <div className={styles.icon_container}>
                              <FaShieldAlt />
                            </div>
                            <div className={styles.text}>
                              <Typography>
                                {t("most_popular:verified")}
                              </Typography>
                            </div>
                          </>
                        }
                      </div>

                      <div className={styles.name}>
                        <Typography variant="h3">
                          {`${dataDoctorSlug.firstName} ${dataDoctorSlug.fatherName} ${dataDoctorSlug.lastName}`}

                        </Typography>
                      </div>
                      <div className={styles.location}>
                        <MdLocationOn />
                        <Typography >
                          {dataDoctorSlug?.location}
                        </Typography>
                      </div>
                      {/* <div className={styles.rating}>
                        <Rating name="read-only" defaultValue={dataDoctorSlug?.rating} size="small" readOnly />
                        <span className={styles.reviews_num}>{dataDoctorSlug?.totalReviews} Reviews</span>
                      </div> */}

                      <div className={styles.category}>
                        <Typography>
                          {dataDoctorMainSpecializations[0]?.name}
                        </Typography>
                      </div>

                    </div>
                  </div>

                  <div className={styles.info}>
                    <div className={styles.header}>
                      {dataDoctorSlug.isOnline === true ? t("hospital:online_appointment_available") : t("hospital:offline_appointment_available")}
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
                </div>
              </Container>
            </Box>
          }



        </>


      }



    </>

  );
};

export default PageHeader;
