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


const Dashboard = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [allBlogs, setAllBlogs] = useState(null);

  const [saveBlog, setSaveBlog] = useState(false);
  const [selectedInput, setSelectedInput] = useState(null)

  const { step, setStep } = useContext(MyContext);

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const handleDateChange = (event) => {
    setDate(event.target.value);
  };


  const handleSubmit = (event) => {
    event.preventDefault();

    // Create an object to hold the blog data
    const blogData = {
      title: title,
      description: description,
      date: date
    };

    // Send the blogData object to your API
    // You can use fetch or any other library for making the API request
    // Example using fetch:
    if (title && description && date) {
      console.log('true')
    } else {
      console.log("FALSE")
    }
    fetch('/api/createBlog', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(blogData)
    })
      .then((response) => response.json())
      .then((data) => {
        // Handle the API response if needed
        console.log(data);
      })
      .catch((error) => {
        // Handle any errors
        console.error('Error:', error);
      });
  };


  useEffect(() => {

    fetch("http://localhost:3000/api/getBlogs")
      .then((response) => response.json())
      .then((data) => {

        const jsonData = JSON.parse(data); // Parse the text as JSON
        setAllBlogs(jsonData); // The parsed JSON data

      })
      .catch((error) => {
        console.error("Error:", error);
      });

  }, [])





  const columns = [
    { field: 'id', headerName: 'id', width: 70 },
    { field: 'title', headerName: 'Blog title', width: 160 },
    { field: 'date', headerName: 'Date', width: 160 },
    {
      field: 'age',
      headerName: 'Age',
      type: 'number',
      width: 160,
    },
    {
      field: 'fullName',
      headerName: 'Full name',
      description: 'This column has a value getter and is not sortable.',
      sortable: false,
      width: 160,
      valueGetter: (params) =>
        `${params.row.title || ''} ${params.row.date || ''}`,
    },
  ];

  const rows = [
    { id: 1, date: 'Snow', title: 'Jon', age: 35 },
    { id: 2, date: 'Lannister', title: 'Cersei', age: 42 },
    { id: 3, date: 'Lannister', title: 'Jaime', age: 45 },
    { id: 4, date: 'Stark', title: 'Arya', age: 16 },
    { id: 5, date: 'Targaryen', title: 'Daenerys', age: null },
    { id: 6, date: 'Melisandre', title: null, age: 150 },
    { id: 7, date: 'Clifford', title: 'Ferrara', age: 44 },
    { id: 8, date: 'Frances', title: 'Rossini', age: 36 },
    { id: 9, date: 'Roxie', title: 'Harvey', age: 65 },
  ];


  const handleRowClick = (params) => {
    setSelectedInput(params.row); // Log the clicked row object to the console
    setSaveBlog(true)
    // setStep(5)
  };

  console.log(selectedInput)
  return (
    <>
      <Navbar />
      <Container>

        {step === 2 &&
          <>
            {
              saveBlog != true &&
              <section id='dashboard' className={styles.dashboard}>
                <div className={styles.blogs_card}>
                  <div className={styles.title}>
                    <Typography variant='h3'>Blogs Count (4)</Typography>
                  </div>
                  <form action="">


                    <div className={styles.blog_title}>
                      <label>Title:</label>
                      <input type="text" value={title} onChange={handleTitleChange} />
                    </div>

                    <div className={styles.blog_desc}>
                      <label>Description:</label>
                      <textarea value={description} onChange={handleDescriptionChange} />
                    </div>

                    <div className={styles.blog_date}>
                      <label>Date:</label>
                      <input type="date" value={date} onChange={handleDateChange} />
                    </div>


                    <div className={styles.submit_btn} >
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

            }

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
              <section id='dashboard' className={styles.dashboard}>
                <div className={styles.blogs_card}>
                  <div className={styles.title}>
                    <Typography variant='h3'>Selected Blog: {selectedInput.title}</Typography>
                  </div>
                  <form action="">


                    <div className={styles.blog_title}>
                      <label>Title:</label>
                      <input type="text" value={selectedInput.title} onChange={handleTitleChange} />
                    </div>

                    <div className={styles.blog_desc}>
                      <label>Description:</label>
                      <textarea value={selectedInput.description} onChange={handleDescriptionChange} />
                    </div>

                    <div className={styles.blog_date}>
                      <label>Date:</label>
                      <input type="date" value={selectedInput.date} onChange={handleDateChange} />
                    </div>

                    {console.log(selectedInput, "HERE")}

                    <div className={styles.submit_btn} >
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
                          : "Save blog Changes"

                        }
                      </Button>
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