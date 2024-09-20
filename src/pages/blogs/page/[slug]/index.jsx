import styles from './index.module.scss';
import { useRouter } from "next/router";
import Pagination from "@mui/material/Pagination";
import { Box, Container, Typography } from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import ExpandMoreOutlinedIcon from "@mui/icons-material/ExpandMoreOutlined";
import Link from "next/link";
import { useEffect, useState } from "react";
import SecNavbar from '@/components/Navbar/SecNavbar';
import Image from 'next/image'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { motion } from 'framer-motion'
import { ContactDetails } from '@/components/Home';
import PageHeader from '@/components/PageHeader';
import Tags from '@/components/Tags';
import Head from 'next/head';
import { useTranslation } from 'react-i18next';

export default function BlogPage({ metaData, blogCategory, blogs, allBlogsTagsData, currentPage, totalPages, dataReviews }) {
  const keywords = allBlogsTagsData?.map(tag => tag.tagName).join(', ');
  const { t } = useTranslation();
  const router = useRouter();
  const [category, setCategory] = useState('All');

  const handleMyChangePage = (event, value) => {
    event.preventDefault();
    if (value === 1) {
      router.push(`/blogs/`);
    }

    router.push(`/blogs/page/${value}`)
  }

  const handleFilterChanges = (event, value) => {
    router.push(`/category/${value.props.value}/page/1`);

    // setTimeout(() => window.location.reload(), 2000);
    setCategory(value.props.value
    )
  }


  const count = blogs.count / 6;

  const { locale } = useRouter();

  const imagePath = `images/${locale}/image.png`;

  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  return (
    <>
      <Head>
        <title>{`${metaData.title} | ${metaData.blogs_desc}`} </title>
        <meta name="blogs" content="blogs for doctors" />
        <meta
          name="keywords"
          content={keywords}
        />

        <meta charSet="UTF-8" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, shrink-to-fit=no"
        />
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta
          name="csrf-token"
          content="JdDvDc4LUJomFM4T7QE0hFlH9CeKOHDXMoxV3wer"
        />
        <meta name="title" content={`${metaData.title} | ${metaData.blogs}`} />
        <link rel="icon" type="image/ico" href="/favorite.ico" />
        <meta name="theme-color" content="#004747" />
        <meta name="mobile-web-app-capable" content="no" />
        <meta name="application-name" content={`${metaData.title} | ${metaData.blogs}`} />
        <meta name="apple-mobile-web-app-capable" content="no" />
        <meta
          name="apple-mobile-web-app-status-bar-style"
          content="black"
        />
        <meta
          name="apple-mobile-web-app-title"
          content={`${metaData.title} | ${metaData.blogs}`}
        />
        <link rel="apple-touch-icon" href="/favorite.ico" />
        <link
          href="/favorite.ico"
          media="(device-width: 320px) and (device-height: 568px) and (-webkit-device-pixel-ratio: 2)"
          rel="apple-touch-startup-image"
        />
        <link
          href="/favorite.ico"
          media="(device-width: 375px) and (device-height: 667px) and (-webkit-device-pixel-ratio: 2)"
          rel="apple-touch-startup-image"
        />
        <link
          href="/favorite.ico"
          media="(device-width: 621px) and (device-height: 1104px) and (-webkit-device-pixel-ratio: 3)"
          rel="apple-touch-startup-image"
        />
        <link
          href="/favorite.ico"
          media="(device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3)"
          rel="apple-touch-startup-image"
        />
        <link
          href="/favorite.ico"
          media="(device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 2)"
          rel="apple-touch-startup-image"
        />
        <link
          href="/favorite.ico"
          media="(device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 3)"
          rel="apple-touch-startup-image"
        />
        <link
          href="/favorite.ico"
          media="(device-width: 768px) and (device-height: 1024px) and (-webkit-device-pixel-ratio: 2)"
          rel="apple-touch-startup-image"
        />
        <link
          href="/favorite.ico"
          media="(device-width: 834px) and (device-height: 1112px) and (-webkit-device-pixel-ratio: 2)"
          rel="apple-touch-startup-image"
        />
        <link
          href="/favorite.ico"
          media="(device-width: 834px) and (device-height: 1194px) and (-webkit-device-pixel-ratio: 2)"
          rel="apple-touch-startup-image"
        />
        <link
          href="/favorite.ico"
          media="(device-width: 1024px) and (device-height: 1366px) and (-webkit-device-pixel-ratio: 2)"
          rel="apple-touch-startup-image"
        />
        <link
          rel="alternate"
          href={`https://fertiliv.com/${router.locale}/blogs`}
          hrefLang="x-default"
        />
        <meta name="author" content={`${metaData.title} | ${metaData.blogs}`} />
        <meta
          name="description"
          content={metaData.description}
        />
        <link rel="canonical" href={`https://fertiliv.com/${router.locale}/blogs`} />
        <meta name="msapplication-TileColor" content="#004747" />
        <meta
          name="msapplication-TileImage"
          content="/favorite.ico"
        />
        <meta
          name="msapplication-square70x70logo"
          content={`https://fertiliv.com/${imagePath}`}
        />
        <meta
          name="msapplication-square150x150logo"
          content={`https://fertiliv.com/${imagePath}`}
        />
        <meta
          name="msapplication-wide310x150logo"
          content={`https://fertiliv.com/${imagePath}`}
        />
        <meta
          name="msapplication-square310x310logo"
          content={`https://fertiliv.com/${imagePath}`}
        />
        <link
          rel="apple-touch-icon-precomposed"
          href={`https://fertiliv.com//${imagePath}`}
        />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content={`${metaData.title} | ${metaData.blogs}`} />
        <meta property="og:locale" content={router.locale} />
        <meta
          property="og:locale:alternate"
          content={router.locale}
        />
        <meta property="og:url" content={`https://fertiliv.com/${router.locale}/blogs`} />
        <meta property="og:title" content={`${metaData.title} | ${metaData.blogs}`} />
        <meta
          property="og:description"
          content={metaData.description}
        />
        <meta property="og:image" content={`https://fertiliv.com/${imagePath}`} />
        <meta itemprop="name" content={`${metaData.title} | ${metaData.blogs}`} />
        <meta itemprop="author" content={`${metaData.title} | ${metaData.blogs}`} />
        <meta itemprop="image" content={`https://fertiliv.com/${imagePath}`} />
        <meta
          itemprop="description"
          content={metaData.description}
        />
        <meta name="twitter:image" content={`https://fertiliv.com/${imagePath}`} />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:site" content="@" />
        <meta name="twitter:creator" content="@" />
        <meta name="twitter:title" content={`${metaData.title} | ${metaData.blogs}`} />
        <meta name="twitter:image:src" content={`https://fertiliv.com/${imagePath}`} />
        <meta
          name="twitter:description"
          content={metaData.description}
        />
      </Head>


      {isClient &&
        <>
          <SecNavbar />
          <PageHeader />
          <div id={styles.tags_filter} dir={`${router.locale === 'ar' ? 'rtl' : 'ltr'}`}>
            <Container sx={{ maxWidth: "1239px" }} maxWidth={false}>
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
                      {t("blogs_page:choose_category")}
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
            </Container >
          </div >

          <div className={styles.sections_container} dir={`${router.locale === 'ar' ? 'rtl' : 'ltr'}`}>
            <section className='section_container_blogs' id={styles.blogs_sec} dir={locale === 'ar' ? 'rtl' : 'ltr'}>
              <Container sx={{ maxWidth: "1239px" }} maxWidth={false}>

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

                            <div className={styles.desc}>
                              <p>{post.briefContent}</p>
                            </div>

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
                      </>
                    ))
                  }
                </div>

                <Box sx={{
                  display: 'flex', alignItems: 'center', flexDirection: 'column', justifyContent: "center", marginTop: '50px',
                  '& ul > li> button:not(.Mui-selected)': { color: '#004747', fontWeight: 'bold', fontSize: '14px' },
                  '& ul > li> .Mui-selected': { backgroundColor: '#004747', color: '#ffffff', fontWeight: 'bold', fontSize: '18px' }
                }} className="pagination">
                  <Pagination count={totalPages} page={currentPage}
                    dir="ltr"
                    onChange={handleMyChangePage}
                  />
                </Box>
              </Container>
            </section>

            {/* Tag Component */}
            <Tags allBlogsTagsData={allBlogsTagsData} />
          </div>
          <ContactDetails dataReviews={dataReviews} />

        </>
      }






    </>
  );


}




export async function getStaticPaths() {
  const res = await fetch("https://api2.fertiliv.com/api/v1/Blog/GetAllBlogWithPage", {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      "lang": "en",
      "blogCategoryId": '0',
      "currentPage": '1',
    })
  })
  const data = await res.json()
  const totalProducts = data.count / 6;



  const dynamicNumber = Math.ceil(totalProducts);
  const numbersArray = Array.from({ length: dynamicNumber }, (_, index) => index + 1);
  const customLocale = ['en', 'ar', 'tr'];




  const paths = numbersArray.flatMap((number, idx) => customLocale.map((locale) => ({
    params: { slug: number.toString() },
    locale: locale,
  })))





  return {
    paths,
    fallback: 'blocking',
  };
}


export async function getStaticProps({ locale, params }) {
  const path = require('path');
  const fs = require('fs');

  const readFile = async (locale) => {
    const filePath = path.join(process.cwd(), 'public', 'locales', locale, 'meta_home_page.json');
    const fileContents = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(fileContents);

  };

  const metaData = await readFile(locale);


  const page = params.slug || '1'; // If no page is specified, default to page 1
  const limit = 6; // Number of products to display per page
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;


  const res1 = await fetch("https://api2.fertiliv.com/api/v1/BlogCategory/GetAllBlogCategoriesByLang", {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      "lang": locale,
      "isSpecial": true,

    })
  })
  const data2 = await res1.json()

  const myCategoryId = data2.filter((c) => c.slug === params.category)

  const res = await fetch("https://api2.fertiliv.com/api/v1/Blog/GetAllBlogWithPage", {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      "lang": locale,
      "blogCategoryId": myCategoryId[0]?.id || '0',
      "currentPage": page,
    })
  })
  const data = await res.json()


  const products = data.data;
  const totalProducts = data.count;
  const totalPages = Math.ceil(totalProducts / limit);

  const allBlogTagsRes = await fetch("https://api2.fertiliv.com/api/v1/Blog/GetAllBlogsTags", {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      "lang": locale,
    })
  })

  const allBlogsTagsData = await allBlogTagsRes.json()

  const resReviews = await fetch(
    "https://api2.fertiliv.com/api/v1/Rating/GetAllRatings",
    {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "Cache-Control": "no-cache",
        Pragma: "no-cache",
        Expires: "0",
      },
      body: JSON.stringify({
        lang: locale,
        platform: "fertiliv",
      }),
    }
  );
  const dataReviews = await resReviews.json();
  return {
    props: {
      blogs: data,
      dataReviews,
      blogCategory: data2,
      products: products.slice(startIndex, endIndex),
      currentPage: parseInt(page),
      totalPages,
      allBlogsTagsData,
      metaData,
      ...(await serverSideTranslations(locale, ['navbar', 'contact_details', 'treatments_section', 'sec_navbar', 'blogs_page', 'page_header_comp', 'Footer', 'patient_stories'])),
    },
    revalidate: 10,

  }
}

