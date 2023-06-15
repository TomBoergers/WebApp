import {Component, Input, OnInit} from '@angular/core';
import { Chart } from 'chart.js';
import {HttpClient} from "@angular/common/http";
@Component({
  selector: 'app-test-bar-graph',
  templateUrl: './test-bar-graph.component.html',
  styleUrls: ['./test-bar-graph.component.scss']
})
export class TestBarGraphComponent implements OnInit{
  @Input() dataData: { label: any, y: any }[] = [];
  chartOptions: any = {};

  constructor(private httpClient: HttpClient) { }

  ngOnInit() {
    this.getDataForChart(2)
  }

  getDataForChart(tableId: number): any {
    this.httpClient.get<any[]>("http://localhost:8080/CSV/" + tableId).subscribe(data => {
      const chartData = data.map(item => ({
        label: item[0],
        y: item[1]
      }));
      chartData.shift();
     // chartData.push({ label: 'Total', y: 320 });
      console.log(chartData);

      this.chartOptions = {
        title: {
          text: 'Total Impressions by Platforms'
        },
        animationEnabled: true,
        axisY: {
          includeZero: true,
          suffix: ''
        },
        data: [{
          type: 'bar',
          indexLabel: '{y}',
          yValueFormatString: '#,####',
          dataPoints: chartData
        }]
      };
    });
  }









    /*  chartOptions = {
    title:{
      text: "Total Impressions by Platforms"
    },
    animationEnabled: true,
    axisY: {
      includeZero: true,
      suffix: ""
    },
    data: [{
      type: "bar",
      indexLabel: "{y}",
      yValueFormatString: "#,####",
      dataPoints: [
        { label: "Januar", y: 1},
        { label: "Februar", y: 20 },
        { label: "März", y: 24 },
        { label: "April", y: 29 },
        { label: "Mai", y: 73 },
        { label: "Juni", y: 15 },
        { label: "Juli", y: 20 },
        { label: "August", y: 24 },
        { label: "September", y: 29 },
        { label: "Oktober", y: 73 },
        { label: "November", y: 45 },
        { label: "Dezember", y: 30 },
        { label: "Total", y: 320 }
      ]
    }]
  }*/


}
