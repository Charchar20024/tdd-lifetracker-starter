const db = require("../db")
const { NotFoundError } = require("../utils/errors")

class Nutrition{
    static async allNutrition(){
        const results = await db.query(
            `
            SELECT nutrition.id,
                   nutrition.name,
                   nutrition.category,
                   nutrition.calories,
                   nutrition.quantity,
                   nutrition.image_url AS "imageUrl",
                   users.email AS "userEmail"
            FROM nutrition
                JOIN users ON users.id = nutrition.user_id
            `
          )
      
          return results.rows
        }

    
    static async createNutrition({nutrition , user}){
        const requiredFields =["name", "category","calories", "quantity", "imageUrl"]

        requiredFields.forEach((property) => {
            if (!nutrition.hasOwnProperty(property)) {
              throw new BadRequestError(`Missing ${property} in request body.`)
            }})

        const result = await db.query(
            `INSERT INTO nutrition (
                name,
                category, 
                calories, 
                quantity,
                image_url,
                user_id
                )
             VALUES ($1, $2, $3, $4, $5, (SELECT id FROM users WHERE email = $6))
             RETURNING id, name, category, calories, quantity, image_url AS "imageUrl", user_id AS "userId", created_at;
            `, [nutrition.name, nutrition.category, nutrition.calories, nutrition.quantity, nutrition.imageUrl, user.email]
          )
          return result.rows[0]

    }
    static async fetchNutritionById(nutritionId){
        const results = await db.query(
            `
            SELECT nutrition.id,
                   nutrition.name,
                   nutrition.category,
                   nutrition.calories,
                   nutrition.quantity,
                   nutrition.image_url AS "imageUrl",
                   users.email AS "userEmail"
            FROM nutrition
                JOIN users ON users.id = nutrition.user_id
            WHERE nutrition.id = $1
            
            `,[nutritionId]
        
          )
      
          const post = results.rows[0]
          if (!post){
              throw new NotFoundError()
          }

          return post

    }


}

module.exports = Nutrition
