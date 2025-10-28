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
  interface UserData {
  users_id: number;
  username: string;
  age: number;
  gender: string;
  name: string;
  email: string;
  }
  const [userdata, setUserData] = useState<UserData>(() => {
    const stored = localStorage.getItem("USER_DATA");
    return stored ? JSON.parse(stored) as UserData : 
    { users_id: 0, username: "", age: 0, gender: "", name: "", email: "" };
    });
  const users_id = userdata["users_id"]
  const [name, setName] = useState(userdata["name"]);
  const [email, setEmail] = useState(userdata["email"]);
  const [age , setAge] = useState(userdata["age"]) as any;
  const [gender, setGender] = useState(userdata["gender"]);
  const [reply, setReply] = useState("");

  const handleSubmit = async () => {
    const payload = {
      users_id: users_id ? Number(users_id) : null,
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
      console.log(data.reply);
      localStorage.setItem("USER_DATA",JSON.stringify(data.user_data))
      }
     catch (err) {
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
      <Header title="Profile" />
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
