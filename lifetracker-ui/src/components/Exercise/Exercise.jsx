import * as React from "react"
import { Routes } from "react-router-dom"
import "./Exercise.css"
import ExerciseOverview from "./ExerciseOverview"


export default function Exercise() {
  return (
    <div className="exercise-page">
        <Routes>
            <Route path="/" element={<ExerciseOverview />}/>
            //<Route path="/create" element={<ExerciseNew />}/>
            <Route path="/id/:exerciseId" element={<ExerciseDetail />}/>
            <Route path="*" element={<NotFound />}/>
        </Routes>
        
    </div>
  )
} 