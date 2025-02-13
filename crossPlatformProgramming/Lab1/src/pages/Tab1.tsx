import {
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
import "./Tab1.css";
import { useEffect, useState } from "react";
import Header from "../components/Header/header";

const Tab1: React.FC = () => {
   const [num1, setNum1] = useState<number>(0);
   const [num2, setNum2] = useState<number>(0);
   const [num3, setNum3] = useState<number>(0);
   const [result, setResult] = useState<number>(0);

   const handleInputChange =
      (setter: React.Dispatch<React.SetStateAction<number>>) =>
      (e: CustomEvent) => {
         setter(parseInt(e.detail.value ?? "0"));
      };

   useEffect(() => {
      calculateResult();
   }, [num1, num2, num3]);

   const getNumberProduct = (number: number) => {
      let result = number
         .toString()
         .split("")
         .reduce((prod, digit) => prod * parseInt(digit), 1);

      return result;
   };

   const calculateResult = () => {
      let result = 0;
      if (num1 % 4 == 0 && num2 % 4 == 0 && num3 % 4 == 0) {
         result = num1 * num2 * num3;
      } else {
         const condition =
            getNumberProduct(num1) *
            getNumberProduct(num2) *
            getNumberProduct(num3);

         if (condition % 2 !== 0)
            result = num1 * num1 + num2 * num2 + num3 * num3;
         else result = 0;
      }

      setResult(result);
   };

   const inputs = [
      { label: "Перше число:", value: num1, setter: setNum1 },
      { label: "Друге число:", value: num2, setter: setNum2 },
      { label: "Третє число:", value: num3, setter: setNum3 },
   ];

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
                     <IonLabel>{"4, 8, 12 => 384"}</IonLabel>
                  </IonItem>
                  <IonItem>
                     <IonLabel>{"3, 5, 7 => 83"}</IonLabel>
                  </IonItem>
                  <IonItem>
                     <IonLabel>{"2, 3, 6 => 0"}</IonLabel>
                  </IonItem>
               </IonList>
            </IonCard>
            <IonCard>
               <IonCardHeader>
                  <IonCardTitle>Завдання №1</IonCardTitle>
                  <IonCardSubtitle>
                     Задано три числа. Якщо вони всі кратні 4, то знайти їх
                     добуток. В іншому випадку – суму їхніх квадратів, якщо
                     добуток їхніх цифр непарний.
                  </IonCardSubtitle>
               </IonCardHeader>
               <IonCardContent>
                  {inputs.map((input, index) => (
                     <IonInput
                        key={index}
                        label={input.label}
                        placeholder="..."
                        type="number"
                        value={input.value}
                        onIonChange={handleInputChange(input.setter)}
                     />
                  ))}
                  <IonText>
                     <h2>Результат: {result}</h2>
                  </IonText>
               </IonCardContent>
            </IonCard>
         </IonContent>
      </IonPage>
   );
};

export default Tab1;
