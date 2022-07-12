import * as React from "react"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import axios from "axios"
import { Link } from "react-router-dom"
import "./Activity.css"


export default function Activity({isLoggedIn, setIsLoggedIn}) {
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
    <div className="activity-page">
        <div className="content">
            <div className="activity-header">
                <h2 className="header-name">Activity Feed</h2>
            <div className="button">
                
                  <button className="btn-exercise">Add Exercise</button>
                  <button className="btn-sleep">Log Sleep</button>
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
        <h4>More Stats</h4>
        <div className="more">
          <div className="nutrition-summary">
                <div className="background">
                   <div>
                <p>Maximum Hourly Calaries</p>
                <p>0</p>
                </div> 
                </div>
                <div className="background">
                   <div>
                <p>Avg Exercise Intensity</p>
                <p>0</p>
                </div> 
                </div>
                <div className="background">
                   <div>
                <p>Total Hours Slept</p>
                <p>0</p>
                </div> 
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