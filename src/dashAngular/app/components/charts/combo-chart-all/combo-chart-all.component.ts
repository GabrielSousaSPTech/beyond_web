import { Component } from '@angular/core';
import { GoogleChartsModule } from 'angular-google-charts';
declare var google: any;

@Component({
  selector: 'app-combo-chart-all',
  imports: [],
  templateUrl: './combo-chart-all.component.html',
  styleUrl: './combo-chart-all.component.css'
})
export class ComboChartAllComponent {
  ngOnInit(): void {
    // Load the Visualization API and the corechart package.
    google.charts.load('current', { 'packages': ['corechart'] });

    // Set a callback to run when the Google Visualization API is loaded.
    google.charts.setOnLoadCallback(this.drawChart);
  }

  drawChart() {
    var data = google.visualization.arrayToDataTable([
      ['Month', 'América Central e Caribe', 'America do Norte', 'América do Sul', 'Europa', 'Africa', 'Oceania', 'Ásia', 'Total'],
      ['Janeiro', 3633, 66633, 735052, 122699, 3394, 7169, 18147, 956737],
      ['Fevereiro', 3797, 86994, 534411, 170635, 3937, 7841, 25686, 833306],
      ['Março', 5727, 104576, 426580, 163396, 4494, 8816, 26888, 740483],
      ['Abril', 5159, 63179, 197391, 102578, 4572, 4049, 21650, 398587],
      ['Maio', 5128, 60163, 169745, 72343, 4415, 3068, 20790, 335652]
    ]);

    var options = {
      /* title: 'Entrada de Turistas Mensal por País', */
      /*   vAxis: { title: 'Chegadas' },
        hAxis: { title: 'Meses' }, */
      seriesType: 'bars',
      series: { 7: { type: 'line' } },
      'height': 500,
      legend: { position: 'top' },
      chartArea: {
        height: '90%',
        width: '100%',
        left: 100,
        right: 30
      }
    };

    // Instantiate and draw our chart, passing in some options.
    var chart = new google.visualization.ComboChart(document.getElementById('chart_div'));
    chart.draw(data, options);
  }
}
