import React from 'react'
import imgs from '../../../assets/constants/imgs'
import styles from './index.module.scss'
import { Button, Container, Typography } from '@mui/material'
import Image from 'next/image'
import Link from 'next/link'
import Carousel from '@itseasy21/react-elastic-carousel';
import { consts } from '@itseasy21/react-elastic-carousel';
import { useState } from 'react'
import { IoIosArrowForward, IoIosArrowBack } from 'react-icons/io';

const HowItWorks = () => {
  const { Planning,
    Stimulation,
    Collection,
    Laboratory,
    Transfer, } = imgs;


  const [breakPoints] = useState([
    { width: 1, itemsToShow: 2, },
    { width: 550, itemsToShow: 3, },
    { width: 850, itemsToShow: 3 },
    { width: 1150, itemsToShow: 4, },
    { width: 1450, itemsToShow: 5 },
    { width: 1750, itemsToShow: 6, },


  ])
  // Change Arrow in react-elastic-carousel Lirbrary
  function myArrow({ type, onClick, isEdge }) {
    const pointer = type === consts.PREV ?
      <div className='left_arrow'>
        <IoIosArrowBack />
      </div>

      :
      <div className='right_arrow'>
        <  IoIosArrowForward />
      </div>

      ;

    return (
      <button className='main_btn' onClick={onClick} disabled={isEdge}>
        {pointer}
      </button>
    );
  }

  const steps = [
    { icon: Planning, title: 'Planning', desc: 'Discuss with our specialists the reasons of your infertility and treatment options after initial consultation and tests (online or in person)' },
    { icon: Stimulation, title: 'Stimulation', desc: 'The ovaries are stimulated with medication and the development of the eggs is monitored with ultrasound over several visits' },
    { icon: Collection, title: 'Collection', desc: 'Collecting eggs under anesthesia by ultrasound while collecting sperm from the husband via ejaculation or performing TESA/PESA then give them all to embryology lab.' },
    { icon: Laboratory, title: 'Laboratory', desc: 'In our state-of-the-art lab, our embryologists collect and inject a single sperm into your eggs using ICSI, ensuring precise fertilization and increasing your chances of success.' },
    { icon: Transfer, title: 'Transfer', desc: "Three to five days after fertilization, the healthy embryos will be transferred to your uterus. And two weeks later, a simple blood test will confirm if you're on the path to starting a family." },
  ]
  return (
    <section id='HowItWorks' className={styles.HowItWorks}>
      <Container>
        <div className={styles.title}>
          <Typography variant='h3'>How IVF Works! </Typography>
        </div>

        <div className={styles.desc}>
          <Typography >Our modern IVF method brings your dream of having a family to life </Typography>

        </div>

        <div className={styles.steps_container}>
          {steps.map((step, idx) =>
            <div key={idx} className={styles.step_box}>
              <div className={styles.icon_container}>
                <Image src={step.icon} alt={step.title} />
              </div>

              <div className={styles.title}>
                <Typography variant='h4'>
                  {step.title}
                </Typography>
              </div>


              <div className={styles.desc}>
                <Typography>{step.desc}</Typography>
              </div>

            </div>

          )}
        </div>

        <div className={styles.steps_container_mob}>
          <Carousel renderArrow={myArrow}
            breakPoints={breakPoints} pagination={false}>

            {steps.map((step, idx) =>
              <div key={idx} className={styles.step_box} >
                <div className={styles.icon_container}>
                  <Image src={step.icon} alt={step.title} />
                </div>

                <div className={styles.title}>
                  <Typography variant='h4'>
                    {step.title}
                  </Typography>
                </div>


                <div className={styles.desc}>
                  <Typography>{step.desc}</Typography>
                </div>

              </div>

            )}

          </Carousel>

        </div>

        <div className={styles.stepBtn}>
          <Button>
            <Link href='/'>Take The First Step!</Link>
          </Button>
        </div>
      </Container>
    </section >
  )
}

export default HowItWorks



