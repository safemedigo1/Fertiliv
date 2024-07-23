import React, { useState } from 'react'
import styles from './index.module.scss'
import { Container, Rating, Typography, } from '@mui/material'
import Carousel from '@itseasy21/react-elastic-carousel';
import { IoIosArrowForward, IoIosArrowBack } from 'react-icons/io';
import { consts } from '@itseasy21/react-elastic-carousel';
import imgs from '../../../assets/constants/imgs';
import Image from 'next/image';

const Reviews = () => {
  const { verified } = imgs;
  const [breakPoints] = useState([
    { width: 1, itemsToShow: 1.4, showArrows: false, pagination: true },
    { width: 550, itemsToShow: 3, },
    { width: 850, itemsToShow: 2.5 },
    { width: 1150, itemsToShow: 4, },
    { width: 1450, itemsToShow: 5 },
    { width: 1750, itemsToShow: 6, },
  ]);

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

  const cards = [
    { name: 'Majd Khaled', starsCount: 4, desc: "There are turning points in a person's life, it was like that for me when we met my dear Doctor Nilay. He has a special place in my life not only because he helped my daughter, but also with his smiling face, sweet language, full belief that I will have a baby, with his attitude ithout getting nervous like a classical doctor when I go to him.", date: '3 months' },
    { name: 'Majd Khaled', starsCount: 4, desc: "There are turning points in a person's life, it was like that for me when we met my dear Doctor Nilay. He has a special place in my life not only because he helped my daughter, but also with his smiling face, sweet language, full belief that I will have a baby, with his attitude ithout getting nervous like a classical doctor when I go to him.", date: '3 months' },
    { name: 'Majd Khaled', starsCount: 4, desc: "There are turning points in a person's life, it was like that for me when we met my dear Doctor Nilay. He has a special place in my life not only because he helped my daughter, but also with his smiling face, sweet language, full belief that I will have a baby, with his attitude ithout getting nervous like a classical doctor when I go to him.", date: '3 months' },
    { name: 'Majd Khaled', starsCount: 4, desc: "There are turning points in a person's life, it was like that for me when we met my dear Doctor Nilay. He has a special place in my life not only because he helped my daughter, but also with his smiling face, sweet language, full belief that I will have a baby, with his attitude ithout getting nervous like a classical doctor when I go to him.", date: '3 months' },
    { name: 'Majd Khaled', starsCount: 4, desc: "There are turning points in a person's life, it was like that for me when we met my dear Doctor Nilay. He has a special place in my life not only because he helped my daughter, but also with his smiling face, sweet language, full belief that I will have a baby, with his attitude ithout getting nervous like a classical doctor when I go to him.", date: '3 months' },
    { name: 'Majd Khaled', starsCount: 4, desc: "There are turning points in a person's life, it was like that for me when we met my dear Doctor Nilay. He has a special place in my life not only because he helped my daughter, but also with his smiling face, sweet language, full belief that I will have a baby, with his attitude ithout getting nervous like a classical doctor when I go to him.", date: '3 months' },
  ]

  return (
    <section id='reviews' className={styles.reviews}>
      <Container >
        <div className={styles.section_container}>
          <div className={styles.text_container}>
            <div className={styles.title}>
              <Typography variant='h3'>
                What Our Patients Are Saying:

              </Typography>
            </div>
            <div className={styles.title2}>
              <Typography variant='h3'>
                88%
              </Typography>
            </div>

            <div className={styles.desc}>
              <Typography>
                Of our Patients would recommend us to their friends and families.

              </Typography>
            </div>

          </div>

          <div className={styles.slider_container}>
            <Carousel renderArrow={myArrow}
              pagination={false}
              breakPoints={breakPoints}>
              {cards.map((card, idx) =>
                <div className={styles.box} key={idx}>
                  <div className={styles.author}>
                    <Typography>{card.name}</Typography>
                    <div className={styles.icon_container}>
                      <Image src={verified} alt={card.name} />
                    </div>
                  </div>
                  <div className={styles.date}><Typography>{card.date}</Typography></div>
                  <div className={styles.rate}>
                    <Rating name="read-only" value={card.starsCount} readOnly />
                  </div>

                  <div className={styles.desc}><Typography>{card.desc}</Typography></div>



                  <Typography>Read more...</Typography>
                </div>
              )}
            </Carousel>
          </div>
        </div>
      </Container>

    </section>
  )
}

export default Reviews