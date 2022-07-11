import * as React from "react"
import { Routes, Route } from "react-router-dom"
import "./Nutrition.css"
import NutritionNew from "./NutritionNew"
import NutritionOverview from "./NutritionOverview"


export default function Nutrition() {
  return (
    <div className="nutrition-page">
        <Routes>
            <Route path="/" element={<NutritionOverview />}/>
            <Route path="/create" element={<NutritionNew />}/>
            {/* 
            <Route path="/id/:exerciseId" element={<ExerciseDetail />}/> */}
 
        </Routes>
        
    </div>
  )
} 