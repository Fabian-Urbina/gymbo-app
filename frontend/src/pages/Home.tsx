import React from "react";
import { IonContent, IonPage, IonText } from "@ionic/react";
import DummyChart from "../components/DummyChart";
import Header from '../components/Header';

const Home: React.FC = () => {

  const renderWelcome = () => (
    <IonText>
      <h2>Welcome!</h2>
      <p>This is Gymbo, an AI based assistant that keeps track of your gym sessions!</p>
    </IonText>
  );

  const renderStats = () => (
    <div style={{ marginTop: 20 }}>
      <h2>Your Stats</h2>
      <p>Name: John Doe</p>
      <p>Height: 180 cm</p>
      <p>Weight: 75 kg</p>
      <p>Bench Press: 20 kg</p>
    </div>
  );

  const renderChart = () => (
    <div style={{ marginTop: 20, textAlign: 'center' }}>
      <h3>Workout Performance</h3>
      <DummyChart />
    </div>
  );

  return (
    <IonPage>
      <Header title="Home" />
      <IonContent className="ion-padding">
        {renderWelcome()}
        {renderStats()}
        {renderChart()}
      </IonContent>
    </IonPage> 
  );
};

export default Home;
