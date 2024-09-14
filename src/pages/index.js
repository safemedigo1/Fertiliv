import Head from "next/head";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Home from "../../components/Home";
import { useRouter } from "next/router";

export default function Page({ metaData, dataMostPopularDocs, dataReviews }) {
  const { locale } = useRouter();

  const imagePath = "assets/imgs/logo.png";
  const logo_v = "assets/imgs/logo_v.png";

  return (
    <>
      <Head>
        <title>{metaData?.title}</title>
        <meta charSet="UTF-8" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, shrink-to-fit=no"
        />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta
          name="csrf-token"
          content="JdDvDc4LUJomFM4T7QE0hFlH9CeKOHDXMoxV3wer"
        />
        <meta name="keywords" content={metaData?.keywords} />
        <meta name="title" content="" />
        <link rel="icon" type="image/png" href={`/${imagePath}`} />
        <meta name="theme-color" content="#1b0968" />
        <meta name="mobile-web-app-capable" content="no" />
        <meta name="application-name" content={metaData?.title} />
        <meta name="apple-mobile-web-app-capable" content="no" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black" />
        <meta name="apple-mobile-web-app-title" content={metaData?.title} />
        <link
          rel="apple-touch-icon"
          href={`https://www.fertiliv.com/${imagePath}`}
        />
        <link
          rel="apple-touch-startup-image"
          href={`https://www.fertiliv.com/${imagePath}`}
        />
        <meta name="author" content={metaData?.title} />
        <meta name="description" content={metaData?.desc} />
        <link rel="canonical" href={`https://www.fertiliv.com/${locale}`} />
        <meta name="msapplication-TileColor" content="#1b0968" />
        <meta
          name="msapplication-TileImage"
          content={`https://www.fertiliv.com/${imagePath}`}
        />
        <meta name="msapplication-square70x70logo" content={imagePath} />
        <meta name="msapplication-square150x150logo" content={imagePath} />
        <meta name="msapplication-wide310x150logo" content={imagePath} />
        <meta name="msapplication-square310x310logo" content={imagePath} />
        <link rel="apple-touch-icon-precomposed" href={imagePath} />
        <meta property="og:type" content="website" />

        <meta property="og:site_name" content={metaData?.title} />
        <meta property="og:locale" content={locale} />
        <meta property="og:locale:alternate" content={locale} />
        <meta
          property="og:url"
          content={`https://www.fertiliv.com/${locale}`}
        />
        <meta property="og:title" content={metaData?.title} />
        <meta property="og:description" content={metaData?.desc} />
        <meta
          property="og:image"
          content={`https://www.fertiliv.com/${logo_v}`}
        />
        <meta itemProp="name" content={metaData?.title} />
        <meta itemProp="author" content={metaData?.title} />
        <meta itemProp="image" content={`https://www.fertiliv.com/${logo_v}`} />
        <meta itemProp="description" content={metaData?.desc} />
        <meta
          name="twitter:image"
          content={`https://www.fertiliv.com/${logo_v}`}
        />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:site" content="@" />
        <meta name="twitter:creator" content="@" />
        <meta name="twitter:title" content={metaData?.title} />
        <meta
          name="twitter:image:src"
          content={`https://www.fertiliv.com/${logo_v}`}
        />
        <meta name="twitter:description" content={metaData?.desc} />
        <link
          rel="stylesheet"
          src="../../public/ckeditor-content-styles.css"
          type="text/css"
        />
      </Head>

      <Home
        dataMostPopularDocs={dataMostPopularDocs}
        dataReviews={dataReviews}
      />
    </>
  );
}

export async function getStaticProps({ locale }) {
  const path = require("path");
  const fs = require("fs");

  const readFile = async (locale) => {
    const filePath = path.join(
      process.cwd(),
      "public",
      "locales",
      locale,
      "meta_home_page.json"
    );
    const fileContents = fs.readFileSync(filePath, "utf8");
    return JSON.parse(fileContents);
  };

  const metaData = await readFile(locale);

  const resMostPopularDocs = await fetch(
    "https://api2.safemedigo.com/api/v1/Doctor/ListPopularDoctors",
    {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        lang: locale,
        hospitalSlug: "fertiliv",
      }),
    }
  );
  const dataMostPopularDocs = await resMostPopularDocs.json();

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
        platform: "fertiliv",
      }),
    }
  );
  const dataReviews = await resReviews.json();

  return {
    props: {
      metaData,
      dataMostPopularDocs,
      dataReviews,
      ...(await serverSideTranslations(locale, [
        "navbar",
        "why_feriliv",
        "common",
        "howItWorks",
        "ivfClinic",
        "hero",
        "doctor",
        "reviews",
        "help",
        "members",
        "ivfClinic",
        "Footer",
        "treatments_section",
      ])),
    },
    revalidate: 10,
  };
}
