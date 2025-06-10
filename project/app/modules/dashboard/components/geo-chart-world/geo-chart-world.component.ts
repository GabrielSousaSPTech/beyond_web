import { Component, Input, input, OnInit, signal } from '@angular/core';
import { GoogleChartsModule } from 'angular-google-charts';
import { Observable } from 'rxjs';
declare var google: any;

@Component({
  selector: 'app-geo-chart-world',
  imports: [],
  templateUrl: './geo-chart-world.component.html',
  styleUrl: './geo-chart-world.component.css'
})
export class GeoChartWorldComponent implements OnInit {
  @Input() chartData!: Observable<any>;
  protected noData = signal(false);
  ngOnInit(): void {

    google.charts.load('current', { 'packages': ['geochart'] });

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

  drawChart(chartData: string[][]) {
    var data = new google.visualization.DataTable();
    data.addColumn('string', 'Países');
    data.addColumn('number', 'Chegadas');
    data.addRows(chartData);


    var options = {
      /* displayMode: 'text', */
      region: 'world',
      colorAxis: { colors: ['#aec7e8', '#1f77b4'] },
      height: 800,
      width: 570,
    };

    var chart = new google.visualization.GeoChart(document.getElementById('geoChartWorld_div'));

    chart.draw(data, options);

  }
}
