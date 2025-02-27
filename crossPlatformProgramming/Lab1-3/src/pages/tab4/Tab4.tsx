import React, { useEffect, useRef, useState } from "react";
import {
   IonPage,
   IonContent,
   IonCard,
   IonCardHeader,
   IonCardTitle,
   IonCardContent,
   IonCardSubtitle,
   IonText,
   IonSpinner,
} from "@ionic/react";
import Header from "../../components/Header/header";
import "./Tab4.css";
import TaskList from "../../components/taskList/TaskList";

const Tab4: React.FC = () => {
   const isMounted = useRef<boolean>(false);
   const [isDataFetched, setIsDataFetched] = useState<boolean>(false);
   const [tasks, setTasks] = useState<Task[]>([]);

   const fetchData = async () => {
      fetch(import.meta.env.VITE_JSON_URL)
         .then((res) => {
            if (!res.ok) {
               throw new Error("Network response was not ok");
            }
            return res.json();
         })
         .then((data) => {
            setTasks(data.record.tasks);
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
                  <IonCardSubtitle>Список завдань на день</IonCardSubtitle>
               </IonCardHeader>
               <IonCardContent>
                  <ul>
                     <li>Назва завдання</li>
                     <li>Час виконання</li>
                     <li>Складність у шкалі від 1 до 10</li>
                     <li>Позначка про виконання</li>
                  </ul>
                  <div>
                     <IonText>Згрупувати завдання за складністю</IonText>
                  </div>
                  <div>
                     <IonText>
                        Вивести графік по кількості виконаних завдань кожного
                        рівня складності
                     </IonText>
                  </div>
               </IonCardContent>
            </IonCard>
            <IonCard>
               <IonCardHeader>
                  <IonCardTitle></IonCardTitle>
                  <IonCardSubtitle></IonCardSubtitle>
               </IonCardHeader>
               <IonCardContent>
                  {isDataFetched ? (
                     <TaskList tasks={tasks} />
                  ) : (
                     <IonSpinner name="dots"></IonSpinner>
                  )}
               </IonCardContent>
            </IonCard>
         </IonContent>
      </IonPage>
   );
};

export default Tab4;
