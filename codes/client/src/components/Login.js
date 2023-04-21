
import React, {useState} from 'react'
import PropTypes from 'prop-types'
import { getUserInfo } from '../fetcher'
import './Login.css';
import MenuBar from '../components/MenuBar';

async function GetUserInfo(userName,password) {
  return getUserInfo(userName,password);
}

const Login = ({setToken}) => {

  const [userName, setUserName] = useState()
  const [password, setPassword] = useState()

  const handleSubmit = async (e) => {
      e.preventDefault()
      // Validate user and password info in database
      GetUserInfo(userName,password).then(res =>{
        const token=res.results[0]
        if (token !== undefined){
          setToken(token);
        } else{
          window.alert("Your username or password is wrong; Please try again.");
        }        
      })
    }
   // Jump to Register page
   const handleClick = e => {
      e.preventDefault();
      window.location = `/register`
    };

  return (
<div>
<MenuBar />
    <div className="App">     
      <h1 style={{fontFamily: 'Roboto',color: "#676767",fontSize: 40}}>
        Please Log In </h1>
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
          Sign Up From Here
        </button>
      </div>
      </form>

    </div>
  </div>
                
  )
}

Login.propTypes = {
  setToken: PropTypes.func.isRequired
};

export default Login