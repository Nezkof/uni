import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FunctionTableService } from '../../services/function-table.service';
import { FunctionSeriesService } from '../../services/function-series.service';
import { FunctionRecursionService } from '../../services/function-recursion.service';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from 'src/app/components/header/header.component';
import { Chart, ChartConfiguration, registerables } from 'chart.js';

Chart.register(...registerables);

@Component({
  selector: 'app-tab6',
  standalone: true,
  templateUrl: './tab6.page.html',
  imports: [CommonModule, IonicModule, HeaderComponent],
  styleUrls: ['./tab6.page.scss'],
})
export class Tab6Page implements OnInit {
  @ViewChild('lineChart') lineChartRef!: ElementRef;

  results: any[] = [];
  xValues: number[] = [];
  terms = 10;
  chart!: Chart;

  constructor(
    private tabulationService: FunctionTableService,
    private seriesService: FunctionSeriesService,
    private recursionService: FunctionRecursionService
  ) {
    const coef = 0.2;

    for (let i = -1; i <= 1; i += coef) {
      if (Number(i.toFixed(1)) === 0) continue;
      this.xValues.push(Number(i.toFixed(1)));
    }
  }

  ngOnInit() {
    this.xValues.forEach((el) => {
      const tabulation = this.tabulationService.calculate(el);
      const series = this.seriesService.calculateSeriesValue(el, this.terms);
      const recursion = this.recursionService.calculateRecursiveSeries(
        el,
        1,
        this.terms
      );

      this.results.push({ x: el, tabulation, series, recursion });
    });
  }

  ngAfterViewInit() {
    this.createChart();
  }

  createChart() {
    this.chart = new Chart(this.lineChartRef.nativeElement, {
      type: 'line',
      data: {
        labels: this.xValues.map(String),
        datasets: [
          {
            label: 'Табуляція',
            data: this.results.map((r) => r.tabulation),
            borderColor: 'blue',
            backgroundColor: 'rgba(0, 0, 255, 0.2)',
            fill: true,
          },
          {
            label: 'Розрахунок ряду',
            data: this.results.map((r) => r.series),
            borderColor: 'red',
            backgroundColor: 'rgba(255, 0, 0, 0.2)',
            fill: true,
          },
          {
            label: 'Рекурсія',
            data: this.results.map((r) => r.recursion),
            borderColor: 'green',
            backgroundColor: 'rgba(0, 255, 0, 0.2)',
            fill: true,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
      },
    });
  }
}
