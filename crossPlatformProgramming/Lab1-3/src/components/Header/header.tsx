import {
   IonHeader,
   IonToolbar,
   IonTitle,
   IonText,
   IonButton,
   IonButtons,
   IonIcon,
   IonLabel,
   IonTabBar,
   IonTabButton,
   IonMenuButton,
} from "@ionic/react";
import React, { useState } from "react";
import { ellipse, menuOutline, triangle } from "ionicons/icons";
import { menuController } from "@ionic/core";

import "./header__tabs.css";

const Header = () => {
   const [showTabs, setShowTabs] = useState(true);

   return (
      <IonHeader>
         <IonToolbar>
            <IonTitle>
               <IonText color="white">
                  <h1>Кошулько Ярослав</h1>
                  <h3>Група: КН-31 | Варіант №15</h3>
               </IonText>
            </IonTitle>
            <IonMenuButton slot="start" />
         </IonToolbar>
      </IonHeader>
   );
};

export default Header;
