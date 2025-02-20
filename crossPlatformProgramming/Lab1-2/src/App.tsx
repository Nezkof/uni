import { Redirect, Route, useLocation } from "react-router-dom";
import {
   IonApp,
   IonHeader,
   IonIcon,
   IonLabel,
   IonRouterOutlet,
   IonTabBar,
   IonTabButton,
   IonTabs,
   IonTitle,
   IonToolbar,
   setupIonicReact,
} from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import { ellipse, square, triangle } from "ionicons/icons";
import Tab1 from "./pages/Tab1";
import Tab2 from "./pages/Tab2";

import "@ionic/react/css/core.css";

import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";

/**
 * Ionic Dark Mode
 * -----------------------------------------------------
 * For more info, please see:
 * https://ionicframework.com/docs/theming/dark-mode
 */

/* import '@ionic/react/css/palettes/dark.always.css'; */
/* import '@ionic/react/css/palettes/dark.class.css'; */
import "@ionic/react/css/palettes/dark.system.css";

/* Theme variables */
import "./theme/variables.css";
import { useEffect } from "react";

import Header from "./components/Header/header";
import Tab3 from "./pages/Tab3";
import Tab4 from "./pages/tab4/Tab4";

setupIonicReact();

const MainContent: React.FC = () => {
   return (
      <>
         <IonTabs>
            <IonRouterOutlet>
               <Route exact path="/tab1">
                  <Tab1 />
               </Route>
               <Route exact path="/tab2">
                  <Tab2 />
               </Route>
               <Route exact path="/tab3">
                  <Tab3 />
               </Route>
               <Route exact path="/tab4">
                  <Tab4 />
               </Route>
               <Route exact path="/">
                  <Redirect to="/tab1" />
               </Route>
            </IonRouterOutlet>
            <IonTabBar slot="bottom">
               <IonTabButton tab="tab1" href="/tab1">
                  <IonIcon aria-hidden="true" icon={ellipse} />
                  <IonLabel>Task #1</IonLabel>
               </IonTabButton>
               <IonTabButton tab="tab2" href="/tab2">
                  <IonIcon aria-hidden="true" icon={ellipse} />
                  <IonLabel>Task #2</IonLabel>
               </IonTabButton>
               <IonTabButton tab="tab3" href="/tab3">
                  <IonIcon aria-hidden="true" icon={ellipse} />
                  <IonLabel>Task #3</IonLabel>
               </IonTabButton>
               <IonTabButton tab="tab4" href="/tab4">
                  <IonIcon aria-hidden="true" icon={triangle} />
                  <IonLabel>Lab #2</IonLabel>
               </IonTabButton>
            </IonTabBar>
         </IonTabs>
      </>
   );
};

const App: React.FC = () => {
   return (
      <IonApp>
         <IonReactRouter>
            <MainContent />
         </IonReactRouter>
      </IonApp>
   );
};

export default App;
