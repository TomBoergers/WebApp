import {Component, Input, OnInit} from '@angular/core';
import { Chart } from 'chart.js';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
@Component({
  selector: 'app-test-bar-graph',
  templateUrl: './test-bar-graph.component.html',
  styleUrls: ['./test-bar-graph.component.scss']
})
export class TestBarGraphComponent implements OnInit{
  @Input() chartData: { label: any, y: any }[] = [];


  constructor(private httpClient: HttpClient) { }

  ngOnInit() {
    this.getDataForChart(2).subscribe(data => {
      this.chartData = data;
      this.updateChartOptions();
    });
  }

  getDataForChart(tableId: number): Observable<{ label: any, y: any }[]> {
    return this.httpClient.get<{ label: any, y: any }[]>("http://localhost:8080/CSV/" + tableId);
  }

  updateChartOptions() {
    this.chartOptions = {
      title: {
        text: 'Sterbefälle'
      },
      animationEnabled: true,
      axisY: {
        includeZero: true,
        suffix: ''
      },
      data: [{
        type: 'bar',
        indexLabel: '{y}',
        yValueFormatString: '#,###',
        dataPoints: this.chartData
      }]
    };
  }

  chartOptions: any = {};

  /*getDataForChart(tableId: number): any[][] {
const dArray: any[][]=[];
    this.httpClient.get<any[][]>("http://localhost:8080/CSV/" + tableId).subscribe(data => {
      const chartData = data.map(item => ({
        label: item[0],
        y: item[1]
      }));
      chartData.shift();
     dArray.push(chartData);
    });
    return dArray;
  }


      chartOptions = {
        title: {
          text: 'Sterbefälle'
        },
        animationEnabled: true,
        axisY: {
          includeZero: true,
          suffix: ''
        },
        data: [{
          type: 'bar',
          indexLabel: '{y}',
          yValueFormatString: '#,###',
          dataPoints: [this.getDataForChart(2)]
        }]
      };



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
