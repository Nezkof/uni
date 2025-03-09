import { Redirect, Route } from "react-router-dom";
import {
   IonApp,
   IonHeader,
   IonMenuButton,
   IonIcon,
   IonLabel,
   IonRouterOutlet,
   IonMenu,
   IonContent,
   IonList,
   IonItem,
   IonTabs,
   IonTitle,
   IonToolbar,
   IonPage,
   setupIonicReact,
} from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import { ellipse, triangle, menu } from "ionicons/icons";
import Tab1 from "./pages/Tab1";
import Tab2 from "./pages/Tab2";
import Tab5 from "./pages/tab5/Tab5";
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
import "@ionic/react/css/palettes/dark.system.css"; // Ionic Dark Mode
import "./theme/variables.css";
import { useEffect } from "react";
import Header from "./components/Header/header";
import Tab3 from "./pages/Tab3";
import Tab4 from "./pages/tab4/Tab4";
import Tab6 from "./pages/tab6/Tab6";

setupIonicReact();

const MainContent: React.FC = () => {
   return (
      <IonPage>
         <IonMenu
            contentId="main-content"
            side="start"
            menuId="main-menu"
            type="overlay"
         >
            <IonContent>
               <IonList>
                  <IonItem button routerLink="/tab1">
                     <IonIcon aria-hidden="true" icon={ellipse} />
                     <IonLabel>Task #1</IonLabel>
                  </IonItem>
                  <IonItem button routerLink="/tab2">
                     <IonIcon aria-hidden="true" icon={ellipse} />
                     <IonLabel>Task #2</IonLabel>
                  </IonItem>
                  <IonItem button routerLink="/tab3">
                     <IonIcon aria-hidden="true" icon={ellipse} />
                     <IonLabel>Task #3</IonLabel>
                  </IonItem>
                  <IonItem button routerLink="/tab4">
                     <IonIcon aria-hidden="true" icon={triangle} />
                     <IonLabel>Lab #2</IonLabel>
                  </IonItem>
                  <IonItem button routerLink="/tab5">
                     <IonIcon aria-hidden="true" icon={triangle} />
                     <IonLabel>Lab #3</IonLabel>
                  </IonItem>
                  <IonItem button routerLink="/tab6">
                     <IonIcon aria-hidden="true" icon={triangle} />
                     <IonLabel>Lab #5</IonLabel>
                  </IonItem>
               </IonList>
            </IonContent>
         </IonMenu>

         <IonContent id="main-content">
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
               <Route exact path="/tab5">
                  <Tab5 />
               </Route>
               <Route exact path="/tab6">
                  <Tab6 />
               </Route>
               <Route exact path="/">
                  <Redirect to="/tab1" />
               </Route>
            </IonRouterOutlet>
         </IonContent>
      </IonPage>
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
