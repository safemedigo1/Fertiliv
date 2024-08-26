import React from 'react'

import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import QuotePage from '../../../components/QuotePage';
import Head from 'next/head';
import { useRouter } from 'next/router';


const Quote = ({ metaData }) => {
  const router = useRouter()
  const imagePath = "assets/imgs/logo.png";
  const logo_v = "assets/imgs/logo_v.png";
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
        <meta name="theme-color" content="#1b0968" />

        <meta name="mobile-web-app-capable" content="no" />
        <meta name="application-name" content={metaData?.Title_Tag} />
        <meta name="apple-mobile-web-app-capable" content="no" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black" />
        <meta name="apple-mobile-web-app-title" content={metaData?.Title_Tag} />
        <link rel="apple-touch-icon" href={`https://www.fertiliv.com/${imagePath}`} />
        <link rel="apple-touch-startup-image" href={`https://www.fertiliv.com/${imagePath}`} />
        <meta name="author" content={metaData?.Title_Tag} />
        <meta name="description" content={metaData?.Meta_Description} />
        <link rel="canonical" href={`https://www.fertiliv.com/${router.locale}`} />
        <meta name="msapplication-TileColor" content="#1b0968" />
        <meta name="msapplication-TileImage" content={`https://www.fertiliv.com/${imagePath}`} />
        <meta name="msapplication-square70x70logo" content={imagePath} />
        <meta name="msapplication-square150x150logo" content={imagePath} />
        <meta name="msapplication-wide310x150logo" content={imagePath} />
        <meta name="msapplication-square310x310logo" content={imagePath} />
        <link rel="apple-touch-icon-precomposed" href={imagePath} />
        <meta property="og:type" content="website" />

        <meta property="og:site_name" content={metaData?.Title_Tag} />
        <meta property="og:locale" content={router.locale} />
        <meta property="og:locale:alternate" content={router.locale} />
        <meta property="og:url" content={`https://www.fertiliv.com/${router.locale}`} />
        <meta property="og:title" content={metaData?.Title_Tag} />
        <meta property="og:description" content={metaData?.Meta_Description} />
        <meta property="og:image" content={`https://www.fertiliv.com/${logo_v}`} />
        <meta itemProp="name" content={metaData?.Title_Tag} />
        <meta itemProp="author" content={metaData?.Title_Tag} />
        <meta itemProp="image" content={`https://www.fertiliv.com/${logo_v}`} />
        <meta itemProp="description" content={metaData?.Meta_Description} />
        <meta name="twitter:image" content={`https://www.fertiliv.com/${logo_v}`} />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:site" content="@" />
        <meta name="twitter:creator" content="@" />
        <meta name="twitter:title" content={metaData?.Title_Tag} />
        <meta name="twitter:image:src" content={`https://www.fertiliv.com/${logo_v}`} />
        <meta name="twitter:description" content={metaData?.Meta_Description} />
        <link rel="stylesheet" src="../../public/ckeditor-content-styles.css" type="text/css" />
      </Head>
      <QuotePage />
    </>

  )
}

export default Quote



export async function getStaticProps({ locale }) {
  const path = require('path');
  const fs = require('fs');
  const readFile = async (locale) => {
    const filePath = path.join(process.cwd(), 'public', 'locales', locale, 'meta_quote_page.json');
    const fileContents = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(fileContents);

  };

  const metaData = await readFile(locale);
  return {
    props: {
      metaData,
      ...(await serverSideTranslations(locale, ['quote_page', 'common'])),

    },
    revalidate: 10,
  }
}