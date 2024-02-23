import React, { useEffect,useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {login} from '../../Services/authoService'
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


    const [username, setusername] = useState('')
    const [Password, setPassword] = useState('')
    const handleSubmit = (e) => {
        e.preventDefault()
        if (username === "") {
            setWarning({ username: "Please Enter Username" })
            return
        }
        if (Password === "") {
            setWarning({ Password: "Please Enter Password" })
            return
        }
        else {
            login(username, Password).then((res) => {
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
    const [warning, setWarning] = useState({ username: "", Password: "" })

    const handleusername = (e) => {
        setusername(e.target.value)
        if (e.target.value === "") {
            setWarning({ username: "Please Enter Username" })
            return
        }
        else {
            setWarning({ username: "" })
        }
    }
    const handlePassword = (e) => {
        setPassword(e.target.value)
        if (e.target.value === "") {
            setWarning({ Password: "Please Enter Password" })
            return
        }
        else {
            setWarning({ Password: "" })
        }
    }


    return (
        <>
            <div class="container mt-5">
            <ToastContainer />
                

                <h2 class="text-center text-success">Login Form</h2>
                <form method="post" class="w-25 mx-auto">
                    <div class="mb-3">
                        <label for="username" class="form-label"><b>Username</b></label>
                        <input type="email" class="form-control" id="username" placeholder="Enter Username" name="username" required
                            value={username}
                            onChange={handleusername}

                        />
                    </div>
                    <p class="text-danger">{warning.username}</p>
                    <div class="mb-3">
                        <label for="Password" class="form-label"><b>Password</b></label>
                        <input type="password" class="form-control" id="Password" placeholder="Enter Password" name="Password"
                            value={Password}
                            onChange={handlePassword}
                            required />
                    </div>
                    <p class="text-danger">{warning.Password}</p>
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