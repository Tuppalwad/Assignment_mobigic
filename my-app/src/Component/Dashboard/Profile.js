import React, { useState, useEffect } from 'react'
import Navbar from '../Navbar'
import { username } from '../../Services/authoService'
import { imaglist, imageurl,removeimage } from '../../Services/imageservices'
import { useNavigate } from 'react-router-dom'
import {  toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function Profile() {
    const token = localStorage.getItem('section_token')
    const [user, setUser] = useState("")
    const [imagelists, setImagelist] = useState([{}])
    const successNotify = (msg) => toast.success(msg);
    const errorNotify = (msg) => toast.error(msg);
    const [refresh, setRefresh] = useState(false)
    const nevigate = useNavigate()
    useEffect(() => {
        username(token).then((res) => {
            console.log(res)
            if (res.status === 200) {
                setUser(res.user)
            }
            else {
                nevigate('/')
            }
        })
        imaglist(token).then((res) => {
            const urls = []
            if (res.status === 200) {
                res.images.map((image, index) => {
                    imageurl(image.imageID).then((url) => {
                        urls.push({url:url.href,id:image.imageID,code:image.imagecode})
                    })
                })
                setImagelist(urls)
            }
            else {
                nevigate('/')
            }
        })
    }, [refresh])

    const handleRemove=(id)=>{
       const ask = window.confirm("Are you sure you want to delete this image?")
       if(ask){
        removeimage(token,id).then((res)=>{
            if(res.status===200){
                successNotify("Image Deleted")
                setRefresh(!refresh)
            }
            else{
                errorNotify("Image Not Deleted" )   }
        })
       }
    }
   

    const handelDownload=(id ,imagecode)=>{
        imageurl(id).then((res)=>{
            if(res){
            const code = prompt("Enter 6 digit code to download image")
            console.log(code)
            if(code){
                if(code.length===6 && code===imagecode){
                    window.open(res.href)
                }
                else{
                    errorNotify("Invalid Code")
                }
            }
            else{
                errorNotify("Download Failed")

            }
        }
        })
    }


    return (
        <>
            <Navbar />
            <div className='container'>
                <div className='my-4'>
                    <h3>
                        Welcome to your profile {user}
                    </h3>

                </div>

                <div className='my-4'><h1>Your Images </h1></div>
                <div className='row'>
                    {
                        imagelists.length > 0 ? imagelists.map((image, index) => {

                            return (
                                    <div className='col-md-3' key={index}>

                                    <div className="card shadow-lg p-3 mb-5 bg-white rounded"
                                        
                                    >   
                                    <div className='card-header text-center'>
                                        <h5>{image.code}</h5>
                                    </div>
                                        <img
                                            src={image.url }
                                            alt='img' className='img-fluid  mx-auto d-block'
                                            style={{ height: '200px', width: '200px',padding:'10px' }}
                                        />
                                        <div className="card-body d-flex ">
                                            <button className="btn btn-primary mr-3"
                                            onClick={()=>{handelDownload(image.id, image.code)}}
                                                
                                            >Download</button>
                                            <button className="btn btn-danger ms-4"
                                            onClick={()=>{handleRemove(image.id)}
                                            }
                                            >Delete</button>
                                        </div>

                                    </div>
                                </div>
                                
                            )
                        }) : <h1>No Images</h1>

                    }



                </div>

            </div></>
    )
}

export default Profile