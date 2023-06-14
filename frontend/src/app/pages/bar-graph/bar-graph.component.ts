import { Component, OnInit, Input } from '@angular/core';
import {HttpClient} from "@angular/common/http";
@Component({
  selector: 'app-bar-graph',
  templateUrl: './bar-graph.component.html',
  styleUrls: ['./bar-graph.component.scss']
})
export class BarGraphComponent implements OnInit {
  @Input() graphData: { x: any, y: any}[] = [];
dataALL!:any[][];
chartOptions:any;
  chart: any;
    constructor(private httpClient: HttpClient) {
    }
  ngOnInit(): void {
  }

  getData(tableId: number): void {
    this.httpClient.get<any[][]>("http://localhost:8080/CSV/" + tableId).subscribe(data => {
      this.graphData = this.convertData(data);
      console.log(this.graphData);
      this.initializeChart();
    });
  }

  convertData(data: any[][]): { x: any, y: any }[] {
    // Assuming the data array has two columns: [amount, value]
    //return data.map(row => ({ x: row[0], y: row[1] }));
    const convertedData = data.map(row => ({ x: row[0], y: row[1] }));
    convertedData.shift();
    convertedData.pop();

    return convertedData;
  }

  initializeChart(): void {
    this.chartOptions = {
      title: {
        text: "Angular Column Chart"
      },
      animationEnabled: false,
      data: [{
        type: "column",
        dataPoints: [this.graphData]
      }]
    };
    this.chart.render();
  }





     /* this.chartOptions = {
        title: {
          text: "Angular Column Chart"
        },
        animationEnabled: true,
        data: [{
          type: "column",
          dataPoints: [
            {x: 10, y: 71},
            {x: 20, y: 55},
            {x: 30, y: 50},
            {x: 40, y: 65},
            {x: 50, y: 95},
            {x: 60, y: 68},
            {x: 70, y: 28},
            {x: 80, y: 34},
            {x: 90, y: 14}
          ]
        }]
      }
    }

  chart: any;

  chartOptions = {
    title:{
      text: "Angular Column Chart"
    },
    animationEnabled: true,
    data: [{
      type: "column",
      dataPoints: [
        { x: 10, y: 71 },
        { x: 20, y: 55 },
        { x: 30, y: 50 },
        { x: 40, y: 65 },
        { x: 50, y: 95 },
        { x: 60, y: 68 },
        { x: 70, y: 28 },
        { x: 80, y: 34 },
        { x: 90, y: 14 }
      ]
    }]
  }

  getData2(tableId:number){
   return this.httpClient.get<any[][]>("http://localhost:8080/CSV/" + tableId).subscribe(data=> {
      this.dataALL = data;
     console.log(this.dataALL);
    })
  }

  */
}
