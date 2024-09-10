import React, { useState, useEffect } from 'react';
import { onAuthStateChanged } from "firebase/auth";
import { auth } from '../firebase';
import { NavLink, useNavigate } from 'react-router-dom';
import { db } from '../firebase';
import { onValue, ref } from 'firebase/database';


const Posts = () => {
    const navigate = useNavigate();
    const [username, setUsername] = useState("");

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
            
        });
    }, [])
    if(auth.authStateReady){
        if(auth.currentUser != null){
            return (
              <>

              </>
              
            );
      } else {
          return (
              <>

              </>   
              
            );
      }
    }

    

    
}

export default Posts;
