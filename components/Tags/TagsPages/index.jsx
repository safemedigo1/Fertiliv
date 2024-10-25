import React from 'react'
import styles from '../../../src/styles/blogs.module.scss';
import { useRouter } from "next/router";
import Pagination from "@mui/material/Pagination";
import { Box, Container, Typography } from "@mui/material";
import Link from "next/link";
import { useEffect, useState } from "react";
import Image from 'next/image'
import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next';
import Consultation from '../../Home/Consultation';
import Tags from '../index'

const TagsPages = ({ blogs, currentPage, totalPages, allBlogsTagsData }) => {
  const { t } = useTranslation();
  const router = useRouter();
  const slug = router.query.slug;

  const handleMyChangePage = (event, value) => {
    event.preventDefault();
    // if (value === 1) {
    //   router.push(`/blogs/`);
    // }

    router.push(`/tags/${slug}/${value}`)
  }



  const { locale } = useRouter();


  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])
  return (
    <>

      {isClient &&
        <>


          <div className={styles.sections_container} dir={`${router.locale === 'ar' ? 'rtl' : 'ltr'}`}>
            <section className='section_container_blogs' id={styles.blogs_sec} dir={locale === 'ar' ? 'rtl' : 'ltr'}>
              <Container sx={{ maxWidth: "1239px" }} maxWidth={false}>
                <div className={styles.hero}>
                  <div className={styles.title}>
                    <h1>
                      {t("blogs_page:hero_title")}
                    </h1>
                  </div>

                  <div className={styles.desc}>
                    {t("blogs_page:hero_desc")}
                  </div>
                </div>
                <div
                  className={styles.boxes_container}>
                  {

                    blogs?.data.map((post, idx) => (
                      <>

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

                            <div className={`${styles.desc} ${post?.showEmployeeData === false && post?.tags?.some((tag) => tag?.tagName === '') && styles.full_desc
                              }`}>
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
                                    {tag?.tagName !== '' &&
                                      <Link href={`/tags/${tag.slug}`}>
                                        <button>{tag.tagName}</button>
                                      </Link>
                                    }
                                  </>
                                ))}
                              </div>

                            </div>

                          </Link>

                        </motion.div>
                      </>
                    ))
                  }
                </div>

                <Box sx={{
                  display: 'flex', alignItems: 'center', flexDirection: 'column', justifyContent: "center", marginTop: '50px',
                  '& ul > li> button:not(.Mui-selected)': { color: '#1b0968', fontWeight: 'bold', fontSize: '14px' },
                  '& ul > li> .Mui-selected': { backgroundColor: '#1b0968', color: '#ffffff', fontWeight: 'bold', fontSize: '18px' }
                }} className="pagination">
                  <Pagination count={totalPages} page={currentPage}
                    dir="ltr"
                    onChange={handleMyChangePage}
                  />
                </Box>
              </Container>
            </section>

          </div>


          <Tags allBlogsTagsData={allBlogsTagsData} query={'query'} />

          <Consultation />

        </>
      }
    </>)
}

export default TagsPages