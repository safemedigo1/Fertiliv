import styles from '../../index.module.scss';
import { useRouter } from "next/router";
import Pagination from "@mui/material/Pagination";
import { Box, Container, Typography } from "@mui/material";
import { PageHeader, Tags } from "@/components";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import ExpandMoreOutlinedIcon from "@mui/icons-material/ExpandMoreOutlined";
import Link from "next/link";
import { useState } from "react";
import SecNavbar from '@/components/Navbar/SecNavbar';
import Image from 'next/image'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { motion } from 'framer-motion'

export default function BlogPage({ blogCategory, blogs, allBlogsTagsData, currentPage, totalPages }) {
  const router = useRouter();
  const [category, setCategory] = useState('All');


  const handleMyChangePage = (event, value) => {
    event.preventDefault();
    if (value === 1) {
      router.push(`/blogs/`);
    }

    router.push(`/blogs/page/${value}`)
  }

  const handleFilterChanges = (event, value) => {
    router.push(`/category/${value.props.value}/page/1`);

    // setTimeout(() => window.location.reload(), 2000);
    setCategory(value.props.value
    )



  }


  const count = blogs.count / 6;
  return (
    <>
      <SecNavbar />
      <PageHeader />
      <div id={styles.tags_filter}>
        <Container sx={{ maxWidth: "1239px" }} maxWidth={false}>
          <div className={styles.filter}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-autowidth-label">Blogs</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                IconComponent={ExpandMoreOutlinedIcon}
                label="Blogs"
                onChange={handleFilterChanges}
                style={{
                  backgroundColor: "#E7EDEC",
                  color: "#000000",
                  fontSize: "18px",
                  fontWeight: "bold",

                }}
              >


                {blogCategory.map((item) => (
                  <MenuItem value={item.slug} >
                    {item.categeryName}
                  </MenuItem>
                ))}


              </Select>
            </FormControl>
          </div>
        </Container>
      </div>
      <div className={styles.sections_container}>
        <section id={styles.blogs_sec}>
          <Container sx={{ maxWidth: "1239px" }} maxWidth={false}>
            <div className={styles.title}>
              <Typography variant="h6">Most Recent Posts</Typography>
            </div>

            <div className={styles.boxes_container}>
              {blogs?.data.map((post, idx) => (
                <>
                  <motion.a
                    animate={{ opacity: 1 }}
                    initial={{ opacity: 0 }}

                    transition={{ duration: 1, }}
                    href={`/blogs/${post.slug}`} className={styles.box} key={idx}>
                    <div className={styles.img_container}>
                      <Image
                        src={post.image}
                        alt={post.title}
                        width={344}
                        height={500}

                      />
                    </div>
                    <div className={styles.box_title}>
                      <Typography variant="h5">{post.title}</Typography>
                    </div>

                    <div className={styles.desc}>
                      <p>{post.briefContent}</p>
                    </div>

                    <div className={styles.author_container}>
                      <div className={styles.img_container}>
                        <Image
                          width={344}
                          height={500}
                          src={post?.publisherImage} alt={post.publisherName} />



                      </div>
                      <div className={styles.author_data}>
                        <div className={styles.user_name}>
                          {post.publisherName}
                        </div>
                        <div className={styles.user_job}>{post.jobTitle}</div>
                      </div>
                    </div>

                    <div className={styles.btns_container}>
                      <div className={styles.trans_btn}>
                        {post.tags.map((tag) => (
                          <>
                            <Link href={`/tags/${tag.slug}`}>
                              <button>{tag.tagName}</button>
                            </Link>
                          </>
                        ))}
                      </div>

                    </div>
                  </motion.a>
                </>
              ))}
            </div>
            <Box sx={{
              display: 'flex', alignItems: 'center', flexDirection: 'column', justifyContent: "center", marginTop: '50px',
              '& ul > li> button:not(.Mui-selected)': { color: '#004747', fontWeight: 'bold', fontSize: '14px' },
              '& ul > li> .Mui-selected': { backgroundColor: '#004747', color: '#ffffff', fontWeight: 'bold', fontSize: '18px' }
            }} className="pagination">
              <Pagination count={totalPages} page={currentPage} onChange={handleMyChangePage} />

            </Box>
          </Container>
        </section>
        {/* Tags Component */}
        <Tags allBlogsTagsData={allBlogsTagsData} />
      </div>






    </>
  );


}




export async function getStaticPaths() {
  const res = await fetch("https://api2.safemedigo.com/api/v1/Blog/GetAllBlogWithPage", {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      "lang": "en",
      "blogCategoryId": '0',
      "currentPage": '1',
    })
  })
  const data = await res.json()
  const totalProducts = data.count / 6;



  const dynamicNumber = Math.ceil(totalProducts);
  const numbersArray = Array.from({ length: dynamicNumber }, (_, index) => index + 1);
  const customLocale = ['en', 'ar', 'tr'];




  const paths = numbersArray.flatMap((number, idx) => customLocale.map((locale) => ({
    params: { slug: number.toString() },
    locale: locale,
  })))





  return {
    paths,
    fallback: 'blocking',
  };
}


export async function getStaticProps({ locale, params }) {

  const page = params.slug || '1'; // If no page is specified, default to page 1
  const limit = 6; // Number of products to display per page
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;


  const res1 = await fetch("https://api2.safemedigo.com/api/v1/BlogCategory/GetAllBlogCategoriesByLang", {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      "lang": locale,
    })
  })
  const data2 = await res1.json()

  const myCategoryId = data2.filter((c) => c.slug === params.category)

  const res = await fetch("https://api2.safemedigo.com/api/v1/Blog/GetAllBlogWithPage", {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      "lang": locale,
      "blogCategoryId": myCategoryId[0]?.id || '0',
      "currentPage": page,
    })
  })
  const data = await res.json()


  const products = data.data;
  const totalProducts = data.count;
  const totalPages = Math.ceil(totalProducts / limit);

  const allBlogTagsRes = await fetch("https://api2.safemedigo.com/api/v1/Blog/GetAllBlogsTags", {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      "lang": locale,
    })
  })

  const allBlogsTagsData = await allBlogTagsRes.json()


  return {
    props: {
      blogs: data,
      blogCategory: data2,
      products: products.slice(startIndex, endIndex),
      currentPage: parseInt(page),
      totalPages,
      allBlogsTagsData,
      ...(await serverSideTranslations(locale, ['navbar', 'sec_navbar', 'blogs_page', 'page_header_comp', 'Footer'])),
    },
    revalidate: 10,

  }
}

