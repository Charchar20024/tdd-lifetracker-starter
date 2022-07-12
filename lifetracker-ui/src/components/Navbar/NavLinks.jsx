import * as React from "react"
import "./NavLinks.css"
import { Link } from "react-router-dom"

export default function NavLinks({isLoggedIn}) {
  return (
    <div className="nav-elements">
       
        <ul className="logo">
         <li>
         <Link to="/">
           <img className="bt-logo" src="/images/logo-removebg-preview.png" alt="" />
         </Link>
         </li>
        </ul>  
       
          
        <ul>
         
         <li>
         <Link to="/activity">
            <button className="bt-activity">Activity</button>
            </Link>
         </li>
         <li>
         <Link to="/nutrition">
            <button className="btnnutrition">Nutrition</button>
            </Link>
         </li>
         
        </ul>
        <ul>
           
         <li>
         <Link to="/login">
            <button className="btn-login" disabled={isLoggedIn}>Login</button>
         </Link>
         </li>
         <li>
         <Link to="/register">
            <button className="btn-sign-up">{isLoggedIn ? "Logout":"Sign up"}</button>
        </Link>
        </li>
       </ul>
            
           

    </div>
  )
} 