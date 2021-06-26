import React, {useEffect, useState } from 'react';
import './App.css';
import {NavBar} from './layouts';
import {Login, Signup} from './auth'
import { Customer } from './views'


function App() {

  const [user, setUser] = useState()
  const [toggleForm, setToggleForm] = useState(true)

  const activeForm = () => {
    setToggleForm(!toggleForm)
  }

  const userState = () => {
    const data = localStorage.getItem('user');
    const users = data !== null ? JSON.parse(data) : null;
    setUser(users);
  }

  useEffect(() => {
    userState();
  }, [])
  return (
    <>
    {
      user !== null ? (
        <>
          <NavBar setUserState={() => setUser(null) }/>
          <Customer/>
        </>
      ) : (
        <>
    {
      toggleForm ? (<Login loggedIn={(user) => setUser(user)} toggle={() => activeForm()}/>) 
      : (<Signup toggle={() => activeForm()}/>)
    }
      
    </>
      )
    }
    </>
    
  );
}

export default App;