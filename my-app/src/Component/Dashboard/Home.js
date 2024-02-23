import React, { useEffect } from 'react'
import Navbar from '../Navbar'
import { useNavigate } from 'react-router-dom'
import UploadImage from './UploadImage'

function Home() {
  

  const nevigate=useNavigate()
  useEffect(()=>{
    const token=localStorage.getItem('section_token')
    if(!token){
      nevigate('/')
    }
  },[])
  return (
    <div>
      <Navbar />
      <UploadImage/>
    </div>
  )
}

export default Home