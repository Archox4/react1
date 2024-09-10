import React, {useState} from 'react';
import {  signInWithEmailAndPassword   } from 'firebase/auth';
import { auth } from '../firebase';
import { NavLink, useNavigate } from 'react-router-dom'

const Login = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const onLogin = (e) => {
        e.preventDefault();
        signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed in
            const user = userCredential.user;
            navigate("/")
            console.log(user);
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorCode, errorMessage)
        });

    }

    return(
        <>
            <div className='d-flex flex-column justify-content-center'>                                            
                               
                    <form className='w-100 d-flex justify-content-center align-items-center flex-column'>        
                            <h2 className='mt-4'>Sign in</h2>                                              
                            <input id="email-address" className='form-control mt-3' style={{width: 300}} name="email" type="email" required placeholder="Email address" onChange={(e)=>setEmail(e.target.value)}/>
                            <input id="password" className='form-control mt-3' style={{width: 300}} name="password" type="password" required placeholder="Password" onChange={(e)=>setPassword(e.target.value)}/>
                            <button className='btn btn-success mt-3' style={{width: 80}} onClick={onLogin}>Login</button>   

                            <p className="text-sm text-white text-center mt-2"><NavLink to="/signup">Sign up</NavLink></p>                           
                    </form>

            </div>
        </>
    )
}

export default Login