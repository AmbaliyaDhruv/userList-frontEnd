import React, { useContext, useState } from 'react' ;
import AuthContext from '../../Context/Auth/authContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';
const Login=()=>{
    const {updateInfo}=useContext(AuthContext)
    const navigate = useNavigate();
    const [error,seterror]=useState('')
    const [userData,setUserData]=useState(()=>{
        return {
            email:'',
            password:''
        }
    })

    const handleChanged=(e,id)=>{
       setUserData((prevState)=>{
        return {
            ...prevState,
            [id]:e.target.value
        }
       })
    }

    const handleSubmit=(e)=>{
    e.preventDefault()
    axios.post('http://localhost:8080/authentication/login',userData).then((res)=>{
        setUserData((prevState)=>{
            return {
                email:'',
                password:''
            } 
        })
        updateInfo(res.data.firstName)
        localStorage.setItem("UserInfo",res.data.firstName)
         navigate('/dashboard')
    }).catch(err=>{
        seterror(err.response.data)
    })

    }

    const moveToSinupPage=()=>{
        navigate('/signup')
     }

    return (
        <>
       <Card style={{border:"1px solid gainsboro",width:"40%",margin:"auto",marginTop:'100px'}}>
         {error.length?<Alert severity="error">{error}</Alert>:""}
           <CardContent >
             <form onSubmit={handleSubmit}>
                <Grid xs={12} sm={6}  item>
                <TextField id='email' type="email" value={userData.email} style={{marginTop:"20px"}}   onChange={(e)=>{handleChanged(e,'email')}} label="Email" placeholder="Enter Your Email" fullWidth variant="outlined" required/>
                 </Grid>
                  <Grid xs={12} sm={6}  item>
                <TextField type="password" value={userData.password}  style={{marginTop:"20px"}}  id='password' onChange={(e)=>{handleChanged(e,'password')}}  label="Password" placeholder="Enter your Password" fullWidth variant="outlined"  required/>
                 </Grid>
                 <Grid xs={12} sm={6} item>
                  <Button type="submit" style={{marginTop:"20px"}}  variant="contained" color="primary" fullWidth>Login</Button>
                 </Grid>
            </form>
            <h5 style={{color:'#b63f3f',cursor:'pointer',textDecoration:'underline'}} onClick={moveToSinupPage}>Create an Account</h5>
           </CardContent>
       </Card>
        </>
    )
}

export default Login