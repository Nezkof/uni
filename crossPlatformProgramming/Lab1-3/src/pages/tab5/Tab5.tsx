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

import "./Tab5.css";
import Drink from "../../classes/abstract/Drink";
import DrinkFactory from "../../classes/DrinkFactory";

const Tab5: React.FC = () => {
   const isMounted = useRef<boolean>(false);
   const [isDataFetched, setIsDataFetched] = useState<boolean>(false);
   const [drinks, setDrinks] = useState<Drink[]>([]);
   const [lowCalorieDrinks, setLowCalorieDrinks] = useState<Drink[]>([]);
   const [calorieThreshold, setCalorieThreshold] = useState<number>(0);

   const findLowCalorieDrinks = (
      drinks: Drink[],
      threshold: number
   ): Drink[] => {
      return drinks.filter((drink) => drink.calories <= threshold);
   };

   useEffect(() => {
      setLowCalorieDrinks(findLowCalorieDrinks(drinks, calorieThreshold));
   }, [calorieThreshold, drinks]);

   const fetchData = async () => {
      fetch(import.meta.env.VITE_DRINKS_URL)
         .then((res) => {
            if (!res.ok) {
               throw new Error("Network response was not ok");
            }
            return res.json();
         })
         .then((data) => {
            const drinks = data.record.map((item: any) =>
               DrinkFactory.createDrink(item)
            );
            setDrinks(drinks);
            setLowCalorieDrinks(findLowCalorieDrinks(drinks, calorieThreshold));
            setIsDataFetched(true);
         })
         .catch((error) => {
            console.error("Error fetching data:", error);
         });
   };

   useEffect(() => {
      if (isMounted.current === false) {
         fetchData();
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
                     <li>Батьківський клас: напій</li>
                     <li>Поля: volume (double), calories (int)</li>
                     <li>Методи: getVolume(), displayInfo()</li>
                     <ul>
                        <li>Дочірній клас: Сік</li>
                        <li>Поля: fruitType(string)</li>
                     </ul>
                     <ul>
                        <li>Дочірній клас: Газована вода</li>
                        <li>Поля: sugarContent(double)</li>
                     </ul>
                  </ul>
                  <div>
                     <IonText>
                        Знайти напої калорійність яких менше за{" "}
                        {calorieThreshold}
                     </IonText>
                  </div>
               </IonCardContent>
            </IonCard>
            <IonCard>
               <IonCardHeader>
                  <IonCardTitle>Список напоїв:</IonCardTitle>
               </IonCardHeader>
               <IonCardContent>
                  <ul>
                     {!isDataFetched ? (
                        <IonSpinner />
                     ) : (
                        drinks.map((drink, index) => (
                           <li key={index}>{drink.displayInfo()}</li>
                        ))
                     )}
                  </ul>
               </IonCardContent>
            </IonCard>
            <IonCard>
               <IonCardHeader>
                  <IonCardTitle>Низькокалорійні напої:</IonCardTitle>
                  <IonInput
                     label="Максимальна калорійність:"
                     placeholder="0"
                     type="number"
                     value={calorieThreshold}
                     onIonChange={(e) =>
                        setCalorieThreshold(Number(e.detail.value))
                     }
                  />
               </IonCardHeader>
               <IonCardContent>
                  {lowCalorieDrinks.length === 0 ? (
                     <IonText>Не знайдено</IonText>
                  ) : (
                     <ul>
                        {lowCalorieDrinks.map((drink, index) => (
                           <li key={index}>
                              <IonText>{drink.displayInfo()}</IonText>
                           </li>
                        ))}
                     </ul>
                  )}
               </IonCardContent>
            </IonCard>
         </IonContent>
      </IonPage>
   );
};

export default Tab5;
