import React, { useState } from "react";
import {
   IonPage,
   IonHeader,
   IonToolbar,
   IonTitle,
   IonText,
   IonContent,
   IonCard,
   IonCardHeader,
   IonCardTitle,
   IonCardContent,
   IonInput,
   IonButton,
   IonLabel,
   IonList,
   IonItem,
   IonCardSubtitle,
} from "@ionic/react";
import Header from "../components/Header/header";

const Tab2: React.FC = () => {
   const [size, setSize] = useState<number>(0);
   const [matrix, setMatrix] = useState<number[][]>([]);
   const [minElement, setMinElement] = useState<number | null>(null);
   const [minIndex, setMinIndex] = useState<number | null>(null);

   const generateMatrix = () => {
      if (size <= 0) return;

      let newMatrix: number[][] = [];
      for (let i = 0; i < size; i++) {
         let row: number[] = [];
         for (let j = 0; j < size; j++) {
            row.push(Math.floor(Math.random() * 100));
         }
         newMatrix.push(row);
      }

      let min = newMatrix[0][0];
      let minIdx = 0;
      for (let i = 1; i < size; i++) {
         if (newMatrix[i][i] < min) {
            min = newMatrix[i][i];
            minIdx = i;
         }
      }

      setMatrix(newMatrix);
      setMinElement(min);
      setMinIndex(minIdx);
   };

   const formatNumber = (num: number) => {
      return num.toString().padStart(2);
   };

   return (
      <IonPage>
         <Header></Header>
         <IonContent fullscreen>
            <IonCard>
               <IonCardHeader>
                  <IonCardTitle>Завдання №3</IonCardTitle>
                  <IonCardSubtitle>
                     Згенерувати матрицю розміром NxN. Знайти мінімальний
                     елемент головної діагоналі. Виокреміть його кольором, якщо
                     цей елемент є парним.
                  </IonCardSubtitle>
               </IonCardHeader>
               <IonCardContent>
                  <IonInput
                     label="Розмір матриці (N):"
                     type="number"
                     value={size}
                     onIonChange={(e) =>
                        setSize(parseInt(e.detail.value ?? "0"))
                     }
                  />
                  <IonButton expand="block" onClick={generateMatrix}>
                     Генерувати матрицю
                  </IonButton>

                  {matrix.length > 0 && (
                     <table
                        style={{ width: "100%", borderCollapse: "collapse" }}
                     >
                        <tbody>
                           {matrix.map((row, rowIndex) => (
                              <tr key={rowIndex}>
                                 {row.map((num, colIndex) => {
                                    const formattedNum = formatNumber(num);
                                    const isMinElement =
                                       minElement !== null &&
                                       num === minElement &&
                                       rowIndex === colIndex;

                                    const isDiagonal = rowIndex === colIndex;

                                    return (
                                       <td
                                          key={colIndex}
                                          style={{
                                             padding: "5px",
                                             textAlign: "center",
                                             fontWeight: isDiagonal
                                                ? "bold"
                                                : "normal",
                                             color:
                                                isMinElement && num % 2 === 0
                                                   ? "red"
                                                   : "",
                                          }}
                                       >
                                          {formattedNum}
                                       </td>
                                    );
                                 })}
                              </tr>
                           ))}
                        </tbody>
                     </table>
                  )}

                  {minElement !== null && (
                     <IonText>
                        <h2>
                           Мінімальний елемент головної діагоналі: {minElement}
                        </h2>
                     </IonText>
                  )}
               </IonCardContent>
            </IonCard>
         </IonContent>
      </IonPage>
   );
};

export default Tab2;
