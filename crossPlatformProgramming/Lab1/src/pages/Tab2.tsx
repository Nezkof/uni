import {
   IonButton,
   IonCard,
   IonCardContent,
   IonCardHeader,
   IonCardSubtitle,
   IonCardTitle,
   IonContent,
   IonHeader,
   IonInput,
   IonItem,
   IonLabel,
   IonList,
   IonPage,
   IonText,
   IonTitle,
   IonToolbar,
} from "@ionic/react";
import "./Tab2.css";
import { useState } from "react";
import Header from "../components/Header/header";

const Tab2: React.FC = () => {
   const [a, setA] = useState<number>(0);
   const [b, setB] = useState<number>(0);
   const [numbers, setNumbers] = useState<number[]>([]);

   const handleInputChange =
      (setter: React.Dispatch<React.SetStateAction<number>>) =>
      (e: CustomEvent) => {
         setter(parseInt(e.detail.value ?? "0"));
      };

   const calculateNumbers = () => {
      const result: number[] = [];
      for (let i = Math.min(a, b); i <= Math.max(a, b); i++) {
         if (i % 7 === 6) {
            result.push(i);
         }
      }
      setNumbers(result);
   };

   return (
      <IonPage>
         <Header></Header>
         <IonContent fullscreen>
            <IonCard>
               <IonCardHeader>
                  <IonCardTitle>Тестові приклади</IonCardTitle>
               </IonCardHeader>
               <IonList>
                  <IonItem>
                     <IonLabel>{"[1,20] => 6, 13, 20"}</IonLabel>
                  </IonItem>
                  <IonItem>
                     <IonLabel>{"[15,50] => 20, 27, 34, 41, 48"}</IonLabel>
                  </IonItem>
                  <IonItem>
                     <IonLabel>{"[0,0] => null"}</IonLabel>
                  </IonItem>
               </IonList>
            </IonCard>
            <IonCard>
               <IonCardHeader>
                  <IonCardTitle>Завдання №2</IonCardTitle>
                  <IonCardSubtitle>
                     На заданому проміжку чисел [a, b] знайдіть кількість чисел,
                     які при діленні на 7 дають в остачі 6. Потрібно вивести як
                     самі числа, так і результати обрахунку.
                  </IonCardSubtitle>
               </IonCardHeader>
               <IonCardContent>
                  <IonInput
                     label="Число a:"
                     placeholder="..."
                     type="number"
                     value={a}
                     onIonChange={handleInputChange(setA)}
                  />
                  <IonInput
                     label="Число b:"
                     placeholder="..."
                     type="number"
                     value={b}
                     onIonChange={handleInputChange(setB)}
                  />
                  <IonButton expand="block" onClick={calculateNumbers}>
                     Обчислити
                  </IonButton>
                  <IonText>
                     <h2>Кількість: {numbers.length}</h2>
                     <h3>Числа: {numbers.join(", ") || "Немає"}</h3>
                  </IonText>
               </IonCardContent>
            </IonCard>
         </IonContent>
      </IonPage>
   );
};

export default Tab2;
