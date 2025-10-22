import React, { useState } from "react";
import { IonModal, IonButton, IonContent } from "@ionic/react";
import Chat from "../components/Chat"; // your chat component
import DummyChart from "../components/DummyChart";

const Home: React.FC = () => {
  const [showChat, setShowChat] = useState(false);
  const [messages, setMessages] = useState<string[]>(["🤖 Gymbo: Welcome! I'm your AI gym assistant. Let's get started!"]);

  return (
    <IonContent style={{ padding: 20, display: "flex", flexDirection: "column", alignItems: "center" }}>
      <h2>Your Stats</h2>
      <p>Name: John Doe</p>
      <p>Height: 180 cm</p>
      <p>Weight: 75 kg</p>
      <p>Bench Press: 20 kg</p>

      <h3>Workout Performance</h3> 
      <DummyChart />

      <IonButton onClick={() => setShowChat(true)} style={{ marginTop: 20 }}>
        Talk to Gymbo!
      </IonButton>

      <IonModal isOpen={showChat} onDidDismiss={() => setShowChat(false)}>
        <Chat initialMessages={messages} onClose={(newMessages) => setMessages(newMessages)} />
        <IonButton onClick={() => setShowChat(false)}>Close Chat</IonButton>
      </IonModal>
    </IonContent>
  );
};

export default Home;
