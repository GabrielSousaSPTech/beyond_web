import { Component, Input, input } from '@angular/core';
import { GoogleChartsModule } from 'angular-google-charts';
import { Observable } from 'rxjs';
declare var google: any;

@Component({
  selector: 'app-bar-chart-all',
  imports: [],
  templateUrl: './bar-chart-all.component.html',
  styleUrl: './bar-chart-all.component.css'
})
export class BarChartAllComponent {
  ngOnInit(): void {
 
    google.charts.load('current', { 'packages': ['corechart'] });

    google.charts.setOnLoadCallback(this.drawChart);
  }

  drawChart() {

    var data = new google.visualization.DataTable();
    data.addColumn('string', 'Topping');
    data.addColumn('number', 'Chegadas');
    data.addRows([
      ['Argentina', 1132872],
      ['Estados Unidos', 298021],
      ['Chile', 294485],
      ['Paraguai', 243479],
      ['Uruguai', 210915],
    ]);


    var options = {
      'height': 500,
      legend: { position: 'top' },
      chartArea: {
        height: '90%',
        width: '100%',
        left: 100,
        right: 100
      }
    };


    var barChart = new google.visualization.BarChart(document.getElementById('chart_div_Bar'));
    barChart.draw(data, options);

  }

}
