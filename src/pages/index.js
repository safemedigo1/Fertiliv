import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.scss";
import { Button } from "@mui/material";
import Navbar from "../../components/Navbar";
import Hero from "../../components/Home/Hero";
import WhyFertiliv from "../../components/Home/WhyFertiliv";
import Consultation from "../../components/Home/Consultation";
import IvfClinic from "../../components/Home/IvfClinic";
import HowItWorks from "../../components/Home/HowItWorks";
import Doctor from "../../components/Home/Doctor";
import Memberships from "../../components/Home/Memberships";
import Reviews from "../../components/Home/Reviews";
import Quote from "../../components/Home/Quote";
import Footer from "../../components/Footer";
import DoctorsSection from "../../components/Home/DoctorsSection";

export default function Home({ popularDoctors }) {
  console.log(popularDoctors, "popularDoctors");
  return (
    <>
      <Head>
        <title>Fertiliv</title>
        <meta name="description" content="Fertiliv" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar />
      <Hero />
      <WhyFertiliv />
      <Consultation />
      <IvfClinic />
      <HowItWorks />
      <Doctor />
      <DoctorsSection popularDoctors={popularDoctors} />

      <Memberships />
      <Reviews />
      <Quote />
      <Footer />
    </>
  );
}

export async function getStaticProps() {
  // Fetch data from the API
  const url = "https://api2.safemedigo.com/api/v1/Doctor/ListPopularDoctors";
  const lang = "en";
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      lang,
    }),
  });

  if (!response.ok) {
    console.error("Failed to fetch data from the API");
    return {
      notFound: true,
    };
  }

  const popularDoctors = await response.json();

  return {
    props: {
      popularDoctors,
    },
    revalidate: 10,
  };
}
