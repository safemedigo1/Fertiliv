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
import Image from 'next/image'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { motion } from 'framer-motion'
import Head from 'next/head';
import { useTranslation } from 'react-i18next';
import Consultation from '../../../../../components/Home/Consultation';
import Tags from '../../../../../components/Tags';
import Navbar from '../../../../../components/Navbar';
import BlogsComponents from '../../../../../components/BlogsComponents';

export default function BlogPage({ metaData, blogCategory, blogs, allBlogsTagsData, currentPage, totalPages, dataReviews }) {
  const router = useRouter();
  const [category, setCategory] = useState('All');





  const { locale } = useRouter();

  const imagePath = `images/${locale}/image.png`;

  console.log(totalPages, "totalPages")


  return (
    <>
      <Head>
        <title>{`${metaData.site_name} | ${metaData.blogs}`} </title>
        <meta
          name="keywords"
          content={metaData?.keywords}
        />

        <link rel="icon" type="image/png" href={`/${imagePath}`} />


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
        <meta name="title" content={`${metaData.site_name} | ${metaData.blogs}`} />
        <meta name="theme-color" content="#1b0968" />
        <meta name="mobile-web-app-capable" content="no" />
        <meta name="application-name" content={`${metaData.site_name} | ${metaData.blogs}`} />
        <meta name="apple-mobile-web-app-capable" content="no" />
        <meta
          name="apple-mobile-web-app-status-bar-style"
          content="black"
        />
        <meta
          name="apple-mobile-web-app-title"
          content={`${metaData.site_name} | ${metaData.blogs}`}
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
        <meta name="author" content={`${metaData.site_name} | ${metaData.blogs}`} />
        <meta
          name="description"
          content={metaData.blogs_desc}
        />
        <link rel="canonical" href={`https://fertiliv.com/${router.locale}/blogs`} />
        <meta name="msapplication-TileColor" content="#1b0968" />
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
        <meta property="og:site_name" content={`${metaData.site_name} | ${metaData.blogs}`} />
        <meta property="og:locale" content={router.locale} />
        <meta
          property="og:locale:alternate"
          content={router.locale}
        />
        <meta property="og:url" content={`https://fertiliv.com/${router.locale}/blogs`} />
        <meta property="og:title" content={`${metaData.site_name} | ${metaData.blogs}`} />
        <meta
          property="og:description"
          content={metaData.blogs_desc}
        />
        <meta property="og:image" content={`https://fertiliv.com/${imagePath}`} />
        <meta itemprop="name" content={`${metaData.site_name} | ${metaData.blogs}`} />
        <meta itemprop="author" content={`${metaData.site_name} | ${metaData.blogs}`} />
        <meta itemprop="image" content={`https://fertiliv.com/${imagePath}`} />
        <meta
          itemprop="description"
          content={metaData.blogs_desc}
        />
        <meta name="twitter:image" content={`https://fertiliv.com/${imagePath}`} />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:site" content="@" />
        <meta name="twitter:creator" content="@" />
        <meta name="twitter:title" content={`${metaData.site_name} | ${metaData.blogs}`} />
        <meta name="twitter:image:src" content={`https://fertiliv.com/${imagePath}`} />
        <meta
          name="twitter:description"
          content={metaData.blogs_desc}
        />
      </Head>

      <Navbar />


      <>

        <BlogsComponents
          blogCategory={blogCategory}
          blogs={blogs}
          allBlogsTagsData={allBlogsTagsData}
          currentPage={currentPage}
          totalPages={totalPages}
          dataReviews={dataReviews}
        />


        <Tags allBlogsTagsData={allBlogsTagsData} query={'query'} />

        <Consultation />

      </>









    </>
  );


}




// export async function getStaticPaths() {
//   const res = await fetch("https://api1.fertiliv.com/api/v1/Blog/GetAllBlogWithPage", {
//     method: 'POST',
//     headers: {
//       'Accept': 'application/json',
//       'Content-Type': 'application/json'
//     },
//     body: JSON.stringify({
//       "lang": "en",
//       "blogCategoryId": '0',
//       "currentPage": '1',
//     })
//   })
//   const data = await res.json()
//   const totalProducts = data.count / 6;



//   const dynamicNumber = Math.ceil(totalProducts);
//   const numbersArray = Array.from({ length: dynamicNumber }, (_, index) => index + 1);
//   const customLocale = ['en', 'ar', 'tr'];




//   const paths = numbersArray.flatMap((number, idx) => customLocale.map((locale) => ({
//     params: { slug: number.toString() },
//     locale: locale,
//   })))





//   return {
//     paths,
//     fallback: 'blocking',
//   };
// }


// export async function getStaticProps({ locale, params }) {
//   const path = require('path');
//   const fs = require('fs');

//   const readFile = async (locale) => {
//     const filePath = path.join(process.cwd(), 'public', 'locales', locale, 'meta_home_page.json');
//     const fileContents = fs.readFileSync(filePath, 'utf8');
//     return JSON.parse(fileContents);

//   };

//   const metaData = await readFile(locale);


//   const page = params.slug || '1'; // If no page is specified, default to page 1
//   const limit = 6; // Number of products to display per page
//   const startIndex = (page - 1) * limit;
//   const endIndex = startIndex + limit;


//   const res1 = await fetch("https://api2.safemedigo.com/api/v1/BlogCategory/GetAllBlogCategoriesByLang", {
//     method: 'POST',
//     headers: {
//       'Accept': 'application/json',
//       'Content-Type': 'application/json'
//     },
//     body: JSON.stringify({
//       "lang": locale,
//       "isSpecial": true,

//     })
//   })
//   const data2 = await res1.json()

//   const myCategoryId = data2.filter((c) => c.slug === params.category)

//   const res = await fetch(
//     "https://api2.safemedigo.com/api/v1/Hospital/GetHospitalBlogWithPageBySlug",
//     {
//       method: "POST",
//       headers: {
//         Accept: "application/json",
//         "Content-Type": "application/json",
//         "Cache-Control": "no-cache",
//         Pragma: "no-cache",
//         Expires: "0",
//       },
//       body: JSON.stringify({
//         lang: locale,
//         blogCategoryId: "12",
//         currentPage: page,
//         hospitalSlug: "fertiliv",
//       }),
//     }
//   );
//   const data = await res.json();;



//   const products = data.data;
//   const totalProducts = data.count;
//   const totalPages = Math.ceil(totalProducts / limit);

//   const allBlogTagsRes = await fetch("https://api2.safemedigo.com/api/v1/Blog/GetAllBlogsTags", {
//     method: 'POST',
//     headers: {
//       'Accept': 'application/json',
//       'Content-Type': 'application/json'
//     },
//     body: JSON.stringify({
//       "lang": locale,
//     })
//   })

//   const allBlogsTagsData = await allBlogTagsRes.json()

//   const resReviews = await fetch(
//     "https://api2.safemedigo.com/api/v1/Rating/GetAllRatings",
//     {
//       method: "POST",
//       headers: {
//         Accept: "application/json",
//         "Content-Type": "application/json",
//         "Cache-Control": "no-cache",
//         Pragma: "no-cache",
//         Expires: "0",
//       },
//       body: JSON.stringify({
//         lang: locale,
//         platform: "fertiliv",
//       }),
//     }
//   );
//   const dataReviews = await resReviews.json();
//   return {
//     props: {
//       blogs: data,
//       dataReviews,
//       blogCategory: data2,
//       products: products.slice(startIndex, endIndex),
//       currentPage: parseInt(page),
//       totalPages,
//       allBlogsTagsData,
//       metaData,
//       ...(await serverSideTranslations(locale, ["navbar", "hospital", "proceduresSymptoms", "sec_navbar", "proceduresSymptoms_single", 'Footer', 'most_popular',
//         "navbar",
//         "why_feriliv",
//         "common",
//         "howItWorks",
//         "ivfClinic",
//         "hero",
//         "doctor",
//         "reviews",
//         "help",
//         "blogs_page",

//         "members",
//         "ivfClinic",
//         "Footer"])),
//     },
//     revalidate: 10,

//   }
// }







export async function getStaticPaths() {
  const res = await fetch("https://api1.fertiliv.com/api/v1/Blog/GetAllBlogWithPage", {
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


  const page = params.slug || '1';
  const limit = 6;
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;


  const res1 = await fetch("https://api1.fertiliv.com/api/v1/BlogCategory/GetAllBlogCategoriesByLang", {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      "lang": locale,
      "isSpecial": false,

    })
  })
  const data2 = await res1.json()

  const myCategoryId = data2.filter((c) => c.slug === params.category)

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
        platform: "safemedigo",
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
    },
    revalidate: 10,

  }
}

