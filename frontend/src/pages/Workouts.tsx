import React, { useState, useRef,useEffect } from "react";
import {IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonButton, IonGrid, IonRow, IonCol, IonList} from "@ionic/react";

const formatDate = (date: Date) => date.toLocaleDateString("en-US", {weekday: "short", month: "short", day: "numeric"});

const Workouts: React.FC = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [workouts, setWorkouts] = useState<any[]>([]);
  interface UserData {users_id: number;username: string;age: number;gender: string;name: string;email: string;};
  const stored = localStorage.getItem("USER_DATA");
  const userData: UserData = stored ? JSON.parse(stored) as UserData
  : { users_id: 0, username: "", age: 0, gender: "", name: "", email: "" };

  const fetchWorkouts = async (date: Date) => {
    try {
      const queryData = {
        users_id: userData.users_id,
        day: date.toISOString(),
      };
      const res = await fetch("http://localhost:8000/api/query/day_workouts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(queryData),
      });
      const data = await res.json();
      return data.data || [];
    } catch {
      console.log("Could not connect to backend");
      return [];
    }
  };

  const changeDay = async (delta: number) => {
    const newDate = new Date(currentDate);
    newDate.setDate(currentDate.getDate() + delta);
    if (newDate > new Date()) return;
    const data = await fetchWorkouts(newDate);
    setWorkouts(data);
    setCurrentDate(newDate);
  };

  const goToToday = async () => { 
    const newDate=new Date();
    const data = await fetchWorkouts(newDate);
    setWorkouts(data);
    setCurrentDate(newDate);
  };

  const lastTap = useRef<number>(0);

  const handleDateTap = () => {
    const now = Date.now();
    if (now - lastTap.current < 300) { // double-tap within 300ms
      goToToday();
    }
    lastTap.current = now;
  };

  const isToday = currentDate.toDateString() === new Date().toDateString();

  interface UserData {users_id: number;username: string;age: number;gender: string;name: string;email: string;};
  
  


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
              <IonButton fill="clear" onClick={handleDateTap}><h2>{formatDate(currentDate)}
                </h2></IonButton>
            </IonCol>

            {/* Next day + Go to today */}
            <IonCol size="auto">
              <IonButton fill="clear" onClick={() => changeDay(1)} disabled={isToday}>▶</IonButton>
            </IonCol>

          </IonRow>
        </IonGrid>
      </IonContent>
      {/*Table*/}
      <IonGrid>
        <IonRow style={{ fontWeight: "bold", borderBottom: "1px solid #ddd" }}>
          <IonCol>Set</IonCol>
          <IonCol>Exercise</IonCol>
          <IonCol>Reps</IonCol>
          <IonCol>Weight</IonCol>
          <IonCol>Date</IonCol>
        </IonRow>

        {workouts.map((w, idx) => (
        <IonRow key={idx} style={{borderBottom: "1px solid #eee",fontSize: "0.9em",alignItems: "center",}}>
          <IonCol>{w.sets_id}</IonCol>
          <IonCol>{w.exercises_id}</IonCol>
          <IonCol>{w.repetitions}</IonCol>
          <IonCol>{w.weight}</IonCol>
          <IonCol>{new Date(w.datetime).toDateString()}</IonCol>
        </IonRow>
      ))}
      </IonGrid>
    </IonPage>
  );
};

export default Workouts;
