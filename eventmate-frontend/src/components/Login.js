import { useState } from "react"
import { createToken, storeToken } from "../tokenLogic/tokenLogic";
import { useNavigate } from "react-router-dom";
import '../App.css'

export default function Login() {

  const navigate = useNavigate()

  const [userCredentials, setUserCredentials] = useState({
    username: "",
    password: ""
  })

  // State to trigger invalid username message to appear
  const [isError, setIsError] = useState(false);


  const [showPassword, setShowPassword] = useState(false)

  function handleTextInput(e) {
    setUserCredentials({ ...userCredentials, [e.target.name]: e.target.value });
  }


  function isUserAuthenticated(e) {
    //Stops page refreshing
    e.preventDefault()
    // Creates a token takes the userCredentials as a parameter so it can be used in the backend to confirm the user has an account
    createToken(userCredentials)
      // Converts to Json
      .then((response) => response.json())
      .then((token) => {
        // Stores just the token in local storage
        storeToken(token.token)
        // If the token is created successfully navigate the user to the homepage else change the state isError which will bring up a message on the screen
        if (token.success) navigate('/')
        else setIsError(true)
      })
  }

  return (
    <div className="auth-page">
      <h2>LOGIN</h2>
      <div className={isError ? "error-message" : "error-message-false"}>
        Please Enter Valid Credentials
      </div>
      <div className="sign-up-div">
        <form onSubmit={(e) => { isUserAuthenticated(e) }}>
          <div className="auth-form-username-container">
            <label className="auth-username">Username</label>
            <input
              name='username'
              placeholder="Enter Your Username"
              required
              autoComplete="off"
              value={userCredentials.username}
              onChange={handleTextInput}
            />
          </div>
          <div className="auth-form-password-container">
            <label className="auth-password">Password</label>
            <input
              name='password'
              type='password'
              placeholder="Enter Your Password"
              required
              autoComplete="off"
              value={userCredentials.password}
              onChange={handleTextInput}
            />
          </div>
          {/* <button type="button" onClick={() => setShowPassword(!showPassword)}>
            {showPassword ? '👀' : '🙈'}
          </button> */}
          <button className="normal-btn auth-btn" type="submit">Login</button>
        </form>
      </div>
    </div>
  )
}

