import React, { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {login} from '../../utils/authoService'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function Login() {
    const successNotify = () => toast.success("Login Success");
    const errorNotify = () => toast.error("Login Failed");
    const nevigate = useNavigate()

   useEffect(() => {
        const token= localStorage.getItem("section_token")
        if(token){
            nevigate('/')
        }
    }, [])


    const [uname, setUname] = React.useState('')
    const [psw, setPsw] = React.useState('')
    const handleSubmit = (e) => {
        e.preventDefault()
        if (uname === "") {
            setWarning({ uname: "Please Enter Username" })
            return
        }
        if (psw === "") {
            setWarning({ psw: "Please Enter Password" })
            return
        }
        else {
            login(uname, psw).then((res) => {
                if (res.status===200) {
                    localStorage.setItem("section_token",res.section.section_token)
                    successNotify()
                    setTimeout(() => {
                    nevigate('/home')
                  }
                  , 1000);
                }
                else if (res.status===400){
                    errorNotify()
                    setWarning({ email: res.error })
                }
                else {
                    alert(res.error)
                }
            })


        }

    }
    // validation uesrnam and password
    const [warning, setWarning] = React.useState({ uname: "", psw: "" })

    const handleUname = (e) => {
        setUname(e.target.value)
        if (e.target.value === "") {
            setWarning({ uname: "Please Enter Username" })
            return
        }
        else {
            setWarning({ uname: "" })
        }
    }
    const handlePsw = (e) => {
        setPsw(e.target.value)
        if (e.target.value === "") {
            setWarning({ psw: "Please Enter Password" })
            return
        }
        else {
            setWarning({ psw: "" })
        }
    }


    return (
        <>
            <div class="container mt-5">
            <ToastContainer />
                

                <h2 class="text-center text-success">Login Form</h2>
                <form method="post" class="w-25 mx-auto">
                    <div class="mb-3">
                        <label for="uname" class="form-label"><b>Username</b></label>
                        <input type="email" class="form-control" id="uname" placeholder="Enter Username" name="uname" required
                            value={uname}
                            onChange={handleUname}

                        />
                    </div>
                    <p class="text-danger">{warning.uname}</p>
                    <div class="mb-3">
                        <label for="psw" class="form-label"><b>Password</b></label>
                        <input type="password" class="form-control" id="psw" placeholder="Enter Password" name="psw"
                            value={psw}
                            onChange={handlePsw}
                            required />
                    </div>
                    <p class="text-danger">{warning.psw}</p>
                    <button type="submit"
                        onClick={handleSubmit}
                        class="btn btn-success w-100">Login</button>
                    <div class="mt-3">
                        <p>Don't have an account? <Link to="/signup" class="text-success">sign up</Link></p>
                          </div>
                </form>
            </div>
        </>

    )
}

export default Login