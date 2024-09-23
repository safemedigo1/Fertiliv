// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

import React, { useState } from 'react';
import styles from './index.module.scss';
import Link from 'next/link';
import { useTranslation } from 'react-i18next';
import { useRouter } from 'next/router';
import { Box, Container, Typography } from '@mui/material';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import { IoMdClose } from 'react-icons/io';

import 'swiper/css';
import 'swiper/css/navigation';

import pstyles from './PatientReviews.module.scss';
import { HiChevronLeft, HiChevronRight } from 'react-icons/hi';

const PatientReviews = ({ dataReviews }) => {
  const { t } = useTranslation();
  const router = useRouter();
  const [expandedReview, setExpandedReview] = useState(null);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [imagesGallery, setImagesGallery] = useState([]);
  const [initialSlide, setInitialSlide] = useState(0);

  const handleMoreClick = (index) => {
    setExpandedReview(expandedReview === index ? null : index);
  };

  const breakpoints = {
    1: { slidesPerView: 1 },
    300: { slidesPerView: 1 },
    400: { slidesPerView: 1 },
    600: { slidesPerView: 2.1 },
    900: { slidesPerView: 2.5 },
    1000: { slidesPerView: 2.1 },
    1299: { slidesPerView: 1.9 },
  };

  if (router.pathname === '/reviews') {
    breakpoints[928] = { slidesPerView: 3.1, spaceBetween: 27 };
    breakpoints[1250] = { slidesPerView: 3.1, spaceBetween: 27 };
  } else {
    breakpoints[928] = { slidesPerView: 2.1, spaceBetween: 27 };
    breakpoints[1250] = { slidesPerView: 2.4, spaceBetween: 27 };
  }

  const openGallery = (reviewIndex, imgIndex) => {
    const selectedReview = dataReviews[reviewIndex];
    setImagesGallery(selectedReview.ratingMedias);
    setInitialSlide(imgIndex);
    setIsFullScreen(true);
  };

  return (
    <>
      <section
        id={'patient_stories'}
        className={styles.patient_stories}
        dir={router.locale === 'ar' ? 'rtl' : 'ltr'}
      >
        <div className={styles.slider_container} id='reviews_container'>
          <Swiper
            modules={[Navigation]}
            breakpoints={breakpoints}
            slidesPerView={expandedReview !== null ? 1 : undefined}
            navigation={{
              prevEl: '.left_arrow',
              nextEl: '.right_arrow',
            }}
            dir={router.locale === 'ar' ? 'rtl' : 'ltr'}
            className={styles.swiper}
            spaceBetween={8}
          >
            <div className={styles.shadow_box} />

            {dataReviews.map((review, reviewIndex) => (
              <SwiperSlide key={reviewIndex}>
                <div className={pstyles.box} dir={router.locale === 'ar' ? 'rtl' : 'ltr'}>
                  <div className={pstyles.usser_info}>
                    <div className={pstyles.userImage}>
                      {review.patientImage && review.patientImage !== '' ? (
                        <img src={`${review.patientImage}`} alt="" />
                      ) : (
                        <img src={`/assets/svgs/userimg.svg`} alt="" />
                      )}
                      {/* {review.patientIsVerified && (
                        <div className={pstyles.verefied}>
                          <img src={'/assets/svgs/verefied.svg'} alt="" />
                        </div>
                      )} */}
                    </div>

                    <div className={pstyles.user_details}>
                      <div className={pstyles.username}>
                        <p>{review.patientName}</p>
                      </div>
                      <div className={pstyles.dates}>
                        {review.patientCity && review.ratingDate
                          ? `${review.patientCountry} ${review.patientCity} | ${review.ratingDate}`
                          : review.patientCity || review.ratingDate}
                      </div>
                    </div>
                  </div>

                  <div className={pstyles.starts_imgs}>
                    {Array.from({ length: review.rateNo }, (_, i) => (
                      <img key={i} src="/assets/svgs/star.svg" alt="star" />
                    ))}
                  </div>
                  {review.ratingMedias && review.ratingMedias.length > 0 &&

                    (<div className={pstyles.images_container} id='reviewsImages'>
                      <Swiper
                        modules={[Navigation]}
                        navigation={{
                          prevEl: '.left_arrow2',
                          nextEl: '.right_arrow2',
                        }}
                        dir={router.locale === 'ar' ? 'rtl' : 'ltr'}
                        className={styles.swiper}
                        slidesPerView={2.5}
                        spaceBetween={16}
                      >
                        <div className='left_arrow2'>
                          <HiChevronLeft />
                        </div>
                        <div className='right_arrow2'>
                          <HiChevronRight />
                        </div>

                        {review.ratingMedias.map((img, imgIndex) => (
                          <SwiperSlide key={imgIndex}>
                            <img
                              src={img}
                              alt="rating media"
                              onClick={() => openGallery(reviewIndex, imgIndex)}
                            />
                          </SwiperSlide>
                        ))}
                      </Swiper>
                    </div>
                    )
                  }

                  <div className={pstyles.title}>
                    <h6>{review.title}</h6>
                  </div>

                  <div className={pstyles.desc}>
                    <p className={expandedReview === reviewIndex ? pstyles.expanded : ''}>
                      {review.description}
                    </p>
                  </div>

                  {/* {review.ratingTreatments.length >= 1 && expandedReview === reviewIndex && (
                    <div className={pstyles.percuders}>
                      <div className={pstyles.title}>{t('navbar:procedures_symptoms')}</div>
                      <ul>
                        {review.ratingTreatments.map((treatment, idx) => (
                          treatment.slug ? (
                            <li key={idx}>
                              <Link href={`/procedures/${treatment.slug}`}>
                                {treatment.name}
                              </Link>
                            </li>
                          ) : (
                            <li key={idx}>{treatment.name}</li>
                          )
                        ))}
                      </ul>
                    </div>
                  )} */}

                  <div className={pstyles.btns_container}>
                    <div className={pstyles.posted_on}>
                      {review.isGoogle ? (
                        <>
                          <img src="/assets/svgs/google_icon.svg" alt="" />
                          {review.rateUrl ? (
                            <Link href={review.rateUrl} target='_blank'>
                              {t('treatments_section:postedOn_google')}
                            </Link>
                          ) : (
                            <span>{t('treatments_section:postedOn_google')}</span>
                          )}
                        </>
                      ) : (
                        <>
                          <img src="/assets/svgs/logo-safemedigo.svg" alt="" />
                          <Link href='' style={{ textDecoration: 'none' }}>
                            {t('treatments_section:postedOn_plat')}
                          </Link>
                        </>
                      )}
                    </div>
                    <div className={pstyles.more} onClick={() => handleMoreClick(reviewIndex)}>
                      {expandedReview === reviewIndex ? t('treatments_section:less') : t('treatments_section:more')}
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          <div className='left_arrow'>
            <HiChevronLeft />
          </div>
          <div className='right_arrow'>
            <HiChevronRight />
          </div>
        </div>
        {isFullScreen && (
          <div className={pstyles.full_screen_gallery}>
            <Swiper
              modules={[Navigation]}
              navigation={{
                prevEl: '.left_arrow3',
                nextEl: '.right_arrow3',
              }}
              dir={router.locale === 'ar' ? 'rtl' : 'ltr'}
              className={pstyles.fullscreen}
              slidesPerView={1}
              spaceBetween={8}
              centeredSlides={true}
              id='swiper_rev_full_screen'
              initialSlide={initialSlide}
            >
              <div className='left_arrow3'>
                <HiChevronLeft />
              </div>
              <div className='right_arrow3'>
                <HiChevronRight />
              </div>

              <div className={pstyles.close_icon} onClick={() => setIsFullScreen(false)}>
                <IoMdClose />
              </div>

              {imagesGallery.map((img, imgIndex) => (
                <SwiperSlide key={imgIndex}>
                  <div className={pstyles.img_container}>
                    <img src={img} alt="rating media" />
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        )}
      </section>
    </>
  );
};

export default PatientReviews;
