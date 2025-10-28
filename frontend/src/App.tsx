import React, { useState, useEffect } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import { IonApp, IonRouterOutlet, setupIonicReact } from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import { useIonRouter } from "@ionic/react";
import { useHistory } from "react-router-dom";

import AppLayout from "./layouts/AppLayout";
import LoginLayout from "./layouts/LoginLayout";

/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

/* Optional CSS utils */
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";

/* Ionic Dark Mode */
import "@ionic/react/css/palettes/dark.system.css";

/* Theme variables */
import "./theme/variables.css";

/* File .css */
import "./App.css";

setupIonicReact();

const App: React.FC = () => {
  // These are for redirecting or cleaning navigation stack, for native and web app
  const router = useIonRouter()
  const history = useHistory();
  const [isLoggedIn, setIsLoggedIn] = useState(false) 
  const [token, setToken] = useState(localStorage.getItem("GYMBO_ACCESS_TOKEN"))


  useEffect(() => {
    const validate = async() =>{
      if (!token) {return false}

      try {
        const res = await fetch("http://localhost:8000/api/auth/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token }), 
        })
        const data = await res.json();
        setIsLoggedIn(data.valid);
      }  
      catch (error) {
        console.log("Login could not connect to backend");
        return false;
      }
    }
    validate()}, [token]);
  
// REMEMBER TO CHANGE THIS SO THE TOKEN IS VERIFIED, ALSO WE NEED TO IDENTIFY USERNAME

  const onLogout = () => {
    localStorage.removeItem("GYMBO_ACCESS_TOKEN");
    setIsLoggedIn(false);
    window.location.href = "/login"; // forces browser to load login fresh
    router.push("/login", "root"); // makes /login the root page
    history.replace("/login", "root"); // makes /login the root page
  };

  return (
    <IonApp>
      <IonReactRouter>
        <IonRouterOutlet key={isLoggedIn ? "logged" : "logged-out"}>
          <Switch>
            <Route exact path="/login"> {!isLoggedIn ? <LoginLayout /> : <Redirect to="/home" />} </Route>
            <Route exact path="/register"> {!isLoggedIn ? <LoginLayout /> : <Redirect to="/home" />} </Route>
            <Route path="/"> {isLoggedIn ? <AppLayout onLogout={onLogout} /> : <Redirect to="/login" push={false}/>} </Route>
          </Switch>
        </IonRouterOutlet>
        <div className="copyright"> © 2025 Zenden Solutions </div>
      </IonReactRouter>
    </IonApp>
  );
};

export default App;
