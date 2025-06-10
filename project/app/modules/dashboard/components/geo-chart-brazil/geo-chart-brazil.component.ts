import { ChangeDetectionStrategy, Component, Input, input, OnInit, signal } from '@angular/core';
import { GoogleChartsModule } from 'angular-google-charts';
import { Observable } from 'rxjs';
declare var google: any;

@Component({
  selector: 'app-geo-chart-brazil',
  imports: [],
  templateUrl: './geo-chart-brazil.component.html',
  styleUrl: './geo-chart-brazil.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GeoChartBrazilComponent implements OnInit {
  @Input() chartData!: Observable<any>;
  protected noData = signal(false);
  @Input() enableBarChart: boolean = false;
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
      region: 'BR',
      displayMode: 'regions',
      resolution: 'provinces',
      datalessRegionColor: 'transparent', // Mostra estados em vez de países.
      colorAxis: { colors: ['#aec7e8', '#1f77b4'] }, // Define as cores do gradiente.
      height: 600,
      width: 700
    };

    var chart = new google.visualization.GeoChart(document.getElementById('chart_div_Map'));

    chart.draw(data, options);

    /*  var barChart = new google.visualization.BarChart(document.getElementById('chart_div_Map_Bar'));
     barChart.draw(data, options); */
  }

}
