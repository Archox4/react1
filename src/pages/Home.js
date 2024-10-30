import React, { useState, useEffect } from 'react';
import { onAuthStateChanged } from "firebase/auth";
import { auth } from '../firebase';
import  NavControl  from './NavControl';
import Posts from './Posts';

const Home = () => {

    useEffect(()=>{
        onAuthStateChanged(auth, (user) => {
            if (user) {
              const uid = user.uid;
              console.log("uid", uid)
            } else {
              console.log("user is logged out")
            }
          });

    }, [])

  return (
    <>        
        <head>
          <link rel="preconnect" href="https://fonts.googleapis.com"/>
          <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin/>
          <link href="https://fonts.googleapis.com/css2?family=Ubuntu:ital,wght@0,300;0,400;0,500;0,700;1,300;1,400;1,500;1,700&display=swap" rel="stylesheet"/>
        </head>
        <NavControl/>
        <Posts/>
        <div>

        </div>

    </>
  )
}

export default Home