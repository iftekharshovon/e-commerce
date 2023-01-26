
import React, { useContext, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../Context/UserContext';
import './Login.css';

const Login = () => {

    const {signIn, signInGoogle} = useContext(AuthContext);
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || '/'

    const [error,setError] = useState(null);
    const handleSubmit = (event) =>{
        event.preventDefault();
        const form = event.target;
        const email = form.email.value;
        const password = form.password.value;

        if (password.length<6) {
            setError('Password is too short!')
            return;
        }

        signIn(email,password)
        .then(result=> {
            const user = result.user;
            console.log(user);
            form.reset();
            navigate(from,{replace:true});
        })
        .catch(error => console.error(error));
        
    }

    const handleGoogleSignIn = () =>{
        signInGoogle()
        .then(result => {
            const user = result.user;
            console.log(user);
            navigate(from,{replace:true});
        })
        .catch(err => console.error(err));
    }

    return (
        <div className='form-conatiner'>
            <h2 className='form-title'>Login</h2>
            <form onSubmit={handleSubmit} action="">
                <div className="form-control">
                    <label htmlFor="email">Email</label><input placeholder='email' type="email" name='email' required/>
                </div>
                <div className="form-control">
                    <label htmlFor="password">Password</label><input placeholder='password' type="password" name='password' required/>
                </div>
                <p className='text-error'>{error}</p>
                <input type="submit" value="Login" className='btn-submit' />
                
            </form>
            <p>New here?<Link to='/signup'>Create New Account!</Link></p>
            <button onClick={handleGoogleSignIn} type="submit">Google</button>

        </div>
    );
};

export default Login;