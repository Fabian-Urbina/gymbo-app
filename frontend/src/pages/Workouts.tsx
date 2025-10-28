import React, { useState, useRef } from "react";
import {IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonButton, IonGrid, IonRow, IonCol} from "@ionic/react";

const formatDate = (date: Date) => date.toLocaleDateString("en-US", {weekday: "short", month: "short", day: "numeric"});

const Workouts: React.FC = () => {
  const [currentDate, setCurrentDate] = useState(new Date());

  const changeDay = (delta: number) => {
    const newDate = new Date(currentDate);
    newDate.setDate(currentDate.getDate() + delta);
    if (newDate > new Date()) return;
    setCurrentDate(newDate);
  };

  const goToToday = () => { setCurrentDate(new Date()); };

  const lastTap = useRef<number>(0);

  const handleDateTap = () => {
    const now = Date.now();
    if (now - lastTap.current < 300) { // double-tap within 300ms
      goToToday();
    }
    lastTap.current = now;
  };

  const isToday = currentDate.toDateString() === new Date().toDateString();

  return (
    <IonPage>
      <IonHeader> <IonToolbar color="primary"> <IonTitle>Daily Workouts</IonTitle> </IonToolbar> </IonHeader>

      <IonContent className="ion-padding">
        <IonGrid>
          {/* Navigation Row */}
          <IonRow className="ion-align-items-center" style={{ justifyContent: "center", textAlign: "center" }}>
            
            {/* Previous day */}
            <IonCol size="auto">
              <IonButton fill="clear" onClick={() => changeDay(-1)}>◀</IonButton>
            </IonCol>

            {/* Current date */}
            <IonCol size="auto">
              <IonButton fill="clear" onClick={handleDateTap}><h2>{formatDate(currentDate)}</h2></IonButton>
            </IonCol>

            {/* Next day + Go to today */}
            <IonCol size="auto">
              <IonButton fill="clear" onClick={() => changeDay(1)} disabled={isToday}>▶</IonButton>
            </IonCol>

          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default Workouts;
