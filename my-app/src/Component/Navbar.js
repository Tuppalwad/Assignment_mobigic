import React from "react";
import { Link, useNavigate } from "react-router-dom";
import {logout} from '../utils/authoService'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function Navbar() {
  const successNotify = () => toast.success("Logout Success");
  const errorNotify = (msg) => toast.error(msg);

  const nevigate = useNavigate();
  const handleLogout=()=>{
    const token= localStorage.getItem('section_token')
    logout(token).then((res)=>{
      console.log(res)
      if(res.status===200){
        successNotify()
        localStorage.removeItem('section_token')
        setTimeout(() => {
        nevigate('/')
      }
      , 1000);
      }
      else if(res.status===400){
          errorNotify(res.error);
        return
      }

    })
  }

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
  <ToastContainer />

      <div className="container-fluid">
        <Link className="navbar-brand" to="/home">
          My<span className="text-success">
            <strong>App</strong>
          </span>
        </Link>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          
          <div className="d-flex ms-auto">
            <Link className="nav-link" to="/home">
              <i className="fa fa-home" style={
                {fontSize:'20px',
                color:'black'
              }

              }></i>
            </Link>

          <Link className="nav-link" to="/profile">
              <i className="fa fa-user" style={
                {fontSize:'20px',
                color:'black'
              }

              }></i>
            </Link>
            <buton className="btn btn-outline-success"
              onClick={handleLogout}
            >
              Logout
            </buton>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
