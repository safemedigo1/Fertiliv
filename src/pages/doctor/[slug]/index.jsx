import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import DoctorComponent from "../../../../components/pages/DoctorComponent";
import Navbar from "../../../../components/Navbar";
import Footer from "../../../../components/Footer";
import Head from "next/head";
import { useRouter } from "next/router";
import Consultation from "../../../../components/Home/Consultation";

const DoctorName = ({ dataDoctorSlug, dataDoctorMainSpecializations, dataDoctorTreatments, dataDoctorCertificatest, dataDoctorLanguagesBySlug, dataDoctorMedias, dataDoctorCareer, dataDoctorEducation, dataDoctorMemberShip, dataDoctorProcedure, dataDoctorHospitalClinics, dataDoctorLeaflets, dataDoctorPackage, dataSubSpecializations, metaData }) => {
  const { locale } = useRouter();


  return (
    <>
      <Head>
        <title>{dataDoctorSlug?.metaTitleTag}</title>
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
        <meta name="keywords" content={dataDoctorSlug?.metaKeywords} />
        <meta name="title" content="" />
        <link rel="icon" type="image/png" href={dataDoctorSlug?.image} />
        <meta name="theme-color" content="#1b0968" />
        <meta name="mobile-web-app-capable" content="no" />
        <meta name="application-name" content={dataDoctorSlug?.metaTitleTag} />
        <meta name="apple-mobile-web-app-capable" content="no" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black" />
        <meta
          name="apple-mobile-web-app-title"
          content={dataDoctorSlug?.metaTitleTag}
        />
        <link
          rel="apple-touch-icon"
          href={dataDoctorSlug?.image}
        />
        <link
          rel="apple-touch-startup-image"
          href={dataDoctorSlug?.image}
        />
        <meta name="author" content={dataDoctorSlug?.metaTitleTag} />
        <meta name="description" content={dataDoctorSlug?.metaDescription} />
        <link rel="canonical" href={`https://www.fertiliv.com/${locale}`} />
        <meta name="msapplication-TileColor" content="#1b0968" />
        <meta
          name="msapplication-TileImage"
          content={dataDoctorSlug?.image}
        />
        <meta
          name="msapplication-square70x70logo"
          content={dataDoctorSlug?.image}
        />
        <meta
          name="msapplication-square150x150logo"
          content={dataDoctorSlug?.image}
        />
        <meta
          name="msapplication-wide310x150logo"
          content={dataDoctorSlug?.image}
        />
        <meta
          name="msapplication-square310x310logo"
          content={dataDoctorSlug?.image}
        />
        <link rel="apple-touch-icon-precomposed" href={dataDoctorSlug?.image} />
        <meta property="og:type" content="website" />

        <meta property="og:site_name" content={dataDoctorSlug?.metaTitleTag} />
        <meta property="og:locale" content={locale} />
        <meta property="og:locale:alternate" content={locale} />
        <meta
          property="og:url"
          content={`https://www.fertiliv.com/${locale}`}
        />
        <meta property="og:title" content={dataDoctorSlug?.metaTitleTag} />
        <meta property="og:description" content={metaData?.desc} />
        <meta property="og:image" content={`${dataDoctorSlug?.image}`} />
        <meta itemProp="name" content={dataDoctorSlug?.metaTitleTag} />
        <meta itemProp="author" content={dataDoctorSlug?.metaTitleTag} />
        <meta itemProp="image" content={`${dataDoctorSlug?.image}`} />
        <meta
          itemProp="description"
          content={dataDoctorSlug?.metaDescription}
        />
        <meta name="twitter:image" content={`${dataDoctorSlug?.image}`} />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:site" content="@" />
        <meta name="twitter:creator" content="@" />
        <meta name="twitter:title" content={dataDoctorSlug?.metaTitleTag} />
        <meta name="twitter:image:src" content={`${dataDoctorSlug?.image}`} />
        <meta
          name="twitter:description"
          content={dataDoctorSlug?.metaDescription}
        />
        <link
          rel="stylesheet"
          src="../../public/ckeditor-content-styles.css"
          type="text/css"
        />
      </Head>

      <Navbar />
      <DoctorComponent
        dataDoctorSlug={dataDoctorSlug} dataDoctorLeaflets={dataDoctorLeaflets} dataDoctorMainSpecializations={dataDoctorMainSpecializations} dataDoctorTreatments={dataDoctorTreatments} dataDoctorCertificatest={dataDoctorCertificatest} dataDoctorLanguagesBySlug={dataDoctorLanguagesBySlug} dataDoctorMedias={dataDoctorMedias} dataDoctorCareer={dataDoctorCareer} dataDoctorEducation={dataDoctorEducation} dataDoctorMemberShip={dataDoctorMemberShip} dataDoctorProcedure={dataDoctorProcedure} dataDoctorHospitalClinics={dataDoctorHospitalClinics} dataDoctorPackage={dataDoctorPackage} dataSubSpecializations={dataSubSpecializations}
      />
      <Consultation />

      <Footer />

    </>
  )
}

export default DoctorName



export async function getStaticPaths() {
  const resDoctorsSlugs = await fetch("https://api2.safemedigo.com/api/v1/Doctor/ListAllDoctorSlugs");
  const dataDoctorsSlugs = await resDoctorsSlugs.json();

  const paths = dataDoctorsSlugs.map((slug) => {
    return {
      params: { slug: slug }
    };
  });

  const validPaths = paths.map((path) => {
    return {
      ...path,
    };
  });

  return {
    paths: validPaths,
    fallback: "blocking",
  };
}

export async function getStaticProps({ locale, params }) {

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


  const resDoctorSlug = await fetch("https://api2.safemedigo.com/api/v1/Doctor/GetDoctorBySlug", {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      "doctorSlug": params.slug,
      "lang": locale
    })
  })
  const dataDoctorSlug = await resDoctorSlug.json()


  const resDoctorMainSpecializations = await fetch("https://api2.safemedigo.com/api/v1/Doctor/GetDoctorMainSpecializationsBySlug  ", {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      "doctorSlug": params.slug,
      "lang": locale
    })
  })
  const dataDoctorMainSpecializations = await resDoctorMainSpecializations.json()

  const resSubSpecializations = await fetch("https://api2.safemedigo.com/api/v1/Doctor/GetDoctorSubSpecializationsBySlug  ", {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      "doctorSlug": params.slug,
      "lang": locale
    })
  })
  const dataSubSpecializations = await resSubSpecializations.json()

  const resDoctorTreatments = await fetch("https://api2.safemedigo.com/api/v1/Doctor/GetDoctorTreatmentsBySlug  ", {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      "doctorSlug": params.slug,
      "lang": locale
    })
  })
  const dataDoctorTreatments = await resDoctorTreatments.json()


  const resDoctorCertificatest = await fetch("https://api2.safemedigo.com/api/v1/Doctor/GetDoctorCertificatestBySlug  ", {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      "doctorSlug": params.slug,
      "lang": locale
    })
  })
  const dataDoctorCertificatest = await resDoctorCertificatest.json()


  const resDoctorLeaflets = await fetch("https://api2.safemedigo.com/api/v1/Doctor/GetDoctorLeafletsBySlug", {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      "doctorSlug": params.slug,
      "lang": locale
    })
  })
  const dataDoctorLeaflets = await resDoctorLeaflets.json()


  const resDoctorLanguagesBySlug = await fetch("https://api2.safemedigo.com/api/v1/Doctor/GetDoctorLanguagesBySlug  ", {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      "doctorSlug": params.slug,
      "lang": locale
    })
  })
  const dataDoctorLanguagesBySlug = await resDoctorLanguagesBySlug.json()


  const resDoctorMedias = await fetch("https://api2.safemedigo.com/api/v1/Doctor/GetDoctorMediasBySlug  ", {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      "doctorSlug": params.slug,
      "lang": locale
    })
  })
  const dataDoctorMedias = await resDoctorMedias.json()


  const resDoctorCareer = await fetch("https://api2.safemedigo.com/api/v1/Doctor/GetDoctorCareerBySlug", {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      "doctorSlug": params.slug,
      "lang": locale
    })
  })
  const dataDoctorCareer = await resDoctorCareer.json()



  const resDoctorEducation = await fetch("https://api2.safemedigo.com/api/v1/Doctor/GetDoctorEducationBySlug  ", {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      "doctorSlug": params.slug,
      "lang": locale
    })
  })
  const dataDoctorEducation = await resDoctorEducation.json()



  const resDoctorMemberShip = await fetch("https://api2.safemedigo.com/api/v1/Doctor/GetDoctorMemberShipBySlug  ", {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      "doctorSlug": params.slug,
      "lang": locale
    })
  })
  const dataDoctorMemberShip = await resDoctorMemberShip.json()




  const resDoctorProcedure = await fetch("https://api2.safemedigo.com/api/v1/Doctor/GetDoctorProcedureBySlug  ", {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      "doctorSlug": params.slug,
      "lang": locale
    })
  })
  const dataDoctorProcedure = await resDoctorProcedure.json()




  const resDoctorHospitalClinics = await fetch("https://api2.safemedigo.com/api/v1/Doctor/GetDoctorHospitalClinicsBySlug  ", {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      "doctorSlug": params.slug,
      "lang": locale
    })
  })
  const dataDoctorHospitalClinics = await resDoctorHospitalClinics.json()



  const resDoctorPackage = await fetch("https://api2.safemedigo.com/api/v1/Doctor/GetDoctorPackageBySlug  ", {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      "doctorSlug": params.slug,
      "lang": locale
    })
  })
  const dataDoctorPackage = await resDoctorPackage.json()


  return {
    props: {
      metaData,
      dataDoctorSlug,
      dataDoctorMainSpecializations,
      dataDoctorTreatments,
      dataDoctorCertificatest,
      dataDoctorLanguagesBySlug, dataDoctorMedias, dataDoctorCareer, dataDoctorEducation, dataDoctorMemberShip, dataDoctorProcedure, dataDoctorHospitalClinics, dataDoctorPackage, dataSubSpecializations, dataDoctorLeaflets,
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
        "members",
        "ivfClinic",
        "Footer",
      ])),
    },
    revalidate: 10,

  };
}
