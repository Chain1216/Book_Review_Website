import React from 'react'
import Login from './Login'
import useToken from './UseToken';
import { useHistory } from "react-router-dom";

// Authentication page - Jump to UserFavPage only if the right username and password are given

const Dashboard = () => {

    let history = useHistory();

    const {token, setToken} = useToken() 

    if(!token) {    
        return <Login setToken={setToken} />
    }
        
    history.push("/userfav");

    return (<div>Dashboard</div>);
};


export default Dashboard