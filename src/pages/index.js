import Head from "next/head";
import Image from "next/image";
import styles from "@/styles/Home.module.scss";
import { Button } from "@mui/material";
import Navbar from "../../components/Navbar";
import Hero from "../../components/Home/Hero";
import WhyFertiliv from "../../components/Home/WhyFertiliv";
import Consultation from "../../components/Home/Consultation";
import IvfClinic from "../../components/Home/IvfClinic";

export default function Home() {
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
    </>
  );
}
