import React, { useEffect, useRef, useState } from "react";
import {
   IonPage,
   IonContent,
   IonCard,
   IonCardHeader,
   IonCardTitle,
   IonCardContent,
   IonText,
   IonSpinner,
   IonInput,
} from "@ionic/react";
import Header from "../../components/Header/header";

import "./Tab6.css";
import Drink from "../../classes/abstract/Drink";
import DrinkFactory from "../../classes/DrinkFactory";

const Tab6: React.FC = () => {
   const isMounted = useRef<boolean>(false);

   useEffect(() => {
      if (isMounted.current === false) {
      }
      return () => {
         isMounted.current = true;
      };
   }, []);

   return (
      <IonPage>
         <Header></Header>
         <IonContent fullscreen>
            <IonCard>
               <IonCardHeader>
                  <IonCardTitle>Завдання:</IonCardTitle>
               </IonCardHeader>
               <IonCardContent>
                  <ul>
                     <li>Розробити сервіс для табулювання функції</li>
                     <li>
                        Розробити сервіс для розрахунку значень функції за
                        допомогою ряду
                     </li>
                     <li>
                        Розробити сервіс для розрахунку значень функції за
                        допомогою рекурсії
                     </li>
                     <li>
                        Розробити сервіс для логування обчислених значень у
                        консоль та використати його у попередніх трьох сервісах
                     </li>
                     <li>
                        У основному застосунку підключити сервіси, вивести
                        результати усіх розрахунків та побудувати графіки для
                        усіх обрахунків.
                     </li>
                     <li>Функція: (x^2 - 1)^(-1)</li>
                     <li>Ряд: 1 + x^2 + x^4 + x^6</li>
                  </ul>
               </IonCardContent>
            </IonCard>
            <IonCard>
               <IonCardHeader>
                  <IonCardTitle>Список напоїв:</IonCardTitle>
               </IonCardHeader>
               <IonCardContent></IonCardContent>
            </IonCard>
            <IonCard>
               <IonCardHeader>
                  <IonCardTitle>Низькокалорійні напої:</IonCardTitle>
               </IonCardHeader>
               <IonCardContent></IonCardContent>
            </IonCard>
         </IonContent>
      </IonPage>
   );
};

export default Tab6;
