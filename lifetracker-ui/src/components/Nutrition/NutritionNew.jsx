import * as React from "react"
import "./NutritionNew.css"


export default function NutritionNew() {
  return (
    <div className="nutritionNewPage">
      <div className="Banner">
        <h1>Nutrition</h1>
      </div>
      <div className="content">
    <div className="nutrition-new">
        <div className="input-field">
          
            <label for="name">Name</label>
        <input
              type="text"
              name="name"
              placeholder="Nutrition name"
              />
        </div>
        <div className="input-field">
        <label for="category">Category</label>
              <input
              type="text"
              name="category"
              placeholder="Nutrition category"
              />
        </div>
        <div className="split-field">
            <div className="input-field">
              <input
              type="number"
              name="quantity"
              min="1"
              max="1000000"
              value="1"
              />
              </div>
              <div className="input-field">
              <input
              type="number"
              name="calories"
              min="1"
              max="1000000"
              value="1"
              />
              </div>
              
           </div> 
           
        <div className="input-field">
         <label for="imageUrl">Image URL</label>
              <input
              type="text"
              name="imageUrl"
              placeholder="http://www.food-image.com/1"
              />
        </div>  
      <button>Save</button>

    </div>
    </div>
    </div>
  )
} 