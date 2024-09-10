import React, { useState, useEffect } from 'react';
import { onAuthStateChanged } from "firebase/auth";
import { auth } from '../firebase';
import { NavLink, useNavigate } from 'react-router-dom';
import { db } from '../firebase';
import { onValue, ref } from 'firebase/database';


const NavControl = () => {
    const navigate = useNavigate();
    const [username, setUsername] = useState("");

    function handleLogout(){
        auth.signOut();
    }
    function getusername(){

        const username = ref(db, 'users/' + auth.currentUser.uid + '/userName');
        var data = null;
        onValue(username, (snapshot) => {
            data = snapshot.val();
            console.log(data);
            setUsername(data);
            //navigate('/');
        })
        
    }
    useEffect(() => {
        auth.onAuthStateChanged(() => {
            if(auth.currentUser != null){
                getusername();
            }
            
            navigate('/');
        });
    }, [])
    if(auth.authStateReady){
        if(auth.currentUser != null){
            return (
              <>
                  <nav className="w-100 navbar navbar-expand-lg navbar-light bg-light ps-2 pe-2 border border-bottom-1 border-top-0 border-start-0 border-end-0 border-dark sticky-top">
                  <div className="collapse navbar-collapse d-flex justify-content-between" id="navbarNav">
                      <ul className="navbar-nav">
                          <li className='nav-item'><img className='navLogo' alt='logo' src={require("../images/logo.png")}/></li>
                          <li className="nav-item">
                              <a className="nav-link text-center" href="#">Home</a>
                          </li>
                          <li className="nav-item">
                              <a className="nav-link text-center" href="#">Features</a>
                          </li>
                          
                      </ul>
                      
                      <ul className='navbar-nav'>
                          <li class="nav-item dropdown">
                              <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">{username}</a>
                              <ul class="dropdown-menu">
                                  <li><button class="dropdown-item" onClick={handleLogout}>Sign out</button></li>
                              </ul>   
                          </li>
                      </ul>
      
                  </div>
              </nav>
              </>
              
            );
      } else {
          return (
              <>
                  <nav className="w-100 navbar navbar-expand-lg navbar-light bg-light ps-2 pe-2 border border-bottom-1 border-top-0 border-start-0 border-end-0 border-dark sticky-top">
                  <div className="collapse navbar-collapse d-flex justify-content-between" id="navbarNav">
                      <ul className="navbar-nav">
                          <li className='nav-item'><img className='navLogo' alt='logo' src={require("../images/logo.png")}/></li>
                          <li className="nav-item">
                              <a className="nav-link text-center" href="#">Home</a>
                          </li>
                          <li className="nav-item">
                              <a className="nav-link text-center" href="#">Features</a>
                          </li>
                          
                      </ul>
                      
                      <ul className='navbar-nav'>
                          <li className="nav-item">
                              <a className="nav-link" href="./Login">Sing in</a>
                          </li>
                      </ul>
      
                  </div>
              </nav>
              </>   
              
            );
      }
    }

    

    
}

export default NavControl;
