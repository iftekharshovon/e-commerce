import React, { createContext, useEffect, useState } from 'react';
import {createUserWithEmailAndPassword, getAuth, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut} from "firebase/auth";
import app from '../Firebase/firebase.config';


export const AuthContext = createContext();
const auth = getAuth(app);

const UserContext = ({children}) => {
    const googleProvider = new GoogleAuthProvider(); 
    const [user, setUser]= useState(null);
    const [loading, setLoading] = useState(true);

    const createUser = (email, password) =>{
        return createUserWithEmailAndPassword(auth,email, password);
    }

    const signIn =(email,password) =>{
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password);
    }

    const signInGoogle = () =>{
        return signInWithPopup(auth, googleProvider);

    }

    const logOut = ()=>{
        return signOut(auth)
    }

    useEffect(()=> {
      const unSubscribe =  onAuthStateChanged(auth, currentUser =>{
            console.log('current User inside state change', currentUser);
            setUser(currentUser); 
            setLoading(false);
        });
        return () => unSubscribe();
    },[])

    const authinfo ={user,loading, createUser, signIn,signInGoogle, logOut};
    return (
        <div>
            <AuthContext.Provider value={authinfo}>
                {children}
            </AuthContext.Provider>
        </div>
    );
};

export default UserContext;