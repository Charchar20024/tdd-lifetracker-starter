import * as React from "react"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import axios from "axios"
import { Routes, Route } from "react-router-dom"
import "./Nutrition.css"
import NutritionNew from "./NutritionNew"
import NutritionOverview from "./NutritionOverview"


export default function Nutrition({isLoggedIn, setIsLoggedIn}) {
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(false)
  const [errors, setErrors] = useState({})
  const [form, setForm] = useState({
    email: "",
    password: "",
  })

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

    try {
      const res = await axios.post("http://localhost:3002/auth/login", {
        email: form.email,
        password: form.password,
      })
      if (res?.data?.user) {
        setIsLoggedIn(true)
        navigate("/activity")
      } else {
        setErrors((e) => ({ ...e, form: "Invalid username/password combination" }))
        setIsLoading(false)
      }
    } catch (err) {
      console.log(err)
    
    }
  }
  if(isLoggedIn){
  return (
    <div className="nutrition-page">
        <Routes>
            <Route path="/" element={<NutritionOverview />}/>
            <Route path="/create" element={<NutritionNew />}/>
            {/* 
            <Route path="/id/:NutritionId" element={<ExerciseDetail />}/> */}
 
        </Routes>
        
    </div>
  )}else{
    return (
        <div className="login-page">
        <div className="card">
          
          <h2>Login</h2>
          <h4>You must be logged in to access this page</h4>
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
    </div>)

  }
} 