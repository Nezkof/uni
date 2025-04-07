import { Component } from '@angular/core';

import { LetterFrequencyService } from '../services/letter-frequency.service';
import { StringCheckerFormComponent } from '../forms/string-checker-form/string-checker-form.component';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { BarChartComponent } from '../grahps/bar-chart/bar-chart.component';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [
    StringCheckerFormComponent,
    CommonModule,
    IonicModule,
    BarChartComponent,
  ],
})
export class HomePage {
  frequencyData: Record<string, number> = {};

  constructor(private letterFrequencyService: LetterFrequencyService) {}

  onTextSubmitted(text: string) {
    this.frequencyData =
      this.letterFrequencyService.calculateLetterFrequency(text);
  }
}
