import React, {useState} from 'react';
import {  signInWithEmailAndPassword   } from 'firebase/auth';
import { auth } from '../firebase';
import { NavLink, useNavigate } from 'react-router-dom'

const Login = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [valid, isValid] = useState(0);

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
            isValid(1);
        });

    }

    return(
        <>
            <div className='d-flex flex-column justify-content-center'>                                            
                               
                    <form className='w-100 d-flex justify-content-center align-items-center flex-column'>        
                            <h2 className='mt-4 text-light'>Sign in</h2>                                              
                            <input id="email-address" className='form-control mt-3' style={{width: 300}} name="email" type="email" required placeholder="Email address" onChange={(e)=>setEmail(e.target.value)}/>
                            <input id="password" className='form-control mt-3' style={{width: 300}} name="password" type="password" required placeholder="Password" onChange={(e)=>setPassword(e.target.value)}/>
                            <button className='btn btn-success mt-3 text-light' style={{width: 80}} onClick={onLogin}>Login</button>   

                            <p className="text-sm text-white text-center mt-2 text-light"><NavLink to="/signup">Sign up</NavLink></p>                           
                    </form>

            </div>
            {valid === 1 && 
                <div class="alert alert-danger w-25 position-absolute top-0 start-0 mt-2 ms-2" role="alert">Email or password is/are incorrect!</div>
            }
        </>
    )
}

export default Login