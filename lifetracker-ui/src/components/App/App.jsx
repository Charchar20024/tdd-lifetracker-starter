import * as React from "react"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import "./App.css"
import { useState } from 'react';
import Navbar from "../Navbar/Navbar"
import Landing from "components/LandingPage/Landing"
import Login from "components/Login/Login"
import Registration from "components/Registration/Registration"
import Activity from "components/Activity/Activity"
import Nutrition from "components/Nutrition/Nutrition"
import NotFound from "components/NotFound/NotFound"



export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  return (
    <div className="app">
      <React.Fragment> 
         <BrowserRouter>
          <Navbar
          isLoggedIn={isLoggedIn}
          />
           <Routes>
              <Route path ="/" element={<Landing />}/> 
              <Route path="/login" element={<Login 
              setIsLoggedIn={setIsLoggedIn}
              />}/>
              <Route path="/register" element={<Registration 
              setIsLoggedIn={setIsLoggedIn}
              />}/>
              <Route path ="/activity/*" element={<Activity
              setIsLoggedIn={setIsLoggedIn} 
              isLoggedIn={isLoggedIn}
              />}/> 
              <Route path ="/nutrition/*" element={<Nutrition 
              setIsLoggedIn={setIsLoggedIn}
              isLoggedIn={isLoggedIn}
              />}/> 
              <Route path="*" element={<NotFound />}/>
          </Routes> 
        </BrowserRouter>
      </React.Fragment> 
    </div>
  )
} 