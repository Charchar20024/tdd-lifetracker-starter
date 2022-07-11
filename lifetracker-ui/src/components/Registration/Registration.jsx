import * as React from "react"
import { useState } from "react"
//import { useNavigate, Link } from "react-router-dom"
import axios from "axios"
import "./Registration.css"

export default function Registration() {
  const [form, setForm] = useState({
    email: "",
    username: "",
    firstName: "",
    lastName: "",
    password: "",
    passwordConfirm: "",
  })
  const [errors, setErrors] = useState({})
  const handleOnInputChange = (event) => {
    if (event.target.name === "password") {
      if (form.passwordConfirm && form.passwordConfirm !== event.target.value) {
        setErrors((e) => ({ ...e, passwordConfirm: "Password's do not match" }))
      } else {
        setErrors((e) => ({ ...e, passwordConfirm: null }))
      }
    }

    if (event.target.name === "email") {
      if (event.target.value.indexOf("@") === -1) {
        setErrors((e) => ({ ...e, email: "Please enter a valid email." }))
      } else {
        setErrors((e) => ({ ...e, email: null }))
      }
    }

    setForm((f) => ({ ...f, [event.target.lastName]: event.target.value }))
  }
  
  const handleOnSubmit = async () => {
    setIsProcessing(true)
    setErrors((e) => ({ ...e, form: null }))

    if (form.passwordConfirm !== form.password) {
      setErrors((e) => ({ ...e, passwordConfirm: "Passwords do not match." }))
      setIsProcessing(false)
      return
    } else {
      setErrors((e) => ({ ...e, passwordConfirm: null }))
    }

    try {
      const res = await axios.post("http://localhost:3002/auth/register", {
         username: form.username,
         password: form.password,
         firstName: form.firstName,
         lastName: form.lastName,
         email: form.email,
       
      })
      // if (res?.data?.user) {
      //   setUser(res.data.user)
      // } else {
      //   setErrors((e) => ({ ...e, form: "Something went wrong with registration" }))
      // }
    } catch (err) {
      console.log(err)
      //const message = err?.response?.data?.error?.message
      //setErrors((e) => ({ ...e, form: message ?? String(err) }))
    // } finally {
    //   setIsProcessing(false)
    }
  }
  return (
    <div className="registration">
      <div className="card">
    <h2>Register</h2>
    <div className="form">
          <div className="input-field">
          <label for="email">Email</label>
          <input
              type="email"
              name="email"
              placeholder="Enter a vaild email"
              value={form.email}
              />
          </div>
          
              <label for="username">Username</label>
          <input
              type="text"
              name="username"
              placeholder="Username"
              value={form.username}
              onChange={handleOnInputChange}
              /><div>
              {/* <label for="firstname">First Name</label> */}
              <input
              className="name-field"
              type="text"
              name="firstname"
              placeholder="First Name"
              value={form.firstName}
              onChange={handleOnInputChange}
              />
              {/* <label for="lastname">Last Name</label> */}
              <input
              className="name-field"
              type="text"
              name="lastname"
              placeholder="Last Name"
              value={form.lastName}
              onChange={handleOnInputChange}
              /></div>
          <div className="input-field">
          <label for="password">Password</label>
          <input
              type="password"
              name="password"
              placeholder="Password"
              value={form.password}
              onChange={handleOnInputChange}
              />
              <label for="password">Confirm Password</label>
                <input
              type="password"
              name="password"
              placeholder="Confirm Password"
              value={form.passwordConfirm}
               onChange={handleOnInputChange}
              />
          </div>   
       </div>
       </div>
       <button className="account-btn" onClick={handleOnSubmit}>Create Account</button>
    </div>
  )
} 

