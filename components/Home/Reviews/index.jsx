import React from 'react'
import styles from './index.module.scss'
import { Container, Rating, Typography } from '@mui/material'
import Carousel from 'react-elastic-carousel';

const Reviews = () => {

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
      <Container>
        <div className="section_container">
          <div className="text_container">
            <div className="title">
              <Typography variant='h3'>
                What Our Patients Are Saying:
              </Typography>
            </div>
            <div className="title2">
              <Typography variant='h3'>
                88%
              </Typography>
            </div>

            <div className="desc">
              <Typography>
                Of our Patients would recommend us to their friends and families.
              </Typography>
            </div>

          </div>

          <div className="slider_container"></div>
        </div>
      </Container>
    </section>
  )
}

export default Reviews