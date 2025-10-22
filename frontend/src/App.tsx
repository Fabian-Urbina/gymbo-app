import React, { useState } from "react";
import { Redirect, Route } from 'react-router-dom';
import { IonApp, IonTabs, IonRouterOutlet, setupIonicReact, IonTabBar, IonTabButton, IonIcon, IonButton, IonLabel, IonModal } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { statsChart, barbell, person } from 'ionicons/icons';

import Home from './pages/Home';
import Chat from './components/Chat';

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
  const [showChat, setShowChat] = useState(false); {/* Persistant chat state among pages */}
  const [messages, setMessages] = useState<string[]>(["🤖 Gymbo: Welcome! I'm your AI gym assistant. Let's get started!"]);

  return(
  
  <IonApp>
    <IonReactRouter>
      <IonTabs>
        
        <IonRouterOutlet>
          <Route exact path="/home">
            <Home />
          </Route>
          <Route exact path="/">
            <Redirect to="/home" />
          </Route>
        </IonRouterOutlet>

        {/* Navigation Bar */}
        <IonTabBar slot="bottom">
          <IonTabButton tab="home" href="/home">
            <IonIcon icon={statsChart} />
            <IonLabel>Performance</IonLabel>
          </IonTabButton>

          <IonTabButton tab="other1" href="/other1">
            <IonIcon icon={barbell} />
            <IonLabel>Other 1</IonLabel>
          </IonTabButton>

          <IonTabButton tab="other2" href="/other2">
            <IonIcon icon={person} />
            <IonLabel>Other 2</IonLabel>
          </IonTabButton>
        </IonTabBar>
      </IonTabs>

      {/* Floating Gymbo! button */}
      <div className="gymbo-floating-btn" onClick={() => setShowChat(true)}>
        <span className="gymbo-emoji">🤖</span>
      </div>

      <IonModal isOpen={showChat} onDidDismiss={() => setShowChat(false)}>
        <Chat initialMessages={messages} onClose={(newMessages) => setMessages(newMessages)} />
        <IonButton onClick={() => setShowChat(false)}>Close Chat</IonButton>
      </IonModal>

    </IonReactRouter>
  </IonApp>
  );
};

export default App;
