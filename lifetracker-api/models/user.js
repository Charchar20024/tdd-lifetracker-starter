const bcrypt = require("bcrypt")
const db = require("../db")

const { UnauthorizedError, BadRequestError } = require("../utils/errors")


class User{
    static makePublicUser(user) {
        return {
          id: user.id,
          username: user.username,
          password: user.password,
          firstName: user.first_name,
          lastName: user.last_name,
          email: user.email,
          createdAt: user.created_at,
        }
      }
    
    static async login(credentials){
        const requiredFields = ["email", "password"]
    requiredFields.forEach((property) => {
      if (!credentials.hasOwnProperty(property)) {
        throw new BadRequestError(`Missing ${property} in request body.`)
      }
    })

    const user = await User.fetchUserByEmail(credentials.email)
    if (user) {
      const isValid = await bcrypt.compare(credentials.password, user.password)
      if (isValid === true) {
        return User.makePublicUser(user)
      }
    }




     throw new UnauthorizedError("Invalid email or password combo")
    }


    static async register(credentials){
        const requiredFields = ["username", "password", "firstName", "lastName", "email"]
    requiredFields.forEach((property) => {
      if (!credentials.hasOwnProperty(property)) {
        throw new BadRequestError(`Missing ${property} in request body.`)
      }})
    
      
    const lowerCaseEmail = credentials.email.toLowerCase()

    const result = await db.query(
        `INSERT INTO users (
            username,
            password, 
            first_name, 
            last_name, 
            email
            )
         VALUES ($1, $2, $3, $4, $5)
         RETURNING id, username, password, first_name, last_name, email, created_at;
        `, [credentials.username, credentials.password, credentials.firstName, credentials.lastName, lowerCaseEmail]
      )

    const user = result.rows[0]
    
    return user
}
static async fetchUserByEmail(email) {
    const result = await db.query(
      `SELECT id,
              username,
              password, 
              first_name AS "firstName",
              last_name AS "lastName",
              email,
              created_at           
           FROM users
           WHERE email = $1`,
      [email.toLowerCase()]
    )

    const user = result.rows[0]

    return user
  }}

module.exports = User