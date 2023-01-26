import React, { useContext, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../Context/UserContext';
import './Signup.css'

const Signup = () => {
    const [error,setError] = useState(null);
    const {createUser, signInGoogle} = useContext(AuthContext);
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || '/'

const handleSubmit =(event)=>{
    event.preventDefault();
    const form =event.target;
    const email = form.email.value;
    const password = form.new.value;
    const confirm = form.confirm.value;
    

    if (password.length<6) {
        setError('Password is too short!')
        return;
    }
    if (password !== confirm) {
        setError('Password does not match!')
        return;
    } 
     createUser(email,password)
     .then(result=>{
        const user = result.user;
        console.log(user);
        form.reset();
        navigate('/');
     })
     .catch(error => console.error(error));

}

const handleGoogleSignIn = () =>{
    signInGoogle()
    .then(result => {
        const user = result.user;
        console.log(user);
        navigate(from,{replace:true});
    }).catch(err => console.error(err));
}

    return (
        <div className='form-conatiner'>
        <h2 className='form-title'>Sign Up</h2>
        <form onSubmit={handleSubmit} action="">
            <div className="form-control">
                <label htmlFor="email">Email</label><input placeholder='email' type="email" name='email' required/>
            </div>
            <div className="form-control">
                <label htmlFor="New">New Password</label><input placeholder='password' type="password" name='new' required/>
                

            </div>
            <div className="form-control">
                <label htmlFor="confirm">Confirm Password</label><input placeholder='confirm password' type="password" name='confirm' required/>
            </div>
            <p className='text-error'>{error}</p>

            <input type="submit" value="Signup" className='btn-submit' />
        </form>
        <p>Already Have an Account?<Link to='/login'>Login!</Link></p>

        <button onClick={handleGoogleSignIn} type="submit">Google</button>

    </div>
    );
};

export default Signup;