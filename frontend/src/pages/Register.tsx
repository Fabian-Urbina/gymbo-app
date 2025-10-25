import React from "react";
import { useState } from 'react';
import { IonButton, IonContent, IonInput, IonPage, IonText } from "@ionic/react";
import { Redirect } from 'react-router-dom';

const Register: React.FC = () => {
    const [registered, setRegistered] = useState(false) // I don't think this is the correct form to handle this

    async function register(formData: FormData)  {
        const userData = Object.fromEntries(formData.entries());
        console.log(JSON.stringify(userData));
        try {
            const res = await fetch("http://localhost:8000/api/register", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(userData)
            })
            const data = await res.json();
            console.log("Connected");
            setRegistered(true)
        }
        catch { 
            console.log("Register could not connect to backend");
        }
    };

    if (registered) {
        return <Redirect to="/userdata" />;
    }

    return (
        <IonPage>
        <IonContent className="ion-padding">
        <IonText>Please write your credit card number and security code.</IonText>
        <form action={register}>
            <div> <IonInput name="username" type="text" placeholder="Type your username"/> </div> 
            <div> <IonInput name="password" type="password" placeholder="Type your password"/> </div>
            <IonButton type="submit">Register</IonButton>
        </form>
        </IonContent>
        </IonPage> 
    );
};

export default Register;