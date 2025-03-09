import { Component, OnInit } from '@angular/core';
import { FunctionTableService } from '../../services/function-table.service';
import { FunctionSeriesService } from '../../services/function-series.service';
import { FunctionRecursionService } from '../../services/function-recursion.service';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-tab6',
  templateUrl: './tab6.page.html',
  imports: [CommonModule, IonicModule],
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
    const start = -1;
    const end = 1;
    const step = 0.2;
    const terms = 10;

    for (let x = start; x <= end; x += step) {
      const tabulation = this.tabulationService.calculate(x);
      const series = this.seriesService.calculateSeriesValue(x, terms);
      const recursion = this.recursionService.calculateRecursiveSeries(
        x,
        1,
        terms
      );

      this.results.push({ x, tabulation, series, recursion });
    }
  }
}
