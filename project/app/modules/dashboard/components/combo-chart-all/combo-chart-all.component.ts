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
  
  private chart: any;
  private chartDataTable: any;
  private dataView: any;
  private columns: any[] = [];
  private currentGraphData: string[][] = [];

  ngOnInit(): void {
    google.charts.load('current', { 'packages': ['corechart'] });
    this.chartData.subscribe(data => {
      google.charts.setOnLoadCallback(() => {
        this.drawChart(data);
      });
    });
  }

  private initializeColumns(graphData: string[][]) {
    if (!graphData || graphData.length === 0) return;
    
    this.columns = [];
    const headers = graphData[0];
    
    this.columns.push({
      type: 'string',
      label: headers[0],
      visible: true
    });

    // Data columns with modern, vibrant colors
    const defaultColors = [
      '#3B82F6', // Blue
      '#EF4444', // Red
      '#10B981', // Emerald
      '#F59E0B', // Amber
      '#8B5CF6', // Violet  
      '#06B6D4', // Cyan
      '#F97316', // Orange
      '#84CC16', // Lime
      '#EC4899', // Pink
      '#6366F1', // Indigo
      '#14B8A6', // Teal
      '#F43F5E'  // Rose
    ];
    const defaultDisabledColors = [
      '#BFDBFE', // Blue disabled
      '#FECACA', // Red disabled
      '#A7F3D0', // Emerald disabled
      '#FDE68A', // Amber disabled
      '#DDD6FE', // Violet disabled
      '#A5F3FC', // Cyan disabled
      '#FED7AA', // Orange disabled
      '#D9F99D', // Lime disabled
      '#FBCFE8', // Pink disabled
      '#C7D2FE', // Indigo disabled
      '#99F6E4', // Teal disabled
      '#FECDD3'  // Rose disabled
    ];
    
    for (let i = 1; i < headers.length; i++) {
      const colorIndex = (i - 1) % defaultColors.length;
      this.columns.push({
        type: 'number',
        label: headers[i],
        color: defaultColors[colorIndex],
        disabledColor: defaultDisabledColors[colorIndex],
        visible: true
      });
    }
  }

  private nullFunc = function() { return null; };

  drawChart(graphData: string[][]) {
    if (!graphData || graphData.length === 0) {
      console.error('No data available to draw the chart.');
      return;
    }

    this.currentGraphData = [...graphData];
    const totalSeries: number = graphData[0].length - 2;
    console.log("total series: ", totalSeries);

    if (totalSeries < 2) {
      for (let i = 0; i < graphData.length; i++) {
        graphData[i].pop();
      }
    }

    const dataChanged = !this.columns.length || this.columns.length !== graphData[0].length;

    if (!this.chart || dataChanged) {
      this.initializeColumns(graphData);
      this.chartDataTable = google.visualization.arrayToDataTable(graphData);
      this.dataView = new google.visualization.DataView(this.chartDataTable);
      
      if (!this.chart) {
        this.chart = new google.visualization.ComboChart(document.getElementById('chart_div'));
        
        google.visualization.events.addListener(this.chart, 'click', (target: any) => {
          if (target.targetID && target.targetID.match(/^legendentry#\d+$/)) {
            const index = parseInt(target.targetID.slice(12)) + 1;
            if (index < this.columns.length) {
              this.columns[index].visible = !this.columns[index].visible;
              this.redrawChart();
            }
          }
        });
      }
    } else {
      this.chartDataTable = google.visualization.arrayToDataTable(graphData);
      this.dataView = new google.visualization.DataView(this.chartDataTable);
    }

    this.redrawChart();
  }

  private redrawChart() {
    const visibleColumnIndexes: any[] = [0]; 
    const colors: string[] = [];
    const series: any = {};

    for (let i = 1; i < this.columns.length; i++) {
      if (this.columns[i].visible) {
        colors.push(this.columns[i].color);
        visibleColumnIndexes.push(i);
      } else {
        colors.push(this.columns[i].disabledColor);
        visibleColumnIndexes.push({
          calc: this.nullFunc,
          type: this.columns[i].type,
          label: this.columns[i].label,
        } as any);
      }
    }

    this.dataView.setColumns(visibleColumnIndexes);

    const totalVisibleSeries = visibleColumnIndexes.length - 1;
    const originalTotalSeries = this.currentGraphData[0].length - 2;
    
    if (totalVisibleSeries >= 1 && originalTotalSeries > 1) {
      series[totalVisibleSeries - 1] = { type: 'line' };
    }

    const options = {
      seriesType: 'bars',
      height: 500,
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
      },
      colors: colors,
      series: series
    };

    this.chart.draw(this.dataView, options);
  }
}