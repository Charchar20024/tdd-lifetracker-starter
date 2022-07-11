import * as React from "react"
import { Link } from "react-router-dom"

import "./NutritionOverview.css"


export default function NutritionOverview() {
  return (
    <div className="nutrition-page">
     
        <div className="banner">
            <h1>Nutrition</h1>  
        </div>
        <div className="content">
            <div className="nutrition-overview">
                <div className="header">
                    <h3>Overview</h3>
                    <Link to="/create">
                    <button className="btn-nutrition">Add Nutrition</button>
                    </Link>
                </div>
                <div className="feed">
                    <h2>Nothing here yet.</h2>

                </div>
            </div>
        </div>
        
          

    </div>
  )
} 