import React, { useState } from 'react'
import "../../Assets/css/register.css"
import axios from 'axios';
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    name: '',
    email: '',
    password: '',
    reEnterPassword: ''
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setUser({
      ...user,
      [name]: value
    })

  }

  const register = () => {
    const { name, email, password, reEnterPassword } = user
    if (name && email && password && (password === reEnterPassword)) {
      axios.post("http://localhost:5500/register", user)
        .then(res => console.log(res))
    } else {
      alert("invalid input")
    }
  }

  return (
    <div className='register'>
      {console.log("user", user)}
      <h1>Register</h1>
      <input type='text' name='name' value={user.name} placeholder='your name' onChange={handleChange}></input>
      <input type='text' name='email' value={user.email} placeholder='your email' onChange={handleChange}></input>
      <input type='password' name='password' value={user.password} placeholder=' your password' onChange={handleChange}></input>
      <input type='password' name='reEnterPassword' value={user.reEnterPassword} placeholder='re-enter password' onChange={handleChange}></input>
      <div className='button' onClick={register}>register</div>
      <div>or</div>
      <div className='button' onClick={() => navigate("/Login")}>log in</div>
    </div>
  )
}

export default Register