import React from 'react'
import styles from './index.module.scss'
import imgs from '../../../assets/constants/imgs';
import { Button, Container, Typography } from '@mui/material';
import Image from 'next/image';
import Link from 'next/link';
const Doctor = () => {
  const { doctor } = imgs;

  return (
    <section id='doctor' className={styles.doctor}>
      <Container>
        <div className={styles.card}>

          <div className={styles.title}>
            <Typography variant='h3'>Who Is Doctor Nilay?</Typography>
          </div>

          <div className={styles.desc}>
            <Typography><span>Dr. Nilay Karaca</span>, MD, has over 28 years of experience in obstetrics and gynecology, including deep expertise in IVF. She provides patients with a highly personalized approach, tailoring therapies to not only obtain a high chance of positive pregnancy results but to also be healthy, particularly for patients who have previously unsuccessful reproductive treatments.</Typography>
          </div>


          <div className={styles.img_container}>
            <Image src={doctor} alt="Doctor Nilay" />
          </div>



          <div className={styles.title2}>
            <Typography variant='h3'>A Pioneer In IVF Treatment</Typography>
          </div>

          <div className={styles.desc}>
            <Typography>Dr. Nilay’s groundbreaking research and treatment has provided hope for patients whose sperms are deformed due to genetic issues, preventing fertilization. With her innovative approach, Dr. Nilay has successfully treated these conditions and given patients the chance to start a family <span>– a first in the world!</span></Typography>
          </div>


          <div className={styles.docBtn}>
            <Button>
              <Link href='/'>Ask a question</Link>
            </Button>
          </div>

        </div>
      </Container>
    </section>
  )
}

export default Doctor