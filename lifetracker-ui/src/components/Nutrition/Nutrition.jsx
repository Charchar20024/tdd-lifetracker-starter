import * as React from "react"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import axios from "axios"
import { Routes, Route } from "react-router-dom"
import "./Nutrition.css"
import apiClient from "../../services/apiClient"
import NutritionNew from "./NutritionNew"
import NutritionOverview from "./NutritionOverview"
import NotFound from "components/NotFound/NotFound"


export default function Nutrition({isLoggedIn, setIsLoggedIn, setIsLoading, nutritions, setUser, user}) {
  const navigate = useNavigate()
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

    const {data,error} = await apiClient.loginUser({ email: form.email, password: form.password})
   if(error) setErrors((e) =>({...e, form:error}))
   navigate("/nutrition")
   if(data?.user){
     setUser(data.user)
     console.log(setUser)
     apiClient.setToken(data.token)
   }
    setIsLoading(false)
    setIsLoggedIn(true)
  }
  
  if(isLoggedIn){
  return (
    <div className="nutrition-page">
        <Routes>
            <Route path="/" element={<NutritionOverview 
            nutritions={nutritions}
            />}/>
            <Route path="/create" element={<NutritionNew />}/>
            {/* <Route path="/id/:NutritionId" element={<NutritionDetail />}/>
            <Route path="*" element={<NotFound />}/> */}
 
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