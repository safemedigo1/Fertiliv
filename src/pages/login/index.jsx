import React, { useState } from 'react'
import { Button, Container, Typography } from '@mui/material';
import Navbar from '../../../components/Navbar';
import { useRouter } from 'next/router';
import { ThreeDots } from 'react-loader-spinner'

const Login = () => {
  const username = 'Majed@gmail.com';
  const password = 'P@ssw0rd';
  const [usernameValues, setUsernameValues] = useState('');
  const [passwordValues, setPasswordValues] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  const handleUsernameChange = (event) => {
    setUsernameValues(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPasswordValues(event.target.value);
  };

  const handleSubmit = () => {
    setIsLoading(true)
    if (username === usernameValues && password === passwordValues) {
      router.push('/dashboard')
      setIsLoading(false)
    } else {
      setIsLoading(false)
    }
  }

  return (
    <>
      <Navbar />
      <Container>
        <section id='login' className={styles.login}>
          <div className={styles.login_card}>
            <div className={styles.title}>
              <Typography variant='h3'>Login</Typography>
            </div>
            <form action="">

              <div className={styles.username}>
                <input type="text" placeholder='Username' name='username' onChange={handleUsernameChange} />
              </div>

              <div className={styles.password}>
                <input type="password" placeholder='Password' name='password' onChange={handlePasswordChange} />
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
                    : "Submit"

                  }
                </Button>
              </div>

            </form>
          </div>
        </section>
      </Container>
    </>

  )
}

export default Login