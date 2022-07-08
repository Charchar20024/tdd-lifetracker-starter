import * as React from "react"
import "./NavLinks.css"
import { Link } from "react-router-dom"

export default function NavLinks() {
  return (
    <div className="nav-elements">
        <ul className="logo">
         <li>
         <Link to="/">
           <img src="/images/codepath.70a9a31f.svg" alt="" />
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
         <Link to="/exercise">
            <button className="btn-exercise">Exercise</button>
            </Link>
         </li>
         
        </ul>
        <ul>
         <li>
         <Link to="/login">
            <button className="btn-login">Login</button>
         </Link>
         </li>
         <li>
         <Link to="/register">
            <button className="btn-sign-up">Sign up</button>
        </Link>
        </li>
       </ul>
            
            

    </div>
  )
} 