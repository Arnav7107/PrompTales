import React from 'react';
import {
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBInput,
  MDBIcon
}
from 'mdb-react-ui-kit';
import '../styles/Login.css'
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import { Link } from "react-router-dom";
import { useState, useEffect } from 'react';
import axios from 'axios';
import{ ToastContainer, toast} from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";



function Register() {
  const [cookies] = useCookies(["cookie-name"]);
 
  const navigate = useNavigate();
  useEffect(() => {
    if (cookies.jwt) {
      navigate("/dashboard");
    }
  }, [cookies, navigate]);

  const [values, setValues] = useState({ email: "", password: "" });
  const generateError = (error) =>
    toast.error(error, {
      position: "bottom-right",
    });
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const { data } = await axios.post(
        "http://localhost:4000/register",
        {
          ...values,
        },
        { withCredentials: true }
      );
      if (data) {
        console.log("Response Data:", data);

        if (data.errors) {
          const { email, password } = data.errors;
          if (email) generateError(email);
          else if (password) generateError(password);
        } else {
          const { email } = data;
          console.log("Email:", email);
          navigate("/dashboard",{ state: { email } });
        }
      }
    } catch (ex) {
      console.log(ex);
    }
  };

  return (
    <MDBContainer fluid>

      <MDBRow className='d-flex justify-content-center align-items-center'>
        <MDBCol col='12'>

          <MDBCard className='bg-dark text-white my-5 mx-auto' style={{borderRadius: '1rem', maxWidth: '400px'}}>
            <MDBCardBody className='p-5 d-flex flex-column align-items-center mx-auto w-100'>

              <h2 className="fw-bold mb-2 text-uppercase">Sign Up</h2>
              
              <p className="text-white-50 mb-5"></p>

              <form className=' d-flex flex-column align-items-center' onSubmit={handleSubmit}>
              <MDBInput wrapperClass='mb-4 mx-5 w-100' labelClass='text-white' label='Full-Name' id='formControlLg' type='name' name="name" onChange={(e)=>setValues({...values,[e.target.name]:e.target.value})} size="lg"/>
              <MDBInput wrapperClass='mb-4 mx-5 w-100' labelClass='text-white' label='Email address' id='formControlLg' type='email' name='email' onChange={(e)=>setValues({...values,[e.target.name]:e.target.value})} size="lg"/>
              <MDBInput wrapperClass='mb-4 mx-5 w-100' labelClass='text-white' label='Password' id='formControlLg' type='password' name='password' onChange={(e)=>setValues({...values,[e.target.name]:e.target.value})} size="lg"/>

              <MDBBtn outline type="submit" className='mx-2 px-5' color='white' size='lg'>
                Sign Up
              </MDBBtn> 
              </form>  
              <ToastContainer />
              


             
               
              

              {/* <div>
                <p className="mb-0">Don't have an account? <a href="#!" class="text-white-50 fw-bold">Sign Up</a></p>

              </div> */}
              
            </MDBCardBody>
            
          </MDBCard>
          

        </MDBCol>
      </MDBRow>
      
      
    </MDBContainer>
    
  );
}


export default Register;





// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { ToastContainer, toast } from "react-toastify";
// import { useCookies } from "react-cookie";
// import { Link, useNavigate } from "react-router-dom";
// function Register() {
//   const [cookies] = useCookies(["cookie-name"]);
//   const navigate = useNavigate();
//   useEffect(() => {
//     if (cookies.jwt) {
//       navigate("/dashboard");
//     }
//   }, [cookies, navigate]);

//   const [values, setValues] = useState({ email: "", password: "" });
//   const generateError = (error) =>
//     toast.error(error, {
//       position: "bottom-right",
//     });
//   const handleSubmit = async (event) => {
//     event.preventDefault();
//     try {
//       const { data } = await axios.post(
//         "http://localhost:4000/register",
//         {
//           ...values,
//         },
//         { withCredentials: true }
//       );
//       if (data) {
//         if (data.errors) {
//           const { email, password } = data.errors;
//           if (email) generateError(email);
//           else if (password) generateError(password);
//         } else {
//           navigate("/dashboard");
//         }
//       }
//     } catch (ex) {
//       console.log(ex);
//     }
//   };
//   return (
//     <div className="container">
//       <h2>Register Account</h2>
//       <form onSubmit={(e) => handleSubmit(e)}>
//         <div>
//           <label htmlFor="email">Email</label>
//           <input
//             type="email"
//             name="email"
//             placeholder="Email"
//             onChange={(e) =>
//               setValues({ ...values, [e.target.name]: e.target.value })
//             }
//           />
//         </div>
//         <div>
//           <label htmlFor="password">Password</label>
//           <input
//             type="password"
//             placeholder="Password"
//             name="password"
//             onChange={(e) =>
//               setValues({ ...values, [e.target.name]: e.target.value })
//             }
//           />
//         </div>
//         <button type="submit">Submit</button>
//         <span>
//           Already have an account ?<Link to="/login"> Login</Link>
//         </span>
//       </form>
//       <ToastContainer />
//     </div>
//   );
// }

// export default Register;
