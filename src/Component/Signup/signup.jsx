import React, { useContext, useState } from 'react' ;
import AuthContext from '../../Context/Auth/authContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
const Signup=()=>{
    const {updateInfo}=useContext(AuthContext)
    const navigate=useNavigate()
    const [userData,setUserData]=useState(()=>{
        return {
            firstName:'',
            lastName:'',
            email:'',
            password:''
        }
    })

    const handleChanged=(e,id)=>{
        setUserData((prevState=>{
            return {
                ...prevState,
                [id]:e.target.value
            }
        }))
    }

    const handleSubmit=(e)=>{
        e.preventDefault()
        axios.post('http://localhost:8080/authentication/signup',userData).then(res=>{
            setUserData({
                    firstName:'',
                    lastName:'',
                    email:'',
                    password:''
                })
            navigate('/dashboard')
            updateInfo(res.data.firstName)
            localStorage.setItem("UserInfo",res.data.firstName)
        }).catch(err=>{
            console.log(err)
        })
     }
     const moveToLoginPage=()=>{
        navigate('/')
     }
  return (
    <>
          <Card style={{ border: "1px solid gainsboro", width: "40%", margin: "auto",marginTop:'100px' }}>

              <CardContent >
                  <form onSubmit={handleSubmit}>
                      <Grid xs={12} sm={6} item>
                          <TextField id='firstName' type="text" value={userData.firstName} style={{ marginTop: "20px" }} onChange={(e) => handleChanged(e, 'firstName')} label="First Name" placeholder="Enter Your First Name" fullWidth variant="outlined" required />
                      </Grid>
                      <Grid xs={12} sm={6} item>
                          <TextField type="text" value={userData.lastName} style={{ marginTop: "20px" }} id='lastName' onChange={(e) => handleChanged(e, 'lastName')} label="Last Name" placeholder="Enter your Last Name" fullWidth variant="outlined" required />
                      </Grid>
                      <Grid xs={12} sm={6} item>
                          <TextField type="email" value={userData.email} style={{ marginTop: "20px" }} id='email' onChange={(e) => handleChanged(e, 'email')} label="Email" placeholder="Enter your Email Id" fullWidth variant="outlined" required />
                      </Grid>
                      <Grid xs={12} sm={6} item>
                          <TextField type="password" value={userData.password} style={{ marginTop: "20px" }} id='password' onChange={(e) => handleChanged(e, 'password')} label="Password" placeholder="Enter your Password" fullWidth variant="outlined" required />
                      </Grid>
                      <Grid xs={12} sm={6} item>
                          <Button type="submit" style={{ marginTop: "20px" }} variant="contained" color="primary" fullWidth>Singup</Button>
                      </Grid>
                  </form>
                  <h5 style={{color:'#b63f3f',cursor:'pointer',textDecoration:'underline'}} onClick={moveToLoginPage}>Log With Email</h5>
              </CardContent>

          </Card>
    </>
  )
}

export default Signup
