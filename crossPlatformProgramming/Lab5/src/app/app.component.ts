import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { Tab6Page } from './pages/tab6/tab6.page';
import { HeaderComponent } from './components/header/header.component';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: true,
  imports: [IonicModule, Tab6Page, HeaderComponent],
})
export class AppComponent {}
