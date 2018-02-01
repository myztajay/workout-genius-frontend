import React from 'react';


const Login  = ({ loggedIn, logInWithFacebook, signUpWithFacebook, user }) => {
  
  return (
    <div>
      <h1> Login Component </h1>
      <h3>{user.display_name}</h3>
      <button onClick={logInWithFacebook}> Login with Facebook</button>
      <button onClick={signUpWithFacebook}> Sign up with Facebook</button>
    </div>
)
}


export default Login