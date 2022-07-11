import * as React from "react"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import "./App.css"
import Navbar from "../Navbar/Navbar"
import Landing from "components/LandingPage/Landing"
import Login from "components/Login/Login"
import Registration from "components/Registration/Registration"
import Activity from "components/Activity/Activity"
import Nutrition from "components/Nutrition/Nutrition"
import NotFound from "components/NotFound/NotFound"



export default function App() {
  return (
    <div className="app">
      <React.Fragment> 
         <BrowserRouter>
          <Navbar/>
           <Routes>
              <Route path ="/" element={<Landing />}/> 
              <Route path="/login" element={<Login />}/>
              <Route path="/register" element={<Registration />}/>
              <Route path ="/activity" element={<Activity />}/> 
              <Route path ="/nutrition" element={<Nutrition />}/> 
              <Route path="*" element={<NotFound />}/>
          </Routes> 
        </BrowserRouter>
      </React.Fragment> 
    </div>
  )
} 