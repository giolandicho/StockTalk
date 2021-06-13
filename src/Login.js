import React from 'react'
import "./Login.css"
import Button from '@material-ui/core/Button';
import { auth, provider } from "./firebase"
import logo from "./logo.png"

function Login() {
    const signIn = ()=>{
        auth.signInWithPopup(provider).catch((error) =>alert(error.message))
    }
    return (
        <div className="login">
            <div className="login_logo">
                <img src={logo}
                    alt=""/>
            </div>
            <Button onClick={signIn}>Sign In</Button>
        </div>
    )
}

export default Login
