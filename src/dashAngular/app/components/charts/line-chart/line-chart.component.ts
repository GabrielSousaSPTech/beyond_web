import { Component } from '@angular/core';
import { GoogleChartsModule } from 'angular-google-charts';
declare var google: any;

@Component({
  selector: 'app-line-chart',
  imports: [],
  templateUrl: './line-chart.component.html',
  styleUrl: './line-chart.component.css'
})
export class LineChartComponent {
  ngOnInit(): void {
    // Load the Visualization API and the corechart package.
    google.charts.load('current', { 'packages': ['corechart'] });

    // Set a callback to run when the Google Visualization API is loaded.
    google.charts.setOnLoadCallback(this.drawChart);
  }

  drawChart() {
    var data = google.visualization.arrayToDataTable([
      ['Mês', '2023', '2024'],
      ['Janeiro', 971275, 956737],
      ['Fevereiro', 755842, 833306],
      ['Março', 577215, 740483],
      ['Abril', 408798, 398587],
      ['Maio', 292375, 335652],
      ['Junho', 274302, 332474],
      ['Julho', 375648, 437103],
      ['Agosto', 365041, 417940],
      ['Setembro', 352355, 445389],
      ['Outubro', 409924, 508738],
      ['Novembro', 504395, 560732],
      ['Dezembro', 621171, 806478],
    ]);

    var options = {
      /* title: 'Total de Chegadas por ano e mês', */
      /* curveType: 'function', */
      legend: { position: 'top' },
      /* 'width': 1600, */
      'height': 560,
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
