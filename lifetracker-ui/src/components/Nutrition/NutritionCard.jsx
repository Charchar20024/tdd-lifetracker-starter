import "./NutritionCard.css"

export default function NutritionCard({nutritions}) {
  return (
    <div className="nutritionCard">
      <div className="nutrition-info">
        <div className="info">
              <p className="nutrition-name"><b>{nutritions.name}</b></p>
              <br /><br />
          
              <img src={nutritions.imageUrl} alt="nutritions cover" />
                <p>Calories: {nutritions.calories}</p>
                <p>Quantity: {nutritions.quantity}</p>
                <div className="category">
                <p>{nutritions.category}</p>
                </div>
            </div>
          
          <div>
             
          </div>
          
        </div>
    
        
     </div>
   
  )
}