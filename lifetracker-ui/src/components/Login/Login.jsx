import * as React from "react"
import { useState,useEffect } from "react"
import { useNavigate } from "react-router-dom"
import apiClient from "../../services/apiClient"
import "./Login.css"

export default function Login({setIsLoggedIn, setUser, user, setIsLoading}) {
  const navigate = useNavigate()
  
  const [errors, setErrors] = useState({})
  const [form, setForm] = useState({
    email: "",
    password: "",
  })

  // useEffect(() => {
  //   if (user?.email) {
  //     
  //   }
  // }, [user, navigate])

  const handleOnInputChange = (event) => {
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

    const {data,error} = await apiClient.loginUser({ email: form.email, password: form.password})
   if(error) setErrors((e) =>({...e, form:error}))
   if(data?.user){
     setUser(data.user)
     console.log(setUser)
     apiClient.setToken(data.token)
   }
    setIsLoading(false)
    setIsLoggedIn(true)
    navigate("/")
    // try {
    //   const res = await axios.post("http://localhost:3002/auth/login", {
    //     email: form.email,
    //     password: form.password,
    //   })
    //   if (res?.data?.user) {
    //     
    //     navigate("/activity")
    //   } else {
    //     setErrors((e) => ({ ...e, form: "Invalid username/password combination" }))
    //     
    //   }
    // } catch (err) {
    //   console.log(err)
    
    // }
  }
    return (
      <div className="login-page">
        <div className="card">
          
          <h2>Login</h2>
          
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
          <div className="input-field">
          <label for="password">Password</label>
          <input
              type="password"
              name="password"
              placeholder="Password"
              value={form.password}
              onChange={handleOnInputChange}
              />
          </div>
          <button className="btn-login1" onClick={handleOnSubmit}>Login</button>
        </div>
      </div>
    </div>
    )
  } 