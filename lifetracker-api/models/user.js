const bcrypt = require("bcrypt")
const db = require("../db")
const { BCRYPT_WORK_FACTOR } = require("../config")

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
      const { email, password } = credentials

        const requiredFields = ["email", "password"]

      requiredFields.forEach((property) => {
      if (!credentials.hasOwnProperty(property)) {
        throw new BadRequestError(`Missing ${property} in request body.`)
      }
    })

    const user = await User.fetchUserByEmail(email)
    if (user) {
      const isValid = await bcrypt.compare(password, user.password)
      if (isValid) {
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
    
    const hashedPassword = await bcrypt.hash(credentials.password, BCRYPT_WORK_FACTOR)
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
        `, [credentials.username, hashedPassword, credentials.firstName, credentials.lastName, lowerCaseEmail]
      )

    const user = result.rows[0]
    
    return user
}
static async fetchUserByEmail(email) {
    if(!email){
      throw new BadRequestError("No email provided")
    }
    const query =`SELECT * FROM users WHERE email = $1`

    const result = await db.query(query, [email.toLowerCase()])

    const user = result.rows[0]

    return user
  }
}

module.exports = User