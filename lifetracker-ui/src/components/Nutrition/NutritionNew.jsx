import * as React from "react"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import apiClient from "../../services/apiClient"
import "./NutritionNew.css"


export default function NutritionNew() {
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(false)
  const [form, setForm] = useState({
    name: "",
    category: "",
    quantity: "",
    calories: "",
    imageUrl: "",
    errors:"",
  })
  const [errors, setErrors] = useState({})

  const handleOnInputChange = (event) => {
    setForm((f) => ({ ...f, [event.target.name]: event.target.value }))
  }
  const handleOnSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    setErrors((e) => ({ ...e, form: null }))
  const {data,error} = await apiClient.createNewNutrition({name: form.name,
           category: form.category,
            calories: form.calories,
            quantity: form.quantity,
           imageUrl: form.imageUrl})
   if(error) setErrors((e) =>({...e, form:error}))
   navigate("/nutrition")
  }

    // try {
    //   const res = await axios.post("http://localhost:3002/nutritions/create", {
    //      name: form.name,
    //      category: form.category,
    //      calories: form.calories,
    //      quantity: form.quantity,
    //      imageUrl: form.imageUrl,
       
    //   })
    //   if (res?.data?.user) {
    //     console.log("hello")
    //     
    //   } else {
    //     setErrors((e) => ({ ...e, form: "Something went wrong" }))
    //   }
     
    // } catch (err) {
    //   console.log(err)
      
    // }
 
  return (
    <div className="nutritionNewPage">
      <div className="banner">
        <h1>Nutrition</h1>
      </div>
      <div className="contents">
    <div className="nutrition-new">
        <div className="input-field">
          
            <label for="name">Name</label>
        <input
              type="text"
              name="name"
              placeholder="Nutrition name"
              value={form.name}
              onChange={handleOnInputChange}
              />
        </div>
        <div className="input-field">
        <label for="category">Category</label>
              <input
              type="text"
              name="category"
              placeholder="Nutrition category"
              value={form.category}
              onChange={handleOnInputChange}
              />
        </div>
        <div className="split-field">
        <label for="quantity">Quantity</label>
            <div className="input-field">
              <input
              type="number"
              name="quantity"
              min="1"
              max="1000000"
              
              value={form.quantity}
              onChange={handleOnInputChange}
              />
              </div>
              <label for="quantity">Calories</label>
              <div className="input-field">
              <input
              type="number"
              name="calories"
              min="1"
              max="1000000"
        
              value={form.calories}
              onChange={handleOnInputChange}
              />
              </div>
              
           </div> 
           
        <div className="input-field">
         <label for="imageUrl">Image URL</label>
              <input
              type="text"
              name="imageUrl"
              placeholder="http://www.food-image.com/1"
              value={form.imageUrl}
              onChange={handleOnInputChange}
              />
        </div>  
        <div className="class-btn">
      <button className="account-btn" onClick={handleOnSubmit}>{isLoading ? "Loading":"Save"}</button>
        </div>
    </div>
    </div>
    </div>
  )
} 