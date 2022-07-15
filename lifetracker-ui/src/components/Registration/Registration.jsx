import * as React from "react"
import { useEffect, useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import apiClient from "../../services/apiClient"
import "./Registration.css"

export default function Registration({setIsLoggedIn, setUser, user, setIsLoading, isLoading}) {
  const navigate = useNavigate()
  
  const [form, setForm] = useState({
    email: "",
    username: "",
    firstName: "",
    lastName: "",
    password: "",
    passwordConfirm: "",
    errors:"",
  })

  useEffect(() => {
    if (user?.email) {
      
    }
  }, [user, navigate])
  const [errors, setErrors] = useState({})

  const handleOnInputChange = (event) => {
    if (event.target.name === "password") {
      if (form.passwordConfirm && form.password !== event.target.value) {
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

    setForm((f) => ({ ...f, [event.target.name]: event.target.value }))
  }
  
  const handleOnSubmit = async () => {
    setIsLoading(true)
    setErrors((e) => ({ ...e, form: null }))

    if (form.passwordConfirm !== form.password) {
      setErrors((e) => ({ ...e, passwordConfirm: "Passwords do not match." }))
      setIsProcessing(false)
      return
    } else {
      setErrors((e) => ({ ...e, passwordConfirm: null }))
    }

    const {data,error} = await apiClient.signupUser({username: form.username,
           password: form.password,
           firstName: form.firstName,
           lastName: form.lastName,
           email: form.email})
        if(error) setErrors((e) =>({...e, form:error}))
        if(data?.user){
          setUser(data.user)
          apiClient.setToken(data.token)
        }
        setIsLoading(false)
        navigate("/")
    // try {
    //   const res = await axios.post("http://localhost:3002/auth/register", {
    //      username: form.username,
    //      password: form.password,
    //      firstName: form.firstName,
    //      lastName: form.lastName,
    //      email: form.email,
       
    //   })
    //   if (res?.data?.user) {
    //     setIsLoggedIn(true)
    //     navigate("/activity")
    //   } else {
    //     setErrors((e) => ({ ...e, form: "Something went wrong with registration" }))
    //   }
     
    // } catch (err) {
    //   console.log(err)
    //   //const message = err?.response?.data?.error?.message
    //   //setErrors((e) => ({ ...e, form: message ?? String(err) }))
    // // } finally {
    // //   setIsProcessing(false)
    // }
  }
  return (
    <div className="registration">
      <div className="card">
    <h2>Register</h2>
   <span className="error">{errors.form}</span>
        <br />
    <div className="form">
          <div className="input-field">
          <label for="email">Email</label>
          <input
              type="email"
              name="email"
              placeholder="Enter a vaild email"
              value={form.email}
              onChange={handleOnInputChange}
              />
          </div>
          
              <label for="username">Username</label>
          <input
              type="text"
              name="username"
              placeholder="Username"
              value={form.username}
              onChange={handleOnInputChange}
              />
              <br/>
              <div>
              {/* <label for="firstname">First Name</label> */}
              <input
              className="name-field"
              type="text"
              name="firstName"
              placeholder="First Name"
              value={form.firstName}
              onChange={handleOnInputChange}
              />
              {/* <label for="lastname">Last Name</label> */}
              <input
              className="name-field"
              type="text"
              name="lastName"
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
              name="passwordConfirm"
              placeholder="Confirm Password"
              value={form.passwordConfirm}
              onChange={handleOnInputChange}
              />
          </div>   
       </div>
       </div>
       <button className="account-btn" onClick={handleOnSubmit}>{isLoading ? "Loading":"Create Account"}</button>
    </div>
  )
} 

