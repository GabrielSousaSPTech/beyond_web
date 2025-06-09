import { Component } from '@angular/core';
import { GoogleChartsModule } from 'angular-google-charts';
declare var google: any;

@Component({
  selector: 'app-geo-chart-world',
  imports: [],
  templateUrl: './geo-chart-world.component.html',
  styleUrl: './geo-chart-world.component.css'
})
export class GeoChartWorldComponent {
  ngOnInit(): void {
    // Load the Visualization API and the corechart package.
    google.charts.load('current', { 'packages': ['geochart'] });

    // Set a callback to run when the Google Visualization API is loaded.
    google.charts.setOnLoadCallback(this.drawChart);
  }

  drawChart() {
    var data = google.visualization.arrayToDataTable(
      [
        ['Países', 'Chegadas'],
        ['Germany', 182166],
        ['Argentina', 1960182],
        ['Belgium', 26530],
        ['Canada', 96540],
        ['Chile', 653895],
        ['Denmark', 15117],
        ['Slovakia', 3253],
        ['Spain', 132484],
        ['United States', 728537],
        ['France', 235163],
        ['Netherlands', 54273],
        ['Ireland', 42832],
        ['Italy', 154495],
        ['Latvia', 1499],
        ['Mexico', 99137],
        ['Paraguay', 465020],
        ['Poland', 25967],
        ['Portugal', 218354],
        ['United Kingdom', 153754],
        ['Russia', 31009],
        ['Sweden', 20776],
        ['Switzerland', 58092],
        ['Ukraine', 4795],
        ['Venezuela', 8637],
        ['Angola', 13520],
        ['Australia', 52888],
        ['Other Central America and Caribbean countries', 2901],
        ['China', 76524],
        ['China, Hong Kong', 4052],
        ['Colombia', 129501],
        ['Costa Rica', 16812],
        ['El Salvador', 4357],
        ['Ecuador', 38493],
        ['Philippines', 5714],
        ['Greece', 9176],
        ['Guatemala', 8909],
        ['Guyana', 6399],
        ['Honduras', 3535],
        ['Hungary', 6964],
        ['India', 15274],
        ['Israel', 16485],
        ['Japan', 61129],
        ['Malaysia', 3873],
        ['Other European countries', 6161],
        ['Morocco', 4854],
        ['Mozambique', 4156],
        ['Norway', 13869],
        ['Panama', 11125],
        ['Pakistan', 952],
        ['Peru', 131368],
        ['South Korea', 28435],
        ['Dominican Republic', 12833],
        ['Czech Republic', 7152],
        ['Romania', 10558],
        ['Suriname', 11873],
        ['Thailand', 4112],
        ['Bolivia', 129992],
        ['Uruguay', 388464],
        ['Austria', 18469],
        ['Bulgaria', 4142],
        ['Cape Verde', 568],
        ['Other Asian countries', 13440],
        ['Croatia', 3444],
        ['Slovenia', 1960],
        ['Estonia', 1513],
        ['Other African countries', 10184],
        ['Lithuania', 2615],
        ['Luxembourg', 2340],
        ['Serbia', 2961],
        ['Turkey', 25117],
        ['Finland', 5166],
        ['Indonesia', 6035],
        ['Iran', 4438],
        ['Nicaragua', 1739],
        ['Kenya', 909],
        ['Tunisia', 1710],
        ['Singapore', 5014],
        ['Cuba', 3848],
        ['Egypt', 1656],
        ['Haiti', 836],
        ['New Zealand', 11030],
        ['Taiwan', 4087],
        ['Trinidad and Tobago', 820],
        ['South Africa', 15280],
        ['Saudi Arabia', 2384],
        ['Lebanon', 2569],
        ['Other Oceanian countries', 115],
        ['Ghana', 867],
        ['Nigeria', 1627],
        ['Bangladesh', 1171],
        ['Syria', 588],
        ['Unspecified countries', 56],
        ['French Guiana', 4]
      ]
    );

    var options = {
      /* displayMode: 'text', */
      region: 'world',
      colorAxis: { colors: ['#aec7e8', '#1f77b4'] },
      height: 600,
      width: 700
    };

    var chart = new google.visualization.GeoChart(document.getElementById('geoChartWorld_div'));

    chart.draw(data, options);

  }
}
