import React, {useState} from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import {  createUserWithEmailAndPassword  } from 'firebase/auth';
import { auth } from '../firebase';

const Signup = () => {
    const navigate = useNavigate();

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('');

    const onSubmit = async (e) => {
      e.preventDefault()

      await createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed in
            const user = userCredential.user;
            console.log(user);
            navigate("/login")
            // ...
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorCode, errorMessage);
            // ..
        });


    }

  return (
    <>

        <div className='d-flex flex-column justify-content-center'>                                                                                        
            <form className='w-100 d-flex justify-content-center align-items-center flex-column'>                                                                                            
                <h2 className='mt-4'>Sign up</h2>  
                <input  className='form-control mt-3' style={{width: 300}} type="email" label="Email address" value={email} onChange={(e) => setEmail(e.target.value)} required placeholder="Email address"/>
                <input  className='form-control mt-3' style={{width: 300}} type="password" label="Create password" value={password} onChange={(e) => setPassword(e.target.value)} required placeholder="Password"/>
                <button className='btn btn-success mt-3' style={{width: 80}} type="submit" onClick={onSubmit}>Sign up</button>
                <p className="text-sm text-white text-center mt-2"><NavLink to="/login" >Sign in</NavLink></p>
            </form>
                                       
        </div>
    </>
  )
}

export default Signup