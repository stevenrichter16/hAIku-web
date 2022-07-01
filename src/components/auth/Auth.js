import {React, useState, useEffect } from 'react';
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Button from '@mui/material/Button';
import { useDispatch, useSelector } from 'react-redux';
import { setEmail, setPassword } from '../../redux/userSlice';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

const Auth = () => {

    const dispatch = useDispatch()

    const email = useSelector((state) => state.user.email)
    const password = useSelector((state) => state.user.password)

    const onLogin = () => {
        console.log("ON LOGIN")
        const auth = getAuth();
        signInWithEmailAndPassword(auth, '#', '#')
        .then((userCredential) => {
            // Signed in 
            const user = userCredential.user;
            console.log("Signed in", userCredential.user)
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
        });
    }

    const onRegister = () => {
        console.log("ON REGISTER")
    }

    return (
        <Box sx={{display:'flex', flexDirection:'row', justifyContent:'flex-end'}}>
            <Box sx={{flexDirection:'column'}}>
                <Button sx={{backgroundColor:'blue', color:'white'}} onClick={onLogin}>Login</Button>
            </Box>
            <Box sx={{flexDirection:'column'}}>
                <Button sx={{backgroundColor:'blue', color:'white'}} onClick={onRegister}>Register</Button>
            </Box>
        </Box>
    )
}

export default Auth;