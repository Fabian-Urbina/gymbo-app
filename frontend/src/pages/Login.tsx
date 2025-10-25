import React from "react";
import { useState } from 'react';
import { IonButton, IonContent, IonInput, IonPage, IonText } from "@ionic/react";
import { useHistory } from "react-router-dom";
import Header from '../components/Header';

const Login: React.FC = () => {
    const history = useHistory()
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
            alert('Login failed');
            //history.push("\login")
        }
        catch { 
            console.log("Login could not connect to backend");
        }
    };

    return (
        <IonPage>
        <Header title="Login" />
        <IonContent className="ion-padding">
        <IonText>Please write your credit card number and security code.</IonText>
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
