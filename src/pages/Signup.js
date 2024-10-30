import React, {useState} from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import {  createUserWithEmailAndPassword  } from 'firebase/auth';
import { auth, db } from '../firebase';
import { onValue, set, ref } from 'firebase/database';


const Signup = () => {
    const navigate = useNavigate();

    const [email, setEmail] = useState('')
    const [AccName, setAccName] = useState('');
    const [password, setPassword] = useState('');

    const accRef = ref(db, "users/");


    function isAccNameAvaible(){
      var isAvaible = 0;
        if(AccName.length > 0){
          onValue(accRef, (snapshot) => {
            snapshot.forEach((childSnapshot) => {
              if(AccName === childSnapshot.val()['userName']){
                isAvaible = 1;
              }
            })
          }, (error) => {
            console.log(error);
            isAvaible = 2;
          })
        } else{
          isAvaible = 3;
        }
        return isAvaible;
    }

    const onSubmit = async (e) => {
      e.preventDefault()

      if(isAccNameAvaible() === 0){
      console.log("awdwadaw");

        await createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            console.log(user);
            set(ref(db, 'users/' + userCredential.user.uid), 
          {
            userName: AccName,
            role: 'regular'
          })
            navigate("/login");
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorCode, errorMessage);
        });

      }
      

    }

  return (
    <>

        <div className='d-flex flex-column justify-content-center'>                                                                                        
            <form className='w-100 d-flex justify-content-center align-items-center flex-column'>                                                                                            
                <h2 className='mt-4 text-light'>Sign up</h2>  
                <input  className='form-control mt-3' style={{width: 300}} type="email" label="Email address" value={email} onChange={(e) => setEmail(e.target.value)} required placeholder="Email address"/>
                <input  className='form-control mt-3' style={{width: 300}} type="text" label="Account name" value={AccName} onChange={(e) => setAccName(e.target.value)} required placeholder="Account name"/>
                <input  className='form-control mt-3' style={{width: 300}} type="password" label="Create password" value={password} onChange={(e) => setPassword(e.target.value)} required placeholder="Password"/>
                <button className='btn btn-success mt-3 text-light' style={{width: 90}} type="submit" onClick={onSubmit}>Sign up</button>
                <p className="text-sm text-white text-center mt-2 text-light"><NavLink to="/login" >Sign in</NavLink></p>
            </form>
            <button onClick={isAccNameAvaible}>adadadad</button>                  
        </div>
    </>
  )
}

export default Signup