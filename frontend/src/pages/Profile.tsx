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
  const [email, setEmail] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [reply, setReply] = useState("");

  const handleSubmit = async () => {
    const payload = {
      name: name ? name : null,
      email: email ? email: null,
      age: age? Number(age): null,
      gender: gender ? gender : null,
    };
    try {
      console.log("Sending payload:", JSON.stringify(payload, null, 2));
      const res = await fetch("http://localhost:8000/api/profile/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      setReply(data.reply);
      console.log(data.reply)
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
          <InputItem label="Name" value={name} setValue={setName} type="text" />
          <InputItem label="Email" value={email} setValue={setEmail} type="text"/>
          <InputItem label="Age" value={age} setValue={setAge} type="number" />
          <InputItem label="Gender" value={gender} setValue={setGender} type="text" />
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
