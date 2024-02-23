import React,{useState} from 'react'
import { Link, useNavigate  } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { register } from '../../Services/authoService'

function Register() {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [cpassword, setCpassword] = useState('')
    const successNotify = () => toast.success("Registration Success");
    const errorNotify = () => toast.error("Registration Failed");
    const [warning, setWarning] = useState({ email: "", password: "" })
    const nevigate = useNavigate()
    const handleSubmit = (e) => {
        e.preventDefault()
        if (email === "") {
            setWarning({ email: "Please Enter Email" })
            return
        }
        if (password === "") {
            setWarning({ password: "Please Enter Password" })
            return
        }
        if (password !== cpassword) {
            setWarning({ password: "Password Not Match" })
            return
        }
        else {
           try {
            register(email,password,name).then((res) => {
              console.log(res)
              if (res.status === 200) {
                  successNotify()
                    setTimeout(() => {
                    nevigate('/')
                  }
                  , 1000);
              }
              else if (res.status === 400) {
                  errorNotify()
                  setWarning({ email: res.error })
              }

              else {
                  errorNotify()
              }
          })

           } catch (error) {
            
           }
        }

    }




    return (
        <div>
            <ToastContainer />
            <div class="container mt-5">
                <h2 class="text-center text-success">Registration Form</h2>
                <form method="post" class="w-25 mx-auto">
                        < div class="mb-3">
                        <label for="name" class="form-label"><b>Name</b></label>
                        <input type="text" class="form-control" id="name" placeholder="Enter Name"
                            name="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>


                    <div class="mb-3">
                        <label for="email" class="form-label"><b>Email</b></label>
                        <input type="email" class="form-control" id="email" placeholder="Enter Email"
                            name="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div class="mb-1"> {warning.email ? <p class="text-danger">{warning.email}</p> : null}</div>
                    <div class="mb-3">
                        <label for="password" class="form-label"><b>Password</b></label>
                        <input type="password" class="form-control" id="password" placeholder="Enter Password" name="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <div class="mb-3">
                        <label for="cpassword" class="form-label"><b>
                            Confirm Password</b></label>
                        <input type="password" class="form-control" id="cpassword" placeholder="Enter Password" name="cpassword"
                            value={cpassword}
                            onChange={(e) => setCpassword(e.target.value)}
                        />
                    </div>
                    <div class="mb-1"> {warning.password ? <p class="text-danger">{warning.password}</p> : null}</div>
                    <button
                        onClick={handleSubmit}
                        class="btn btn-success w-100">Register</button>
                    <div class="mt-3">
                        <p>Already have an account? <Link to="/" class="text-success">Login</Link></p>
                    </div>
                </form>
            </div>

        </div>
    )
}

export default Register