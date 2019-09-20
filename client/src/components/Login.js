import React, { useState } from "react";
import { axiosWithAuth } from '../axiosWithAuth';


const Login = ({ history }) => {
  // make a post request to retrieve a token from the api
  // when you have handled the token, navigate to the BubblePage route
    const [credentials, setCredentials] = useState({
      username: "",
      password: ""
    });
  
    const handleChange = e => {
      setCredentials({ ...credentials, [e.target.name]: e.target.value });
    };
  
    const handleSubmit = e => {
      e.preventDefault();

      axiosWithAuth()
        .post(`http://localhost:5000/api/login`, credentials)
        .then(res => {
          localStorage.setItem("token", res.data.payload);
          history.push("/bubble-page");
        }) 
        .catch(err => console.log("login error ", err));
        setCredentials({ username:'', password:'' })

    };
  return (
    <>
      <h1>Welcome to the Bubble App!</h1>
      {/* <p>Build a login page here</p> */}

      <form onSubmit={handleSubmit}>
      <input
       type="text" 
       value={credentials.username}
      //  id="username" 
       name="username" 
       placeholder="Username" 
       onChange={handleChange}
        />
        <input 
        type="password" 
        value={credentials.password}
        // id="password" 
        name="password" 
        placeholder="Password"
         onChange={handleChange} 
         />
        <button type="submit">Login</button>
        </form>
    </>
  );
};
 
export default Login;
