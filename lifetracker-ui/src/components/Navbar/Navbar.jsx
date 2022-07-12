import * as React from "react"
import "./Navbar.css"
import NavLinks from "../Navbar/NavLinks"
// import {Link} from "react-router-dom"

export default function Navbar({isLoggedIn}) {
  return (
    <nav className="navbar">
    
      <NavLinks
      isLoggedIn = {isLoggedIn} />    
    </nav>
  )
} 