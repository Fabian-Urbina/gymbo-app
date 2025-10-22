import React, { useState } from "react";
import {
  IonApp,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonContent,
  IonItem,
  IonLabel,
  IonInput,
  IonButton,
  IonList,
  IonText,
} from "@ionic/react";

const UserData: React.FC = () => {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [reply, setReply] = useState("");

  const handleSubmit = async () => {
    const payload = {
      name,
      age: Number(age),
      weight: weight ? Number(weight) : null,
      height: height ? Number(height) : null,
    };

    try {
      const res = await fetch("http://127.0.0.1:8000/api/create_user", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      setReply(data.reply);
    } catch (err) {
      console.error(err);
      setReply("Error connecting to the API");
    }
  };

  return (
    <IonApp>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Create User</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">
        <IonList>
          <IonItem>
            <IonLabel position="floating">Name</IonLabel>
            <IonInput
              value={name}
              onIonChange={(e) => setName(e.detail.value!)}
              required
            />
          </IonItem>

          <IonItem>
            <IonLabel position="floating">Age</IonLabel>
            <IonInput
              type="number"
              value={age}
              onIonChange={(e) => setAge(e.detail.value!)}
              required
            />
          </IonItem>

          <IonItem>
            <IonLabel position="floating">Weight</IonLabel>
            <IonInput
              type="number"
              value={weight}
              onIonChange={(e) => setWeight(e.detail.value!)}
            />
          </IonItem>

          <IonItem>
            <IonLabel position="floating">Height</IonLabel>
            <IonInput
              type="number"
              value={height}
              onIonChange={(e) => setHeight(e.detail.value!)}
            />
          </IonItem>
        </IonList>

        <IonButton expand="block" onClick={handleSubmit}>
          Send
        </IonButton>

        {reply && (
          <IonText color="primary">
            <h2 style={{ textAlign: "center", marginTop: "1rem" }}>{reply}</h2>
          </IonText>
        )}
      </IonContent>
    </IonApp>
  );
};

export default UserData;
