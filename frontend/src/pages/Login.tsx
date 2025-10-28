import React from "react";
import { useState } from 'react';
import { IonButton, IonContent, IonImg, IonInput, IonPage, IonText } from "@ionic/react";
import { useHistory } from "react-router-dom";
import { useIonRouter } from "@ionic/react";
import Header from "../components/Header"
import GymboLoginImage from '../assets/gymbo-login.png';

const Login: React.FC = () => {
    const history = useHistory()
    const router = useIonRouter()

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    async function login()  {
        const userData = {username, password}
        console.log(JSON.stringify(userData));
        try {
            const res = await fetch("http://localhost:8000/api/auth/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(userData)
            })
            const data = await res.json();
            console.log("Connected");
            console.log(data.reply)
            alert(data.reply)
            localStorage.setItem("GYMBO_ACCESS_TOKEN", data.token); // Stores the token
            localStorage.setItem("USER_DATA",JSON.stringify(data.user_data))
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
    <IonContent className="ion-padding" style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", minHeight: "100vh", gap:"2rem" }}>
        <IonImg src={GymboLoginImage} style={{ width: "90%", maxWidth: "300px", height: "auto", margin:  "0 auto 2rem auto"}} />
        <div style={{display:"flex", flexDirection:"column", alignItems:"center", gap:"1rem"}}>
            {/*Username and password fields */}
            <div style={{display: "flex", flexDirection: "column", alignItems: "center", gap: "1rem", width: "80%", maxWidth: "400px"}}>
                <IonInput label="Username" value={username} onIonChange={e => setUsername(e.detail.value!)} labelPlacement="floating" fill="outline" type="text" />
                <IonInput label="Password" value={password} onIonChange={e => setPassword(e.detail.value!)} labelPlacement="floating" fill="outline" type="password" />
            </div>

            {/*Login button */}
            <IonButton onClick={login}> Login </IonButton> 

            {/*Register/Forgot buttons */}
            <div style={{display:"flex", justifyContent:"center", gap:"1rem"}}>
                <IonButton onClick={() => history.push("register")} fill="clear" style={{minWidth:"auto"}}>Register</IonButton>
                <IonButton fill="clear" style={{minWidth:"auto"}}>Forgot?</IonButton>
            </div>
        </div>
    </IonContent>
</IonPage>
    );
};

export default Login;
