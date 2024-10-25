import styles from '../../../../../styles/blogs.module.scss';
import { useRouter } from "next/router";
import Pagination from "@mui/material/Pagination";
import { Box, Container, Typography } from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import ExpandMoreOutlinedIcon from "@mui/icons-material/ExpandMoreOutlined";
import Link from "next/link";
import Head from "next/head";
import { useEffect, useState } from "react";
import { motion } from 'framer-motion';
import Image from 'next/image'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Tags from '../../../../../../components/Tags';
import { useTranslation } from 'react-i18next';
import Navbar from '../../../../../../components/Navbar';
import Consultation from '../../../../../../components/Home/Consultation';
import BlogsComponents from '../../../../../../components/BlogsComponents';

const PageNumber = ({ blogCategory, query, blogs, myCategoryId, currentPage, totalPages, allBlogsTagsData, dataReviews, metaData }) => {


  const [category, setCategory] = useState(blogCategory[0].categeryName);
  const router = useRouter();
  const keywords = blogCategory?.map(treatment => treatment.categeryName).join(', ');


  const { locale } = useRouter();

  const imagePath = `images/${locale}/image.png`;

  const [isClient, setIsClient] = useState(false)



  const slug = router?.query?.slug;
  // const
  const activeCategory = blogCategory?.find(blog => blog?.slug === slug);






  return (
    <>
      <Head>
        <title>{metaData.title} | {metaData.blogs}</title>
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
        <meta name="title" content="Safemedigo" />
        <link rel="icon" type="image/ico" href="/favorite.ico" />
        <meta name="theme-color" content="#004747" />
        <meta name="mobile-web-app-capable" content="no" />
        <meta name="application-name" content="Safemedigo" />
        <meta name="apple-mobile-web-app-capable" content="no" />
        <meta
          name="apple-mobile-web-app-status-bar-style"
          content="black"
        />
        <meta
          name="apple-mobile-web-app-title"
          content="Safemedigo"
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
          href={`https://safemedigo.com/${router.locale}/blogs`}
          hrefLang="x-default"
        />
        <meta name="author" content="Safemedigo" />
        <meta
          name="description"
          content={metaData.blogs_desc}
        />
        <link rel="canonical" href={`https://safemedigo.com/${router.locale}/blogs`} />
        <meta name="msapplication-TileColor" content="#004747" />
        <meta
          name="msapplication-TileImage"
          content="/favorite.ico"
        />
        <meta
          name="msapplication-square70x70logo"
          content={`https://safemedigo.com/${imagePath}`}
        />
        <meta
          name="msapplication-square150x150logo"
          content={`https://safemedigo.com/${imagePath}`}
        />
        <meta
          name="msapplication-wide310x150logo"
          content={`https://safemedigo.com/${imagePath}`}
        />
        <meta
          name="msapplication-square310x310logo"
          content={`https://safemedigo.com/${imagePath}`}
        />
        <link
          rel="apple-touch-icon-precomposed"
          href={`https://safemedigo.com/${imagePath}`}
        />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Safemedigo" />
        <meta property="og:locale" content={router.locale} />
        <meta
          property="og:locale:alternate"
          content={router.locale}
        />
        <meta property="og:url" content={`https://safemedigo.com/${router.locale}/blogs`} />
        <meta property="og:title" content="Safemedigo" />
        <meta
          property="og:description"
          content={metaData.blogs_desc}
        />
        <meta property="og:image" content={`https://safemedigo.com/${imagePath}`} />
        <meta itemprop="name" content="Safemedigo" />
        <meta itemprop="author" content="Safemedigo" />
        <meta itemprop="image" content={`https://safemedigo.com/${imagePath}`} />
        <meta
          itemprop="description"
          content={metaData.blogs_desc}
        />
        <meta name="twitter:image" content={`https://safemedigo.com/${imagePath}`} />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:site" content="@" />
        <meta name="twitter:creator" content="@" />
        <meta name="twitter:title" content="Safemedigo" />
        <meta name="twitter:image:src" content={`https://safemedigo.com/${imagePath}`} />
        <meta
          name="twitter:description"
          content={metaData.blogs_desc}
        />
      </Head>

      <Navbar />

      <>




        <>
          {/* <div className={styles.sections_container} dir={`${router.locale === 'ar' ? 'rtl' : 'ltr'}`}>
                  <section id={styles.blogs_sec}>
                    <Container sx={{ maxWidth: "1239px" }} maxWidth={false}>


                      <div className={styles.boxes_container}>
                        {blogs.data.map((post, idx) => (
                          <>
                            <motion.div
                              animate={{ opacity: 1 }}
                              initial={{ opacity: 0 }}

                              transition={{ duration: 1, }}
                              className={styles.box} key={idx}>
                              <Link href={`/blogs/${post.slug}`} >

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
                        ))}
                      </div>

                      <Box sx={{
                        display: 'flex', alignItems: 'center', flexDirection: 'column', justifyContent: "center", marginTop: '50px',
                        '& ul > li> button:not(.Mui-selected)': { color: '#004747', fontWeight: 'bold', fontSize: '14px' },
                        '& ul > li> .Mui-selected': { backgroundColor: '#004747', color: '#ffffff', fontWeight: 'bold', fontSize: '18px' }
                      }} className="pagination">
                        <Pagination dir='ltr' count={totalPages} page={currentPage} onChange={handleMyChangePage} />

                      </Box>
                    </Container>
                  </section>

                  <Tags allBlogsTagsData={allBlogsTagsData} />
                </div> */}

          <BlogsComponents
            blogCategory={blogCategory}
            blogs={blogs}
            allBlogsTagsData={allBlogsTagsData}
            currentPage={currentPage}
            totalPages={totalPages}
            dataReviews={dataReviews} />
        </>

        <Footer />

      </>

    </>
  )
}

export default PageNumber

export async function getServerSideProps({ query, locale }) {

  const path = require('path');
  const fs = require('fs');

  const readFile = async (locale) => {
    const filePath = path.join(process.cwd(), 'public', 'locales', locale, 'meta_home_page.json');
    const fileContents = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(fileContents);

  };

  const metaData = await readFile(locale);




  const categorySlug = query.slug
  const page = query.id; // If no page is specified, default to page 1
  const limit = 6; // Number of products to display per page
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;



  const res1 = await fetch("https://api1.fertiliv.com/api/v1/BlogCategory/GetAllBlogCategoriesByLang", {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      "isSpecial": false,
      "lang": locale,
    })
  })
  const data2 = await res1.json()

  const myCategoryId = data2.filter((c) => c.slug === query.slug)


  const res = await fetch("https://api1.fertiliv.com/api/v1/Blog/GetAllBlogWithPage", {
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


  const allBlogTagsRes = await fetch("https://api1.fertiliv.com/api/v1/Blog/GetAllBlogsTags", {
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
    "https://api1.fertiliv.com/api/v1/Rating/GetAllRatings",
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

  // const blogsFiltred = data2.filter((b) => b.id !== 12);
  return {
    props: {
      blogs: data,
      dataReviews,
      blogCategory: data2,
      // blogCategory: blogsFiltred,
      products: products.slice(startIndex, endIndex),
      currentPage: parseInt(page),
      totalPages,
      categorySlug,
      allBlogsTagsData,
      myCategoryId,
      metaData,
      query,
      ...(await serverSideTranslations(locale, ["navbar", "hospital", "proceduresSymptoms", "sec_navbar", "proceduresSymptoms_single", 'Footer', 'most_popular',
        "navbar",
        "why_feriliv",
        "common",
        "howItWorks",
        "ivfClinic",
        "hero",
        "doctor",
        "reviews",
        "help",
        "blogs_page",

        "members",
        "ivfClinic",
        "Footer"])),
    }
  }
}












// Filter Category

{/* <div id={styles.tags_filter} dir={`${router.locale === 'ar' ? 'rtl' : 'ltr'}`}>
<Container sx={{ maxWidth: "1239px" }} maxWidth={false}>
  <div className={styles.filter} id='filter_blog_component' dir={`${router.locale === 'ar' ? 'rtl' : 'ltr'}`}>
    <FormControl fullWidth>
      <Select
        displayEmpty
        inputProps={{
          'aria-label': 'Without label', MenuProps: {
            MenuListProps: {
              sx: {
                backgroundColor: 'transparent',
              }
            }
          }
        }}
        IconComponent={ExpandMoreOutlinedIcon}
        // label={category}
        onChange={handleFilterChanges}

        style={{
          backgroundColor: "#E7EDEC",
          color: "#000000",
          fontSize: "18px",
          fontWeight: "bold",
        }}



      >
        <MenuItem disabled sx={{ display: 'none' }}>
          {myCategoryId[0]?.categeryName}
        </MenuItem>
        {blogCategory.map((item) => (
          <MenuItem dir={`${router.locale === "ar" ? 'rtl' : 'ltr'}`} value={item.slug} >
            <span dir={`${router.locale === "ar" ? 'rtl' : 'ltr'}`} className='category_name'>
              {item.categeryName}
            </span>
          </MenuItem>
        ))}




        <MenuItem
          dir={`${router.locale === "ar" ? 'rtl' : 'ltr'}`}
          onClick={(e) => {
            e.stopPropagation(); // Prevents the default behavior of Select
            router.push('/blogs');
          }}
          value={'blogs'}
        >
          <span dir={`${router.locale === "ar" ? 'rtl' : 'ltr'}`} className='category_name'>
            {t('blogs_page:filter_title')}
          </span>
        </MenuItem>




      </Select>
    </FormControl>
  </div>
</Container >
</div > */}