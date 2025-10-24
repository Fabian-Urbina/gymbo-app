import React, { useState, useEffect } from "react";
import { Redirect, Route } from 'react-router-dom';
import { IonApp, IonTabs, IonRouterOutlet, setupIonicReact, IonTabBar, IonTabButton, IonIcon, IonButton, IonLabel, IonModal } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { statsChart, barbell, person } from 'ionicons/icons';

import Login from './pages/Login';
import Home from './pages/Home';
import UserData from './pages/UserData';
import Chat from './components/Chat';
import ProtectedRoute from './components/ProtectedRoute';

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
import './theme/variables.css';

setupIonicReact();

const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Example: check if token exists in localStorage
  useEffect(() => {
    const token = localStorage.getItem('access_token');
    setIsAuthenticated(!!token);
  }, []);

  const [showChat, setShowChat] = useState(false); {/* Persistant chat state among pages */}
  const [messages, setMessages] = useState<string[]>(["🤖 Gymbo: Welcome! I'm your AI gym assistant. Let's get started!"]);

  return(
  
  <IonApp>
    <IonReactRouter>
      <IonTabs>
        
        <IonRouterOutlet>

          <Route path="/login">
            <Login setIsAuthenticated={setIsAuthenticated} />
          </Route>

          {/* Any protected page */}
          <ProtectedRoute path="/home" isAuthenticated={isAuthenticated} component={Home} />
          <ProtectedRoute path="/userdata" isAuthenticated={!isAuthenticated} component={UserData} />
          <ProtectedRoute path="/other2" isAuthenticated={!isAuthenticated} component={UserData} />

          <Route exact path="/">
            <Redirect to={!isAuthenticated ? "/home" : "/login"} />
          </Route>

        </IonRouterOutlet>

        {/* Navigation Bar */}
        <IonTabBar slot="bottom">
          <IonTabButton tab="home" href="/home">
            <IonIcon icon={statsChart} />
            <IonLabel>Performance</IonLabel>
          </IonTabButton>

          <IonTabButton tab="userdata" href="/userdata">
            <IonIcon icon={barbell} />
            <IonLabel>User Data</IonLabel>
          </IonTabButton>

          <IonTabButton tab="login" href="/login">
            <IonIcon icon={barbell} />
            <IonLabel>Login</IonLabel>
          </IonTabButton>

          <IonTabButton tab="other2" href="/other2">
            <IonIcon icon={person} />
            <IonLabel>Other 2</IonLabel>
          </IonTabButton>
        </IonTabBar>
      </IonTabs>

      {/* Floating Gymbo! button */}

{!isAuthenticated && (
  <div className="gymbo-floating-btn" onClick={() => setShowChat(true)}>
    <span className="gymbo-emoji">🤖</span>
  </div>
)}

      <IonModal isOpen={showChat} onDidDismiss={() => setShowChat(false)}>
        <Chat initialMessages={messages} onClose={(newMessages) => setMessages(newMessages)} />
        <IonButton onClick={() => setShowChat(false)}>Close Chat</IonButton>
      </IonModal>

    </IonReactRouter>
  </IonApp>
  );
};

export default App;
