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
import WhatsappBtn from "../../components/WhatsappBtn";
import { useEffect, useState } from "react";
import Blogs from "./Blogs";


export default function Home({ dataMostPopularDocs, dataReviews, blogs }) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true)
  }, [])
  if (isClient)

    return (
      <>

        <Navbar />
        <Hero />
        <WhyFertiliv />
        <Consultation />
        <IvfClinic />
        <HowItWorks />
        <Doctor />
        <DoctorsSection dataMostPopularDocs={dataMostPopularDocs} />
        <Memberships />
        <Reviews dataReviews={dataReviews} />
        <Quote />
        <WhatsappBtn />
        <Blogs dataReviews={dataReviews} blogs={blogs} />

        <Footer />



      </>
    );
}

