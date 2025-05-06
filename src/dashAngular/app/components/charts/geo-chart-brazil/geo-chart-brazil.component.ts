import { Component } from '@angular/core';
import { GoogleChartsModule } from 'angular-google-charts';
declare var google: any;

@Component({
  selector: 'app-geo-chart-brazil',
  imports: [],
  templateUrl: './geo-chart-brazil.component.html',
  styleUrl: './geo-chart-brazil.component.css'
})
export class GeoChartBrazilComponent {
  ngOnInit(): void {
    // Load the Visualization API and the corechart package.
    google.charts.load('current', { 'packages': ['geochart'] });

    // Set a callback to run when the Google Visualization API is loaded.
    google.charts.setOnLoadCallback(this.drawChart);
  }

  drawChart() {
    var data = google.visualization.arrayToDataTable(
      [
        ['Estado', 'Chegadas'],
        ['São Paulo', 2274932], // São Paulo
        ['Rio de Janeiro', 1528133], // Rio de Janeiro
        ['Paraná', 912255], // Paraná
        ['Rio Grande do Sul', 883662], // Rio Grande do Sul
        ['Santa Catarina', 495358], // Santa Catarina
        ['Bahia', 143605], // Bahia
        ['Ceará', 96882], // Ceará
        ['Mato Grosso do Sul', 76557], // Mato Grosso do Sul
        ['Pernambuco', 70686], // Pernambuco
        ['Distrito Federal', 68469], // Distrito Federal
        ['Minas Gerais', 43287],  // Minas Gerais
        ['Amapá', 38918],  // Amapá
        ['Pará', 33285],  // Pará
        ['Amazonas', 28514],  // Amazonas
        ['Rio Grande do Norte', 25919], // Rio Grande do Norte
        ['Acre', 19816]  // Acre

      ]
    );

    var options = {
      region: 'BR', // Define a região como Brasil.
      resolution: 'provinces', // Mostra estados em vez de países.
      colorAxis: { colors: ['#aec7e8', '#1f77b4'] }, // Define as cores do gradiente.
      'width': 800,
      'height': 800
    };

    var chart = new google.visualization.GeoChart(document.getElementById('chart_div_Map'));

    chart.draw(data, options);

    /*  var barChart = new google.visualization.BarChart(document.getElementById('chart_div_Map_Bar'));
     barChart.draw(data, options); */
  }

}
