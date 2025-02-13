import { IonHeader, IonToolbar, IonTitle, IonText } from "@ionic/react";
import React from "react";

const Header = () => {
   return (
      <IonHeader>
         <IonToolbar>
            <IonTitle>
               <IonText color="white">
                  <h1>Кошулько Ярослав</h1>
                  <h3>Група: КН-31 | Варіант №15</h3>
               </IonText>
            </IonTitle>
         </IonToolbar>
      </IonHeader>
   );
};

export default Header;
