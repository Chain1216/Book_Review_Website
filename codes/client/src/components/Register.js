import React, {useState} from 'react'
import { userRegister } from '../fetcher'
import './Login.css';
import MenuBar from '../components/MenuBar';

const Register = () => {

  const [userName, setUserName] = useState()
  const [password, setPassword] = useState()

  const handleSubmit = async (e) => {
      e.preventDefault()
      // Store the new username and password in database for new user
      userRegister(userName,password)
      window.alert("Your have signed up! Please click the link below to log in!");
    }
  const handleClick = e => {
      e.preventDefault();
      window.location = `/dashboard`
    };

  return (

<div>
<MenuBar />
    <div className="App">  
      <h1 style={{fontFamily: 'Roboto',color: "#676767",fontSize: 40}}>
        Please Sign Up</h1>
      <form className="form" onSubmit={handleSubmit}>
        <div className="input-group">
          <label >Username</label>
          <input type="text" onChange={e => setUserName(e.target.value)} />
        </div>
        <div className="input-group">
          <label >Password</label>
          <input type="password" onChange={e => setPassword(e.target.value)} />
        </div>
        <div>
          <button className="primary" type="submit">Submit</button>
        </div>
        <div>
        <button className="secondary" onClick={handleClick}>
          Log In From Here
        </button>
        </div>
      </form>
    </div>
</div>
    
                
  )
}

export default Register