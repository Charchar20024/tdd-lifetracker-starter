
import * as React from "react"
import { Link } from "react-router-dom"
import NutritionFeed from "./NutritionFeed"

import "./NutritionOverview.css"


export default function NutritionOverview({nutritions}) {

   
 return (
        <div className="nutrition-page">
     
            <div className="banner">
            <h1>Nutrition</h1>  
        </div>
        <div className="content">
            <div className="nutrition-overview">
                <div className="header">
                    <h3>Overview</h3>
                    <Link to="/nutrition/create">
                    <button className="btn-nutrition">Add Nutrition</button>
                    </Link>
                </div>
                <div className="feed">
                    
                    <NutritionFeed 
                        nutritions={nutritions}
                    />

                </div>
            </div>
        </div>
        
          

    </div>)
  
} 