import * as React from "react"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import axios from "axios"
import { Link } from "react-router-dom"
import "./Activity.css"


export default function Activity({isLoggedIn, setIsLoggedIn, setIsLoading}) {
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
    <div className="activity-page">
        <div className="content">
            <div className="activity-header">
                <h2 className="header-name">Activity Feed</h2>
            <div className="button">
                
                 
                <Link to="/nutrition/create">
                  <button className="btn-nutrition">Record Nutrition</button>
                </Link>
           </div>
        </div>
        <div className="stats">
            <div className="main">
                <div className="exercise-stats">
                <div className="background">
                   <p>Total Exercise Minutes</p>
                   <h1>0</h1>
                </div>
            </div>
            <div className="sleep-stats">
                <div className="background">
                   <p>Avg Sleep Hours</p>
                   <h1>0</h1>
                </div>
            </div>
            <div className="nutrition-stats">
                <div className="background">
                   <p>Avg Daily Calories</p>
                   <h1>0</h1>
                </div>
            </div>
            
        </div>
        <h3>More Stats</h3>
        <div className="more">
          <div className="nutrition-summary">
                <div className="background">
                   <p>Maximum Hourly Calaries</p>
                <p>0</p>
              </div> 
                <div className="background">
                  
                <p>Avg Exercise Intensity</p>
                <p>0</p>
                
                </div>
                <div className="background">
                <p>Total Hours Slept</p>
                <p>0</p>
                </div> 
                
            </div>
        </div>
      </div>
    </div>
    </div>
    )
     
   
 

}else{
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