import { CommonModule } from '@angular/common';
import { Component, Input, ViewChild, AfterViewInit } from '@angular/core';
import { ChartType, ChartOptions } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

@Component({
  selector: 'app-bar-chart',
  standalone: true,
  imports: [CommonModule, BaseChartDirective],
  templateUrl: `bar-chart.component.html`,
})
export class BarChartComponent {
  @ViewChild(BaseChartDirective) chart?: BaseChartDirective;

  @Input() set frequencyData(data: Record<string, number>) {
    this.chartData.labels = Object.keys(data);
    this.chartData.datasets[0].data = Object.values(data);

    if (this.chart) {
      this.chart.update();
    }
  }

  chartType: ChartType = 'bar';

  chartOptions: ChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
    },
  };

  chartData = {
    labels: [] as string[],
    datasets: [
      {
        label: 'Частота',
        data: [] as number[],
        backgroundColor: '#42A5F5',
        borderRadius: 6,
      },
    ],
  };
}
