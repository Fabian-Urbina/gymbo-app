import React from "react";
import { useState } from 'react';
import { IonButton, IonContent, IonInput, IonPage, IonImg } from "@ionic/react";
import { Redirect } from 'react-router-dom';
import { useHistory } from "react-router-dom";
import Header from "../components/Header"
import GymboLoginImage from "../assets/gymbo-login.png"

const isPasswordValid = (password: string) => {
  return /\d/.test(password) && password.length >= 8;
};

const verifyPasswordMatches = (password: string, verifyPassword: string) => {
  return password===verifyPassword;
};

const Register: React.FC = () => {
    const history = useHistory()
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [verifyPassword, setVerifyPassword] = useState('');

    async function register()  {
        const userData = {username, password, verifyPassword}
        console.log(JSON.stringify(userData));
        try {
            const res = await fetch("http://localhost:8000/api/register", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(userData)
            })
            const data = await res.json();
            console.log("Connected");
            console.log(data.reply)
            alert('Login failed');
            //history.push("\login")
        }
        catch { 
            console.log("Register could not connect to backend");
        }
    };

    return (
        <IonPage>
        <Header title="Register" />
        <IonContent className="ion-padding" style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", minHeight: "100vh", gap:"2rem" }}>
        <IonImg src={GymboLoginImage} style={{ width: "90%", maxWidth: "300px", height: "auto", margin: "0 auto 2rem auto"}} />
        <div style={{display:"flex", flexDirection:"column", alignItems:"center", gap:"1rem"}}>
            {/*Username and password fields */}
            <div style={{display: "flex", flexDirection: "column", alignItems: "center", gap: "1rem", width: "80%", maxWidth: "400px"}}>
                <IonInput label="Username" value={username} onIonChange={e => setUsername(e.detail.value!)} labelPlacement="floating" fill="outline" type="text" />
                <IonInput label="Password" value={password} onIonChange={e => setPassword(e.detail.value!)} labelPlacement="floating" fill="outline" type="password" />
                {password && !isPasswordValid(password) ? (
                    <div style={{ color: "red", fontSize: "0.8rem", marginTop: "0.25rem" }}>
                        Password must be at least 8 characters and include a number
                    </div>):""}
                <IonInput label="Verify password" value={password} onIonChange={e => setVerifyPassword(e.detail.value!)} labelPlacement="floating" fill="outline" type="password" />
                {password && verifyPassword && !verifyPasswordMatches(password, verifyPassword) ? (
                    <div style={{ color: "red", fontSize: "0.8rem", marginTop: "0.25rem" }}>
                        Passwords do not coincide
                    </div>):""}
            </div>

            {/*Login button */}
            <IonButton onClick={register} disabled={!username || !isPasswordValid(password) || !verifyPasswordMatches(password,verifyPassword)}> Register </IonButton> 

            {/*Register/Forgot buttons */}
            <div style={{display:"flex", justifyContent:"center", gap:"1rem"}}>
                <IonButton onClick={() => history.push("login")} fill="clear" style={{minWidth:"auto"}}>Have an account?</IonButton>
            </div>
        </div>
        </IonContent>
        </IonPage> 
    );
};

export default Register;