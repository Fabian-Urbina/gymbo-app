import React, { useState } from "react";
import {
  IonPage,
  IonContent,
  IonItem,
  IonLabel,
  IonInput,
  IonButton,
  IonList,
  IonText,
} from "@ionic/react";
import Header from '../components/Header';

const Profile: React.FC = () => {
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
      console.log("Sending payload:", JSON.stringify(payload, null, 2));
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

  type inputItemType = {
    label: string;
    value: string | number;
    setValue: (v: string) => void;
    type?: 'text' | 'number';
    required?: boolean;
  };

  const InputItem = (props: inputItemType) => (
  <IonItem>
    <IonLabel position="floating">{props.label}</IonLabel>
    <IonInput
      type={props.type ?? 'text'}
      value={props.value}
      onIonChange={(e) => props.setValue(e.detail.value!)}
      required={props.required ?? false}
    />
  </IonItem>
  );

  return (
    <IonPage>
      <Header title="Create User" />
      <IonContent className="ion-padding">

        <IonList>
          <InputItem label="Name" value={name} setValue={setName} type="text" required={true} />
          <InputItem label="Age" value={age} setValue={setAge} type="number" required={true} />
          <InputItem label="Weight" value={weight} setValue={setWeight} type="number" />
          <InputItem label="Height" value={height} setValue={setHeight} type="number" />
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
    </IonPage>
  );
};

export default Profile;
