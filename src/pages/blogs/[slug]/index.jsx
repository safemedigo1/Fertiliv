import React from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import SingleBlogPage from "../../../../components/SingleBlogPage";
import Navbar from "../../../../components/Navbar";
import Footer from "../../../../components/Footer";
import axios from "axios";

export default function BolgDetailsID({ blog, allBlogsTagsData, dataReviews, }) {
  const router = useRouter();
  const { locale } = useRouter();
  const imagePath = `images/${locale}/image.png`;


  console.log(allBlogsTagsData, "24424242")
  return (
    <>
      <Head>
        <title>{blog?.metaTitleTag}</title>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="csrf-token" content="JdDvDc4LUJomFM4T7QE0hFlH9CeKOHDXMoxV3wer" />
        <meta name="title" content="" />
        <link rel="icon" type="image/png" href={`/${imagePath}`} />
        <meta name="theme-color" content="#1b0968" />
        <meta
          name="keywords"
          content={blog?.metaKeywords}
        />
        <meta name="mobile-web-app-capable" content="no" />
        <meta name="application-name" content={blog?.metaTitleTag} />
        <meta name="apple-mobile-web-app-capable" content="no" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black" />
        <meta name="apple-mobile-web-app-title" content={blog?.metaTitleTag} />
        <link rel="apple-touch-icon" href={`https://www.fertiliv.com/${imagePath}`} />
        <link rel="apple-touch-startup-image" href={`https://www.fertiliv.com/${imagePath}`} />
        <meta name="author" content={blog?.metaTitleTag} />
        <meta name="description" content={blog?.metaDescription} />
        <link rel="canonical" href={`https://www.fertiliv.com/${router.locale}`} />
        <meta name="msapplication-TileColor" content="#1b0968" />
        <meta name="msapplication-TileImage" content={`https://www.fertiliv.com/${imagePath}`} />
        <meta name="msapplication-square70x70logo" content={imagePath} />
        <meta name="msapplication-square150x150logo" content={imagePath} />
        <meta name="msapplication-wide310x150logo" content={imagePath} />
        <meta name="msapplication-square310x310logo" content={imagePath} />
        <link rel="apple-touch-icon-precomposed" href={imagePath} />
        <meta property="og:type" content="website" />

        <meta property="og:site_name" content={blog?.metaTitleTag} />
        <meta property="og:locale" content={router.locale} />
        <meta property="og:locale:alternate" content={router.locale} />
        <meta property="og:url" content={`https://www.fertiliv.com/${router.locale}`} />
        <meta property="og:title" content={blog?.metaTitleTag} />
        <meta property="og:description" content={blog?.metaDescription} />
        <meta property="og:image" content={`https://www.fertiliv.com/${imagePath}`} />
        <meta itemProp="name" content={blog?.metaTitleTag} />
        <meta itemProp="author" content={blog?.metaTitleTag} />
        <meta itemProp="image" content={`https://www.fertiliv.com/${imagePath}`} />
        <meta itemProp="description" content={blog?.metaDescription} />
        <meta name="twitter:image" content={`https://www.fertiliv.com/${imagePath}`} />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:site" content="@" />
        <meta name="twitter:creator" content="@" />
        <meta name="twitter:title" content={blog?.metaTitleTag} />
        <meta name="twitter:image:src" content={`https://www.fertiliv.com/${imagePath}`} />
        <meta name="twitter:description" content={blog?.metaDescription} />
        <link rel="stylesheet" src="../../public/ckeditor-content-styles.css" type="text/css" />
      </Head>


      <Navbar />

      <SingleBlogPage
        blog={blog}
        allBlogsTagsData={allBlogsTagsData}
        dataReviews={dataReviews} />
      <Footer />
    </>
  );
}


export async function getStaticPaths() {
  const res = await fetch("https://api2.safemedigo.com/api/v1/Blog/GetAllBlogSlugs");
  const data = await res.json()

  const paths = data?.map((data) => {
    return {
      params: { slug: data.toString() }
    }
  })

  return {
    paths,
    fallback: 'blocking',
  };
}

export async function getStaticProps({ params, locale }) {



  const res = await fetch("https://api2.safemedigo.com/api/v1/Blog/GetBlogUiDataBySlug", {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      "slug": params.slug,
      "lang": locale
    })
  })
  const data = await res.json()





  const resReviews = await fetch(
    "https://api2.safemedigo.com/api/v1/Rating/GetAllRatings",
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




  const getBlogWithPageRes = await
    axios.post("https://api2.safemedigo.com/api/v1/Blog/GetAllBlogWithPage", {
      "lang": locale,
      "blogCategoryId": 12,
      "currentPage": 1
    }, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    });
  const data2 = await getBlogWithPageRes.data;

  return {
    props: {
      blog: data,
      allBlogsTagsData: data2?.data,
      dataReviews,
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
        "single_blog",
        "Footer",])),
    },
    revalidate: 10,
  }
}
