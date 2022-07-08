import * as React from "react"
import "./Activity.css"


export default function Activity() {
  return (
    <div className="activity-page">
        <div className="content">
            <div className="activity-header">
                <h2>Activity Feed</h2>
                <div className="button">
                <button className="btn-exercise">Add Exercise</button>
            </div>
        </div>
        <div className="stats">
            <div className="main">
                <div className="exercise-element">
                   <p>Total Exercise Minutes</p>
                   <p>0</p>
                </div>
            
            
        </div>
        <div className="">
            <div>
                <h1>More Stats</h1>
            </div>
            </div>
            <div>
                <p>Maximum Hourly Calaries</p>
                <p>0</p>
            </div>
        </div>
      </div>
     
    </div>
  
  )
} 