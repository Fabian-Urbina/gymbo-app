import React from "react";
import { useState } from 'react';
import { IonButton, IonContent, IonImg, IonInput, IonPage, IonText } from "@ionic/react";
import { useHistory } from "react-router-dom";
import Header from '../components/Header';
import { useIonRouter } from "@ionic/react";
import myImage from '../assets/gymbo-login.png';

const Login: React.FC = () => {
    const history = useHistory()
    const router = useIonRouter()
    async function login(formData: FormData)  {
        const userData = Object.fromEntries(formData.entries());
        console.log(JSON.stringify(userData));
        try {
            const res = await fetch("http://localhost:8000/api/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(userData)
            })
            const data = await res.json();
            console.log("Connected");
            console.log(data.reply)
            localStorage.setItem("GYMBO_ACCESS_TOKEN", "12345"); // Stores the token
            window.location.href = "/login"; // forces browser to load login fresh
            router.push("/login", "root"); // makes /login the root page
            history.replace("/login", "root"); // makes /login the root page
        }
        catch { 
            console.log("Login could not connect to backend");
        }
    };

    return (
        <IonPage>
        <Header title="Login" />
        <IonContent className="ion-padding">
        <div> <IonImg src={myImage} style={{ width: "50%", display: "block", marginLeft: "auto", marginRight: "auto",}} /></div>
        <form action={login}>
            <div> <IonInput name="username" type="text" placeholder="Type your username"/> </div> 
            <div> <IonInput name="password" type="password" placeholder="Type your password"/> </div>
            <IonButton type="submit">Login</IonButton>
        </form>
        <IonButton onClick={() => history.push("register")}>Register</IonButton>
        <IonButton >Forgot Password?</IonButton>
        </IonContent>
        </IonPage> 
    );
};

export default Login;
