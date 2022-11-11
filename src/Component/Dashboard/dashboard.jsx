import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react' ;
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';
import { TextField } from '@mui/material';
const DashBoard=()=>{
    const [data,setData]=useState(()=>{
        return []
    })
    const [page,setPage]=useState(()=>{
        return 1
    })
    const [sorting,setSorting]=useState('')
    const [search,setSearch]=useState('')
    const totalPage=useRef(0)
    const displayData=useRef([])

    const calTotalPage=(data)=>{
        return Math.ceil(data/20)
    }
  
    const handlePagination=(action)=>{
       if(action==='prev'){
          if(page===1){
            return 
          }else{
            setPage(prevPage=>{
               setArraylist(prevPage-1,data)
               return prevPage-1
            })
         
          }
       }else{
        if(page===totalPage.current){
            return 
        }else{
            setPage(prevPage=>{
               setArraylist(prevPage+1,data) 
               return prevPage+1
            })
            
        }
       }
    }
   
   useEffect(()=>{
      axios.get('https://userlistadrixus.herokuapp.com/dashboard').then((res)=>{
          totalPage.current=calTotalPage(res.data.length)
          setData(res.data)
          setArraylist(page,res.data)
         
      }).catch(err=>{
        console.log(err)
      })
       // eslint-disable-next-line
    },[])

    const setArraylist=(page,data)=>{
        displayData.current=data.slice((10*(page-1)),(10*page))
    }


    const handleChange=(e,mode)=>{
      if(mode==='search'){
        setArraylist(page,data)
        if(e.target.value.length){
          displayData.current=displayData.current.filter((ele)=>{
           return ele.first_name.toLowerCase().includes(e.target.value.toLowerCase())
          })
        }
        setSearch(e.target.value)
      }else{
        if(e.target.value==='asce'){
          displayData.current.sort((a , b) =>(a.first_name).localeCompare((b.first_name)));
        }else{
         displayData.current.sort((a , b) =>(b.first_name).localeCompare((a.first_name)));
        }
        setSorting(e.target.value)
      }
    }


    return (
        <>
       

    <TableContainer component={Paper} sx={{boxShadow:'none'}}>
    <Box sx={{ minWidth: 650,width:'80%',margin:'auto',gap:'40px',display:'flex',marginTop: '30px'}}>
         <FormControl sx={{width:'100px'}}>
        <InputLabel id="demo-simple-select-label">Sort</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={sorting}
          label="Sort"
          onChange={handleChange}
        >
          <MenuItem value={'asce'}>Asce</MenuItem>
          <MenuItem value={'desc'}>Desc</MenuItem>
        </Select>
      </FormControl>
        <TextField id='email' type="email" style={{width:'180px'}} value={search} label="Search" onChange={(e)=>handleChange(e,'search')} placeholder="Find Name"  variant="outlined" />
       </Box>
      <Table sx={{ minWidth: 650,width:'80%',margin:'auto',marginTop: '20px',border:'1px solid gainsboro'}} aria-label="simple table">
        <TableHead sx={{backgroundColor:'gainsboro'}}>
          <TableRow>
            <TableCell>First Name</TableCell>
            <TableCell>Last Name</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Gender</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {displayData.current.map((row) => (
            <TableRow
              key={row._id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell>{row.first_name}</TableCell>
              <TableCell>{row.last_name}</TableCell>
              <TableCell>{row.email}</TableCell>
              <TableCell>{row.gender}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
            <Button onClick={() => { handlePagination('prev') }} style={{ marginTop: "20px" }} variant="contained" color="primary">PREV</Button>
          <spen style={{ padding: '20px',fontSize: '18px',fontWeight: 600}}>
            {page} of {totalPage.current}
          </spen>
            <Button onClick={() => { handlePagination('next') }} style={{ marginTop: "20px" }} variant="contained" color="primary">NEXT</Button>  
        </>
    )
}

export default DashBoard