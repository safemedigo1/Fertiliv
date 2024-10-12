import React from 'react'
// import styles from './index.module.scss';
import styles from './index.module.scss';
import { Typography } from '@mui/material';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import { useRouter } from 'next/router';
import { HiChevronLeft, HiChevronRight } from 'react-icons/hi';
const breakpoints = {
  1: { slidesPerView: 1 },
  300: { slidesPerView: 1 },
  400: { slidesPerView: 1 },
  600: { slidesPerView: 2.1 },
  900: { slidesPerView: 2.5 },
  1000: { slidesPerView: 2.1 },
};


const BlogsSection = ({ blogs }) => {
  const router = useRouter();
  return (
    <>
      <section className={styles.blogs_sec} id='blogs_sec'>

        <div
          className={styles.boxes_container}>

          <Swiper
            modules={[Navigation]}
            breakpoints={breakpoints}
            slidesPerView={16}
            navigation={{
              prevEl: '.left_arrow',
              nextEl: '.right_arrow',
            }}
            dir={router.locale === 'ar' ? 'rtl' : 'ltr'}
            className={styles.swiper}
            spaceBetween={16}
          >

            {
              blogs?.data.map((post, idx) => (
                <>
                  <SwiperSlide key={idx}>
                    <motion.div
                      animate={{ opacity: 1 }}
                      initial={{ opacity: 0 }}

                      transition={{ duration: 1, }}
                      className={styles.box} key={idx}>
                      <Link href={`/blogs/${post.slug}`}>
                        <div className={styles.img_container}>
                          <Image
                            src={post.image}
                            alt={post.title}
                            width={344}
                            height={500}
                          />

                        </div>
                        <div className={styles.box_title}>
                          <Typography variant="h5">{post.title}</Typography>
                        </div>

                        <div className={styles.desc}>
                          <p>{post.briefContent}</p>
                        </div>
                        {post?.showEmployeeData !== false &&
                          <div className={styles.author_container}>
                            <div className={styles.img_container}>
                              <Image
                                width={344}
                                height={500}
                                src={post?.publisherImage} alt={post.publisherName} />



                            </div>
                            <div className={styles.author_data}>
                              <div className={styles.user_name}>
                                {post.publisherName}
                              </div>
                              <div className={styles.user_job}>{post.jobTitle}</div>
                            </div>
                          </div>
                        }

                        <div className={styles.btns_container}>
                          <div className={styles.trans_btn}>
                            {post.tags.map((tag) => (
                              <>
                                <Link href={`/tags/${tag.slug}`}>
                                  <button>{tag.tagName}</button>
                                </Link>
                              </>
                            ))}
                          </div>

                        </div>
                      </Link>

                    </motion.div>
                  </SwiperSlide>

                </>
              ))
            }

          </Swiper>


          <div className='left_arrow'>
            <HiChevronLeft />
          </div>
          <div className='right_arrow'>
            <HiChevronRight />
          </div>

        </div>


      </section>
    </>)
}

export default BlogsSection