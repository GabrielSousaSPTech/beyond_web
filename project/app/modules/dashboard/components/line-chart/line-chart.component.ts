import { Component, Input } from '@angular/core';
import { GoogleChartsModule } from 'angular-google-charts';
import { Observable } from 'rxjs';
declare var google: any;

@Component({
  selector: 'app-line-chart',
  imports: [],
  templateUrl: './line-chart.component.html',
  styleUrl: './line-chart.component.css'
})
export class LineChartComponent {
  @Input() chartData!: Observable<any>;
  ngOnInit(): void {
    google.charts.load('current', { 'packages': ['corechart'] });

    this.chartData.subscribe(data => {
      google.charts.setOnLoadCallback(() => {
        this.drawChart(data);
      });
    });
  }

  drawChart(graphData: any[][]) {
    var data = google.visualization.arrayToDataTable(graphData);

    var options = {
      /* title: 'Total de Chegadas por ano e mês', */
      /* curveType: 'function', */
      legend: { position: 'top' },
      /* 'width': 1600, */
      'height': 500,
      chartArea: {
        width: '100%',
        left: 120,
        right: 20
      }
    };

    var chart = new google.visualization.LineChart(document.getElementById('chart_div_Line'));

    chart.draw(data, options);
  }
}
