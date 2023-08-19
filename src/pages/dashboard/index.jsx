import React, { useEffect, useState, useContext } from 'react'
import Navbar from '../../../components/Navbar'
import styles from './index.module.scss'
import { Button, Container, Typography } from '@mui/material'
import axios from 'axios'
import Login from '../../../components/Login'
import { MyContext } from '../../../context/MyContext'
import { DataGrid } from '@mui/x-data-grid';
import { ConstructionOutlined } from '@mui/icons-material'
import { ThreeDots } from 'react-loader-spinner'
import { useRouter } from 'next/router'
import Image from 'next/image'

// import myIMG from '../../../uploads/1692394903746-elshenawy3.png'

const Dashboard = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [image, setImage] = useState(null);

  const [updatedImage, setUpdatedImage] = useState(null);
  const [updatedSelectedFile, setUpdatedSelectedFile] = useState(null)

  const [updatedTitle, setUpdatedTitle] = useState('');
  const [updatedDescription, setUpdatedDescription] = useState('');
  const [updatedDate, setUpdatedDate] = useState('');


  const [allBlogs, setAllBlogs] = useState("");

  const [saveBlog, setSaveBlog] = useState(false);
  const [selectedInput, setSelectedInput] = useState(null)
  const [selectedFile, setSelectedFile] = useState()


  const { step, setStep } = useContext(MyContext);

  const router = useRouter()



  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const handleDateChange = (event) => {
    setDate(event.target.value);
  };


  // Updated
  const handleUpdatedTitleChange = (event) => {
    setUpdatedTitle(event.target.value);
    setSelectedInput({ ...selectedInput, title: event.target.value });

  };

  const handleUpdatedDescriptionChange = (event) => {
    setUpdatedDescription(event.target.value);
    setSelectedInput({ ...selectedInput, description: event.target.value });

  };

  const handleUpdatedDateChange = (event) => {
    setUpdatedDate(event.target.value);
    setSelectedInput({ ...selectedInput, date: event.target.value });
  };




  const handleUpdate = async () => {
    try {
      const response = await axios.put("/api/updateBlog", { id: selectedInput.id, date: updatedDate, description: updatedDescription, title: updatedTitle, image: updatedImage });
      console.log(response.data.message);
      getALLBlogs();
      router.push('#blogs')

    } catch (error) {
      console.log("Error updating blog");
    }

    console.log(selectedInput)
  };


  const handleDelete = async () => {

    try {
      const response = await axios.delete(`/api/deleteBlog?id=${selectedInput.id}`);
      console.log(response.data.message);
      // getALLBlogs()
      router.push('#blogs')
    } catch (error) {
      console.log("Error deleting blog");
    }
  };


  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.set('title', title);
    formData.set('description', description);
    formData.set('date', date);
    formData.set('image', image);
    formData.set('file', selectedFile);

    try {
      const response = await fetch('/api/createBlog', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        console.log('Blog created successfully');
        // Reset form fields
        getALLBlogs()
        setTitle('');
        setDescription('');
        setDate('');
        setImage(null);
      } else {
        console.error('Failed to create blog');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };




  useEffect(() => {

    getALLBlogs()

  }, [])


  const getALLBlogs = async () => {

    await fetch("/api/getBlogs")
      .then((response) => response.json())
      .then((data) => {
        console.log(data, "DATA")

        // const jsonData = JSON.parse(data); // Parse the text as JSON
        setAllBlogs(data); // The parsed JSON data
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }

  const columns = [
    { field: 'id', headerName: 'id', width: 70 },
    { field: 'title', headerName: 'Blog title', width: 160 },
    { field: 'date', headerName: 'Date', width: 160 },

    // {
    //   field: 'fullName',
    //   headerName: 'Full name',
    //   description: 'This column has a value getter and is not sortable.',
    //   sortable: false,
    //   width: 160,
    //   valueGetter: (params) =>
    //     `${params.row.title || ''} ${params.row.date || ''}`,
    // },
  ];

  const rows = allBlogs;

  const handleRowClick = (params) => {
    setSelectedInput(params.row); // Log the clicked row object to the console
    setSaveBlog(true);
    router.push('#control')

    // setStep(5)
  };
  return (
    <>
      <Navbar />
      <Container>

        {step === 2 &&
          <>
            <section id='dashboard' className={styles.dashboard}>
              <div className={styles.blogs_card}>
                <div className={styles.title}>
                  <Typography variant='h3'>Blogs Count (4)</Typography>
                </div>
                <form action="">

                  <div className={styles.blog_title}>
                    <label>Title:</label>
                    <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
                  </div>

                  <div className={styles.blog_desc}>
                    <label>Description:</label>
                    <textarea value={description} onChange={handleDescriptionChange} />
                  </div>

                  <div className={styles.blog_date}>
                    <label>Date:</label>
                    <input type="date" value={date} onChange={handleDateChange} />
                  </div>


                  <div className={styles.upload_container}>
                    <label for="image">{image === null && "Upload image"}</label>
                    <input type="file"
                      id="image"
                      onChange={({ target }) => {
                        if (target.files) {
                          const file = target.files[0];
                          setImage(URL.createObjectURL(file));
                          setSelectedFile(file)
                        }
                      }}
                      accept="image/*"
                      required
                      hidden
                    />

                    {image &&
                      <div className={styles.img_container}>
                        <Image width={250} height={250} src={image} alt="" />
                      </div>
                    }
                  </div>

                  <div className={styles.submit_btn} onClick={handleSubmit}>
                    <Button>
                      {isLoading ?
                        <ThreeDots
                          height="25"
                          width="25"
                          radius="9"
                          color="#707070"
                          ariaLabel="three-dots-loading"
                          wrapperStyle={{}}
                          wrapperClassName="load_more_btn"
                          visible={true}
                        />
                        : "Add blog"

                      }
                    </Button>
                  </div>

                </form>



              </div>
            </section>


            <section id='blogs' className={styles.blogs}>
              <Container>
                <div className={styles.blogs_container}>
                  <div style={{ height: 400, width: '100%' }}>
                    <DataGrid
                      rows={rows}
                      columns={columns}
                      initialState={{
                        pagination: {
                          paginationModel: { page: 0, pageSize: 5 },
                        },
                      }}
                      pageSizeOptions={[5, 10]}

                      sx={{ color: '#1b0968', fontSize: '17px' }}

                      onRowClick={handleRowClick}
                    />
                  </div>
                </div>
              </Container>
            </section>



            {
              saveBlog &&
              <section id='control' className={styles.control}>
                <div className={styles.blogs_card}>
                  <div className={styles.title}>
                    <Typography variant='h3'>Selected Blog: {selectedInput.title}</Typography>
                  </div>
                  <form action="">


                    <div className={styles.blog_title}>
                      <label>Title:</label>
                      <input type="text" value={selectedInput.title} onChange={handleUpdatedTitleChange} />
                    </div>

                    <div className={styles.blog_desc}>
                      <label>Description:</label>
                      <textarea value={selectedInput.description} onChange={handleUpdatedDescriptionChange} />
                    </div>

                    <div className={styles.blog_date}>
                      <label>Date:</label>
                      <input type="date" value={selectedInput.date} onChange={handleUpdatedDateChange} />
                    </div>


                    <div className={styles.upload_container}>
                      <label for="image">Chose image</label>
                      <input type="file"
                        id="image"
                        onChange={({ target }) => {
                          if (target.files) {
                            const file = target.files[0];
                            setUpdatedImage(URL.createObjectURL(file));
                            setUpdatedSelectedFile(file)
                          }
                        }}
                        accept="image/*"
                        required
                        hidden
                      />
                      {selectedInput?.image && updatedImage === null &&
                        <div className={styles.img_container}>
                          <img src={`${selectedInput.image}`} alt={selectedInput.title} />
                        </div>
                      }

                      {updatedImage !== null &&
                        <div className={styles.img_container}>
                          <img src={`${updatedImage}`} alt={selectedInput.title} />
                        </div>
                      }



                    </div>


                    <div className={styles.submit_btn}>
                      <Button onClick={handleUpdate}>
                        {isLoading ?
                          <ThreeDots
                            height="25"
                            width="25"
                            radius="9"
                            color="#707070"
                            ariaLabel="three-dots-loading"
                            wrapperStyle={{}}
                            wrapperClassName="load_more_btn"
                            visible={true}
                          />
                          : "Save blog "

                        }
                      </Button>
                      <Button onClick={handleDelete}>
                        {isLoading ?
                          <ThreeDots
                            height="25"
                            width="25"
                            radius="9"
                            color="#707070"
                            ariaLabel="three-dots-loading"
                            wrapperStyle={{}}
                            wrapperClassName="load_more_btn"
                            visible={true}
                          />
                          : "Delete blog "

                        }
                      </Button>
                    </div>

                  </form>



                </div>
              </section>

            }
          </>

        }
        {step === 1 &&
          <Login />
        }



      </Container>
    </>
  )
}

export default Dashboard