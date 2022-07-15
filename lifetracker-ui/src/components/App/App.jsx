import * as React from "react"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import "./App.css"
import { useState, useEffect } from 'react'

import Navbar from "../Navbar/Navbar"
import Landing from "components/LandingPage/Landing"
import Login from "components/Login/Login"
import Registration from "components/Registration/Registration"
import Activity from "components/Activity/Activity"
import Nutrition from "components/Nutrition/Nutrition"
import NotFound from "components/NotFound/NotFound"

import apiClient from "../../services/apiClient"



export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [user, setUser] = useState({})
  const [error, setError] = useState(null)
  const [nutritions, setNutritions] = useState([])
  const [isFetching, setIsFetching] = useState(false)
  const [isLoading, setIsLoading] = useState(false)



  useEffect(() => {
    const fetchNutritions = async () => {
      setIsFetching(true)
      const {data, error} = await apiClient.fetchNutrition()
      if (data) setNutritions(data.nutrition)
      if(error) setError(error)
      
      setIsFetching(false)
    }
    fetchNutritions()
  }, [])
  console.log(user)

  useEffect(() => {
    const fetchUser = async () => {
      
      const {data, error} = await apiClient.fetchUserFromToken()
      if (data) setUser(data.user)
      if(error) setError(error)
    }
   const token = localStorage.getItem("nutritions_token")
   if(token){
     apiClient.setToken(token)
     fetchUser()
   }
  }, [])
  const handleOnLogout = async() =>{
    await apiClient.logoutUser()
    setUser({})
    setNutritions([])
    setIsLoggedIn(false)
    setError(null)
 }

  console.log(nutritions)
  return (
    <div className="app">
      <React.Fragment> 
         <BrowserRouter>
          <Navbar
          isLoggedIn={isLoggedIn}
          handleOnLogout={handleOnLogout}
         
          />
           <Routes>
              <Route path ="/" element={<Landing />}/> 
              <Route path="/login" element={<Login 
              setIsLoggedIn={setIsLoggedIn}
              user={user}
              setUser={setUser}
              setIsLoading={setIsLoading}
              
              />}/>
              <Route path="/register" element={<Registration 
              setIsLoggedIn={setIsLoggedIn}
              user={user}
              setUser={setUser}
              setIsLoading={setIsLoading}
              isLoading={isLoading}
              />}/>
              <Route path ="/activity/*" element={<Activity
              setIsLoggedIn={setIsLoggedIn} 
              isLoggedIn={isLoggedIn}
              setUser={setUser}
              setIsLoading={setIsLoading}
              />}/> 
              <Route path ="/nutrition/*" element={<Nutrition 
              setIsLoggedIn={setIsLoggedIn}
              isLoggedIn={isLoggedIn}
              setUser={setUser}
              setIsLoading={setIsLoading}
              nutritions={nutritions}
              user={user}

  />}/> 
              <Route path="*" element={<NotFound />}/>
          </Routes> 
        </BrowserRouter>
      </React.Fragment> 
    </div>
  )
} 