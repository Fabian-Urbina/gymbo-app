import React, { useState } from "react";
import { Redirect, Route, Router, Switch } from 'react-router-dom';
import { IonTabs, IonRouterOutlet, IonTabBar, IonTabButton, IonIcon, IonButton, IonLabel, IonModal,useIonRouter } from '@ionic/react';
import { statsChart, barbell, person } from 'ionicons/icons';

import Home from '../pages/Home';
import Workouts from '../pages/Workouts';
import Profile from '../pages/Profile';
import Chat from '../components/Chat';
import SettingsMenu from '../components/SettingsMenu';

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
import "./AppLayout.css";

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

interface AppLayoutProps {
  onLogout: () => void;
}

const AppLayout: React.FC<AppLayoutProps> = ({onLogout}) => {
  const [showChat, setShowChat] = useState(false); {/* Persistant chat state among pages */}
  const [messages, setMessages] = useState<string[]>(["🤖 Gymbo: Welcome! I'm your AI gym assistant. Let's get started!"]);
  const router = useIonRouter();

  return(
    <>
    <IonTabs>
        <IonRouterOutlet>
          <Switch>
            <Route exact path="/home"> <Home /> </Route>
            <Route exact path="/workouts"> <Workouts /> </Route>
            <Route exact path="/profile"> <Profile /> </Route>
            <Route path="/"> <Redirect to="/home" /> </Route>
          </Switch>
        </IonRouterOutlet>
        
        <SettingsMenu className="settings-menu" onLogout={onLogout} onChangeUserData={()=> router.push("/profile", "root")}/>

        <IonTabBar slot="bottom" className="app-tab-bar">
            <IonTabButton tab="home" href="/home"> <IonIcon icon={person}/> <IonLabel>Home</IonLabel> </IonTabButton>
            <IonTabButton tab="workouts" href="/workouts"> <IonIcon icon={barbell}/> <IonLabel>Workouts</IonLabel> </IonTabButton>
            <IonTabButton tab="profile" href="/profile"> <IonIcon icon={statsChart}/> <IonLabel>Profile</IonLabel> </IonTabButton>
        </IonTabBar>

    </IonTabs>

    <div className="gymbo-floating-btn" onClick={() => setShowChat(true)}>
        <span className="gymbo-emoji">🤖</span>
    </div>

    <IonModal isOpen={showChat} onDidDismiss={() => setShowChat(false)}>
        <Chat initialMessages={messages} onClose={(newMessages) => setMessages(newMessages)} />
        <IonButton onClick={() => setShowChat(false)}>Close Chat</IonButton>
    </IonModal>
    </>
  );
};

export default AppLayout;
