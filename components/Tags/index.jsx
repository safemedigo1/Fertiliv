import { Container, Typography } from "@mui/material";
import Link from 'next/link';
import React, { useEffect, useState } from 'react'
import styles from './index.module.scss'

import { useTranslation } from "react-i18next";
import { useRouter } from "next/router";




const Tags = ({ blog, allBlogsTagsData }) => {
  const { t } = useTranslation();
  const router = useRouter();


  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  return (
    <>


      <section id={styles.tags} dir={`${router.locale === 'ar' ? 'rtl' : 'ltr'}`}>
        {isClient &&
          <Container sx={{ maxWidth: "1239px" }} maxWidth={false}>
            <div className={styles.title}>
              <Typography variant="h6">{t('blogs_page:tags_title')}</Typography>
            </div>

            <div className={styles.tags_container}>


              {allBlogsTagsData?.map((tag, idx) => (
                <>
                  {/* {tag?.tags.map((innerTag, index) => (
                    <>
                      {innerTag?.slug !== '' &&

                        <div className={styles.tag} key={index}>
                          <Link href={`/tags/${innerTag.slug}`}>
                            <button className={`${innerTag.slug === router.query.slug ? styles.active : ''}`}>{innerTag?.tagName}</button>
                          </Link>
                        </div>}
                    </>


                  )
                  )} */}
                  <>
                    {tag?.slug !== '' &&
                      <div className={styles.tag} key={idx}>
                        <Link href={`/tags/${tag.slug}`}>
                          <button className={`${tag.slug === router.query.slug ? styles.active : ''}`}>{tag.tagName}</button>
                        </Link>
                      </div>
                    }
                  </>


                  {/* {tag?.tags?.[0]?.slug !== '' && (
                    <div className={styles.tag} key={idx}>
                      <Link href={`/tags/${tag.tags[0].slug}`}>
                        <button
                          className={`${tag.tags[0].slug === router.query.slug ? styles.active : ''
                            }`}
                        >
                          {tag.tags[0]?.tagName}
                        </button>
                      </Link>
                    </div>
                  )} */}
                </>
              ))}
            </div>
          </Container >
        }

      </section>
    </>

  )
}

export default Tags
