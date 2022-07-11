import * as React from "react"
import { Link } from "react-router-dom"
import "./Activity.css"


export default function Activity() {
  return (
    <div className="activity-page">
        <div className="content">
            <div className="activity-header">
                <h2 className="header-name">Activity Feed</h2>
            <div className="button">
                <Link to="/nutrition/create"
                >
                <button className="btn-nutrition">Add Nutrition</button>
                </Link>
            </div>
        </div>
        <div className="stats">
            <div className="main">
                <div className="nutrition-stats">
                <div className="background">
                   <p>Total Nutrition Minutes</p>
                   <h1>0</h1>
                </div>
            </div>
            
        </div>
        <h4>More Stats</h4>
        <div className="more">
          <div className="nutrition-summary">
                <div className="background">
                    
                <p>Maximum Hourly Calaries</p>
                <p>0</p>
                </div>
            </div>
        </div>
      </div>
     
    </div>
  </div>
  )
} 