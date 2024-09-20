import React from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import SingleBlogPage from "@/components/SingleBlogPage";

export default function BolgDetailsID({ blog, allBlogsTagsData, dataReviews, metaData }) {
  const keywords = allBlogsTagsData?.map(tag => tag.tagName).join(', ');
  const router = useRouter();
  const { locale } = useRouter();
  const imagePath = `images/${locale}/image.png`;


  return (
    <>
      <Head>
        <title>{metaData?.Title_Tag}</title>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="csrf-token" content="JdDvDc4LUJomFM4T7QE0hFlH9CeKOHDXMoxV3wer" />
        <meta name="title" content="" />
        <link rel="icon" type="image/png" href={`/${imagePath}`} />
        <meta name="theme-color" content="#004747" />
        <meta
          name="keywords"
          content={metaData?.Meta_Keywords}
        />
        <meta name="mobile-web-app-capable" content="no" />
        <meta name="application-name" content={metaData?.Title_Tag} />
        <meta name="apple-mobile-web-app-capable" content="no" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black" />
        <meta name="apple-mobile-web-app-title" content={metaData?.Title_Tag} />
        <link rel="apple-touch-icon" href={`https://www.safemedigo.com/${imagePath}`} />
        <link rel="apple-touch-startup-image" href={`https://www.safemedigo.com/${imagePath}`} />
        <meta name="author" content={metaData?.Title_Tag} />
        <meta name="description" content={metaData?.Meta_Description} />
        <link rel="canonical" href={`https://www.safemedigo.com/${router.locale}`} />
        <meta name="msapplication-TileColor" content="#004747" />
        <meta name="msapplication-TileImage" content={`https://www.safemedigo.com/${imagePath}`} />
        <meta name="msapplication-square70x70logo" content={imagePath} />
        <meta name="msapplication-square150x150logo" content={imagePath} />
        <meta name="msapplication-wide310x150logo" content={imagePath} />
        <meta name="msapplication-square310x310logo" content={imagePath} />
        <link rel="apple-touch-icon-precomposed" href={imagePath} />
        <meta property="og:type" content="website" />

        <meta property="og:site_name" content={metaData?.Title_Tag} />
        <meta property="og:locale" content={router.locale} />
        <meta property="og:locale:alternate" content={router.locale} />
        <meta property="og:url" content={`https://www.safemedigo.com/${router.locale}`} />
        <meta property="og:title" content={metaData?.Title_Tag} />
        <meta property="og:description" content={metaData?.Meta_Description} />
        <meta property="og:image" content={`https://www.safemedigo.com/${imagePath}`} />
        <meta itemProp="name" content={metaData?.Title_Tag} />
        <meta itemProp="author" content={metaData?.Title_Tag} />
        <meta itemProp="image" content={`https://www.safemedigo.com/${imagePath}`} />
        <meta itemProp="description" content={metaData?.Meta_Description} />
        <meta name="twitter:image" content={`https://www.safemedigo.com/${imagePath}`} />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:site" content="@" />
        <meta name="twitter:creator" content="@" />
        <meta name="twitter:title" content={metaData?.Title_Tag} />
        <meta name="twitter:image:src" content={`https://www.safemedigo.com/${imagePath}`} />
        <meta name="twitter:description" content={metaData?.Meta_Description} />
        <link rel="stylesheet" src="../../public/ckeditor-content-styles.css" type="text/css" />
      </Head>

      <SingleBlogPage
        blog={blog}
        allBlogsTagsData={allBlogsTagsData}
        dataReviews={dataReviews} />
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
  const path = require('path');
  const fs = require('fs');

  const readFile = async (locale) => {
    const filePath = path.join(process.cwd(), 'public', 'locales', locale, 'meta_single_blog.json');
    const fileContents = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(fileContents);

  };

  const metaData = await readFile(locale);

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

  const allBlogTagsRes = await fetch("https://api2.safemedigo.com/api/v1/Blog/GetAllBlogsTags", {
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
  return {
    props: {
      blog: data,
      allBlogsTagsData,
      metaData,
      dataReviews,
      ...(await serverSideTranslations(locale, ['proceduresSymptoms_single', 'treatments_section', 'contact_details', 'single_blog', 'navbar', 'sec_navbar', 'page_header_comp', 'blogs_page', 'Footer', 'patient_stories'])),
    },
    revalidate: 10,
  }
}
