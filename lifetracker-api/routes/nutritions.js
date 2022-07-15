const express = require("express")
const Nutrition = require("../models/nutrition")
const security = require("../middleware/security")
const permissions = require("../middleware/permissions")
  

const router = express.Router()

router.post("/create", security.requireAuthenticatedUser, async (req, res, next) => {
    try{
      const {user} = res.locals

      console.log(user, req.body)
      const nutrition = await Nutrition.createNutrition({nutrition: req.body, user})
      
      return res.status(200).json({ nutrition })
    
    } catch (err) {
      next(err)
    }
  })
  router.get("/", async (req, res, next) => {
    try{
      const nutrition = await Nutrition.allNutrition()
      return res.status(200).json({ nutrition })
    } catch (err) {
      next(err)
    }
  })
router.get("/:nutritionId", security.requireAuthenticatedUser, async (req, res, next) => {
    try{
      const { nutritionId } = req.params
      
      const nutrition = await Nutrition.fetchNutritionById(nutritionId)
      return res.status(200).json({ nutrition })  
    } catch (err) {
      next(err)
    }
  })
  
  module.exports = router