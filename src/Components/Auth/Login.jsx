import React, { useState } from 'react'
import "../../Assets/css/login.css"
import axios from 'axios'
import { useNavigate } from "react-router-dom";

const Login = ({ setLoginUser }) => {


  const [user, setUser] = useState({

    email: '',
    password: '',

  })

  const handleChange = (e) => {
    const { name, value } = e.target


    setUser({
      ...user,
      [name]: value
    })

  }

  const login = () => {
    axios.post("http://localhost:8080/users/create-session", user)
      .then(res => {
        console.log(res.data.message);
        setLoginUser(res.data.user);
        navigate("/home");
      })

  }

  const navigate = useNavigate();


  return (
    <div className='login'>

      <h1>login</h1>
      <input type='text' name='email' value={user.email} placeholder='your email' onChange={handleChange}></input>
      <input type='password' name='password' value={user.password} placeholder=' your password' onChange={handleChange}></input>
      <div className='button' onClick={login}>login</div>
      <div>or</div>
      <div className='button' onClick={() => navigate("/Register")}>register</div>
    </div>
  )
}

export default Login