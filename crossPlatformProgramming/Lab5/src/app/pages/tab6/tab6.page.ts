import { Component, OnInit } from '@angular/core';
import { FunctionTableService } from '../../services/function-table.service';
import { FunctionSeriesService } from '../../services/function-series.service';
import { FunctionRecursionService } from '../../services/function-recursion.service';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from 'src/app/components/header/header.component';

@Component({
  selector: 'app-tab6',
  templateUrl: './tab6.page.html',
  imports: [CommonModule, IonicModule, HeaderComponent],
  styleUrls: ['./tab6.page.scss'],
})
export class Tab6Page implements OnInit {
  results: {
    x: number;
    tabulation: number;
    series: number;
    recursion: number;
  }[] = [];

  constructor(
    private tabulationService: FunctionTableService,
    private seriesService: FunctionSeriesService,
    private recursionService: FunctionRecursionService
  ) {}

  ngOnInit() {
    const x: number[] = [-0.8, -0.6, -0.4, -0.2, 0.2, 0.4, 0.6, 0.8];
    const terms = 10;

    x.forEach((el) => {
      const tabulation = this.tabulationService.calculate(el);
      const series = this.seriesService.calculateSeriesValue(el, terms);
      const recursion = this.recursionService.calculateRecursiveSeries(
        el,
        1,
        terms
      );

      this.results.push({ x: el, tabulation, series, recursion });
    });
  }
}
