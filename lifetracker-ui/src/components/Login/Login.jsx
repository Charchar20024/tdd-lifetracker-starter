import * as React from "react"
import "./Login.css"

export default function Login() {
  const handleOnSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    setErrors((e) => ({ ...e, form: null }))

    try {
      const res = await axios.post(`http://localhost:3001/auth/login`, form)
      if (res?.data) {
        setAppState(res.data)
        setIsLoading(false)
        navigate("/portal")
      } else {
        setErrors((e) => ({ ...e, form: "Invalid username/password combination" }))
        setIsLoading(false)
      }
    } catch (err) {
      console.log(err)
      const message = err?.response?.data?.error?.message
      setErrors((e) => ({ ...e, form: message ? String(message) : String(err) }))
      setIsLoading(false)
    }
  }
    return (
      <div className="login-page">
        <div className="card">
          
          <h2>Login</h2>
          <div className="form">
          <div className="input-field">
            <label for="email">Email</label>
          <input className="email-field"
              type="email"
              name="email"
              placeholder="user@gmail.com"
              />
          </div>
          <div className="input-field">
          <label for="password">Password</label>
          <input className="password-field"
              type="password"
              name="password"
              placeholder="password"
              />
          </div>
          <button className="btn-login1" onClick={handleOnSubmit}>Login</button>
        </div>
      </div>
    </div>
    )
  } 