import Link from "next/link";
import Head from "next/head";
import styles from "./index.module.scss";
import { Box, Container, Typography } from "@mui/material";
import ExpandMoreOutlinedIcon from "@mui/icons-material/ExpandMoreOutlined";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { useRouter } from "next/router";
import Pagination from "@mui/material/Pagination";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

import Image from 'next/image'
import { useTranslation } from "react-i18next";
import Consultation from "../Home/Consultation";
import Tags from '../Tags';

const BlogsComponents = ({ blogCategory,
  blogs,
  allBlogsTagsData,
  currentPage,
  dataReviews,
  totalPages }) => {
  const { t } = useTranslation();
  const [category, setCategory] = useState('All Blogs');

  const router = useRouter();

  const slug = router?.query?.slug;
  const id = router?.query?.id
  // const
  const activeCategory = blogCategory?.find(blog => blog?.slug === slug);


  const handleMyChangePage = (event, value) => {
    event.preventDefault();
    router.push(`/blogs/page/${value}`, undefined, { scroll: false })

  }




  const handleFilterChanges = (event, value) => {
    router.push(`/category/${value.props.value}/page/1`, undefined, { scroll: false });
    setCategory(value.props.children)
  }





  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])




  return (
    <>
      {isClient &&
        <>


          <div className={styles.sections_container} dir={`${router.locale === 'ar' ? 'rtl' : 'ltr'}`}>



            <section id={styles.blogs_sec}>
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


                <div id={styles.tags_filter} dir={`${router.locale === 'ar' ? 'rtl' : 'ltr'}`}>
                  <div id='filter_blog_component' className={styles.filter} dir={`${router.locale === 'ar' ? 'rtl' : 'ltr'}`}>
                    <FormControl fullWidth  >
                      {/* <InputLabel id="demo-simple-select-autowidth-label">{t('blogs_page:filter_title')}</InputLabel> */}
                      <Select
                        displayEmpty
                        inputProps={{ 'aria-label': 'Without label' }}
                        IconComponent={ExpandMoreOutlinedIcon}
                        // label={t('blogs_page:filter_title')}
                        onChange={handleFilterChanges}

                        MenuProps={{
                          anchorOrigin: { horizontal: 'right', vertical: 'bottom' },
                          transformOrigin: { horizontal: 'right', vertical: 'top' },
                        }}
                        style={{
                          backgroundColor: "#E7EDEC",
                          color: "#000000",
                          fontSize: "18px",
                          fontWeight: "bold",

                        }}
                      >
                        <MenuItem disabled sx={{ display: 'none' }}>
                          {router.pathname === '/blogs' &&
                            t("blogs_page:choose_category")
                          }

                          {activeCategory?.categeryName}
                        </MenuItem>
                        {blogCategory.map((item) => (
                          <MenuItem dir={`${router.locale === 'ar' ? 'rtl' : 'ltr'}`} value={item.slug} >
                            <span dir={`${router.locale === 'ar' ? 'rtl' : 'ltr'}`} className={'category_name'}>
                              {item.categeryName}
                            </span>
                          </MenuItem>
                        ))}


                      </Select>
                    </FormControl>
                  </div>
                </div >



                {

                  blogs.count === 0 &&
                  <Container sx={{ maxWidth: "1239px", marginTop: '80px', marginBottom: '80px', textAlign: 'center', fontWeight: 'bold', fontSize: '24px' }} maxWidth={false}>
                    <h2>No Blogs In {activeCategory?.categeryName} </h2>
                  </Container>

                }


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
                            {post?.showEmployeeData &&
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

                {

                  blogs.count !== 0 &&
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
                }
              </Container>
            </section>

            {/* Tag Component */}
            {/* <Tags allBlogsTagsData={allBlogsTagsData} /> */}
          </div>

          <Consultation />

        </>
      }
    </>
  )
}

export default BlogsComponents