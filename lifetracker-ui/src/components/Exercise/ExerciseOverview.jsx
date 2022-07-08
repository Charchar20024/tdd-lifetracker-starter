import * as React from "react"

import "./Exercise.css"


export default function ExerciseOverview() {
  return (
    <div className="exercise-page">
     
        <div className="banner">
            <h1>Exercise</h1>  
        </div>
        <div className="content">
            <div className="exercise-overview">
                <div className="header">
                    <h3>Overview</h3>
                    <button className="btnexercise">Add Exercise</button>
                </div>
                <div className="feed">
                    <h2>Nothing here yet.</h2>

                </div>
            </div>
        </div>
        
          

    </div>
  )
} 