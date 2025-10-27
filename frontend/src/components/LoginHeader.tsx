import React from 'react';
import { IonHeader, IonToolbar, IonTitle, IonButtons, IonMenuButton, IonImg } from '@ionic/react';
import gymboLoginImage from '../assets/gymbo-login.png';

const Header: React.FC<{ title: string }> = ({ title }) => (
  <IonHeader>
    <IonToolbar color="primary">
      <IonButtons slot="start">
        <IonMenuButton />
      </IonButtons>
      <IonTitle>{title}</IonTitle>
    </IonToolbar>
    <div> <IonImg src={gymboLoginImage} style={{ width: '30%' }}/> </div>
  </IonHeader>
);

export default Header;
