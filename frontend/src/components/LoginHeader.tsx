import React from 'react';
import { IonHeader, IonToolbar, IonTitle, IonButtons, IonMenuButton, IonImg } from '@ionic/react';
import gymboLoginImage from '../assets/gymbo-login.png';

const LoginHeader: React.FC<{ title: string }> = ({ title }) => (
  <IonHeader>
    <IonToolbar color="primary">
      <IonButtons slot="start">
        <IonMenuButton />
      </IonButtons>
      <IonTitle>{title}</IonTitle>
    </IonToolbar>
        <IonImg
      src={gymboLoginImage}
      style={{
        display: "block",
        margin: "10px auto",
        width: "30%",
        height: "auto",
      }}
    />
  </IonHeader>
);

export default LoginHeader;
