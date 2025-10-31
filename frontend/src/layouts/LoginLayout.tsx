import React, { useState, useEffect } from "react";
import { Redirect, Route, Switch } from 'react-router-dom';
import { IonRouterOutlet, IonImg, IonContent, IonIcon, IonButton, IonLabel, IonModal } from '@ionic/react';

import Login from '../pages/Login';
import Register from '../pages/Register';
import Admin from '../pages/Admin';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* File .css */
//import "./LoginLayout.css";

/**
 * Ionic Dark Mode
 * -----------------------------------------------------
 * For more info, please see:
 * https://ionicframework.com/docs/theming/dark-mode
 */

/* import '@ionic/react/css/palettes/dark.always.css'; */
/* import '@ionic/react/css/palettes/dark.class.css'; */
import '@ionic/react/css/palettes/dark.system.css';

/* Theme variables */
import '../theme/variables.css';

const LoginLayout: React.FC = () => {

  return(
    <>
    <IonRouterOutlet>
      <Switch>
        <Route exact path="/login"> <Login /> </Route>
        <Route exact path="/register"> <Register /> </Route>
        <Route exact path="/admin"> <Admin /> </Route>
        <Route exact path="/"> <Redirect to="/Login" /> </Route>
      </Switch>
    </IonRouterOutlet>
    </>
  );
};

export default LoginLayout;
