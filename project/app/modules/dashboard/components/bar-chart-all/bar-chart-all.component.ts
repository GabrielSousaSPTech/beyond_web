import { Component, Input, input, OnInit, signal } from '@angular/core';
import { GoogleChartsModule } from 'angular-google-charts';
import { Observable } from 'rxjs';
declare var google: any;

@Component({
  selector: 'app-bar-chart-all',
  imports: [],
  templateUrl: './bar-chart-all.component.html',
  styleUrl: './bar-chart-all.component.css'
})
export class BarChartAllComponent implements OnInit {
  @Input() chartData!: Observable<any>;
  protected noData = signal(false);
  @Input() enableBarChart: boolean = false;
  ngOnInit(): void {

    google.charts.load('current', { 'packages': ['corechart'] });

    this.chartData.subscribe(data => {
      google.charts.setOnLoadCallback(() => {
        console.log(data)
        if (data.length < 2) {
          this.noData.set(true);
        } else {
          this.noData.set(false);
          this.drawChart(data);
        }
      });
    });
  }

  displayGraph(bool: boolean) {
    if (bool) {
      return "visibility: hidden; height: 0;";
    }
    return "visibility: visible;";
  }

  drawChart(chartData: string[][]) {

    var data = new google.visualization.DataTable();
    data.addColumn('string', 'Países');
    data.addColumn('number', 'Chegadas');
    data.addRows(chartData);


    var options = {
      height: 500,
      legend: { position: 'top' },
      chartArea: {
        height: '98%',
        width: '100%',
        left: 150,
        right: 0,
      }
    };


    var barChart = new google.visualization.BarChart(document.getElementById('chart_div_Bar'));
    barChart.draw(data, options);

  }

}
