import { Component, Input } from '@angular/core';
import { GoogleChartsModule } from 'angular-google-charts';
import { Observable } from 'rxjs';
declare var google: any;

@Component({
  selector: 'app-combo-chart-all',
  imports: [],
  templateUrl: './combo-chart-all.component.html',
  styleUrl: './combo-chart-all.component.css'
})
export class ComboChartAllComponent {
  @Input() chartData!: Observable<any>;
  ngOnInit(): void {
    google.charts.load('current', { 'packages': ['corechart'] });

    this.chartData.subscribe(data => {
      google.charts.setOnLoadCallback(() => {
        this.drawChart(data);
      });
    });
  }

  drawChart(graphData: string[][]) {
    var data = google.visualization.arrayToDataTable(graphData);

    const totalSeries: number = graphData[0].length - 2;
    console.log("Total series: " + totalSeries)

    var options = {
      /* title: 'Entrada de Turistas Mensal por País', */
      /*   vAxis: { title: 'Chegadas' },
        hAxis: { title: 'Meses' }, */
      seriesType: 'bars',
      series: { [totalSeries]: { type: 'line' } },
      'height': 500,
      legend: { position: 'top' },
      chartArea: {
        height: '76%',
        width: '100%',
        left: 90,
        right: 10
      },
      hAxis: {
        slantedText: true,
        slantedTextAngle: 45,
        textStyle: {
          fontSize: 14
        }
      }
    };

    var chart = new google.visualization.ComboChart(document.getElementById('chart_div'));
    chart.draw(data, options);
  }
}
