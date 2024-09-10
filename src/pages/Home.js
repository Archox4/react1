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
        <NavControl/>
        <Posts/>
        <div>

        </div>

    </>
  )
}

export default Home