import React, { useEffect, useRef, useState } from "react";
import {
   IonCard,
   IonCardHeader,
   IonCardTitle,
   IonCardContent,
   IonList,
   IonItem,
   IonLabel,
} from "@ionic/react";
import { Bar } from "react-chartjs-2";
import {
   Chart as ChartJS,
   CategoryScale,
   LinearScale,
   BarElement,
   Title,
   Tooltip,
   Legend,
} from "chart.js";

ChartJS.register(
   CategoryScale,
   LinearScale,
   BarElement,
   Title,
   Tooltip,
   Legend
);

const TaskList: React.FC<iTaskList> = ({ tasks }) => {
   const isMounted = useRef<boolean>(false);
   const [groupedTasks, setGroupedTasks] = useState<GroupedTasks>({});

   function groupItemRestById(collector: GroupedTasks, item: Task) {
      const { difficulty, ...rest } = item;
      const groupList = collector[difficulty] || (collector[difficulty] = []);

      groupList.push(rest);

      return collector;
   }

   useEffect(() => {
      if (!isMounted.current) {
         setGroupedTasks(tasks.reduce(groupItemRestById, {}));
      }
      isMounted.current = true;
   }, [tasks]);

   const chartData = {
      labels: Object.keys(groupedTasks),
      datasets: [
         {
            label: "Кількість завдань",
            data: Object.values(groupedTasks).map((group) => group.length),
            backgroundColor: "rgba(75, 192, 192, 0.6)",
            borderColor: "rgba(75, 192, 192, 1)",
            borderWidth: 1,
         },
      ],
   };

   return (
      <div>
         <IonList>
            {Object.keys(groupedTasks).map((difficulty) => (
               <IonCard key={difficulty}>
                  <IonCardHeader>
                     <IonCardTitle>Складність: {difficulty}</IonCardTitle>
                  </IonCardHeader>
                  <IonCardContent>
                     <IonList>
                        {groupedTasks[parseInt(difficulty)].map(
                           (task, index) => (
                              <IonItem key={index}>
                                 <IonLabel>
                                    <h2>{task.title}</h2>
                                    <p>{task.time}</p>
                                 </IonLabel>
                              </IonItem>
                           )
                        )}
                     </IonList>
                  </IonCardContent>
               </IonCard>
            ))}
         </IonList>

         <IonCard>
            <IonCardHeader>
               <IonCardTitle>Розподіл завдань за складністю</IonCardTitle>
            </IonCardHeader>
            <IonCardContent>
               <Bar data={chartData} options={{ responsive: true }} />
            </IonCardContent>
         </IonCard>
      </div>
   );
};

export default TaskList;
