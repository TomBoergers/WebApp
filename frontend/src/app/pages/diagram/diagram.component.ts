import {Component, Input} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {map, Observable} from "rxjs";
import { Chart, ChartDataSets, ChartOptions, ChartType } from 'chart.js';


@Component({
  selector: 'diagram',
  templateUrl: './diagram.component.html',
  styleUrls: ['./diagram.component.scss']
})
export class DiagramComponent {
  constructor(private httpClient:HttpClient) { }

  genderWomen: any;
  genderMen: any;
  gender: string[][] = [];
  chartOptions: any;
  dataLabel: any[] = [];
  dataValue: any[] = [];
  @Input() pieData: { x: any, y: any}[] = [];



  ngOnInit() {
  }
  getDataPie(): any {
    return this.httpClient.get<any[][]>("http://localhost:8080/CSV/2").subscribe(data => {
      this.pieData = this.convertData2(data);
      console.log(this.pieData)
    });
  }

  convertData2(data: any[][]): { x: any, y: any}[] {
    // Assuming the data array has two columns: [amount, value]
    //return data.map(row => ({ x: row[0], y: row[1] }));
    const convertedData = data.map(row => ({ x: row[0], y: row[1] }));
    convertedData.shift();
    convertedData.pop();

    return convertedData;
  }

  drawPie() {

    this.httpClient.get<string[][]>("http://localhost:8080/CSV/2").subscribe(
      (data: string[][]) => {
        this.gender = data;

        for (let i = 1; i < this.gender.length; i++) {
            this.chartOptions = {
              animationEnabled: true,
              title: {
                text: "Verhältnis männlich und weiblich"
              },
              data: [{
                type: "pie",
                startAngle: -90,
                indexLabel: "{name}: {y}",
                yValueFormatString: "#,###.##'%'",
                dataPoints: [
                  this.gender[i][0], this.gender[i][1]
                ]
              }]
            };
          }
      }
    );


  }

  getLabel() {
    let label;
    for (let i = 0; i < this.gender.length; i++) {
      this.dataLabel[i] = this.gender[i][0];
    }
  }
    getValue() {
      let value;
      for (let i = 0; i < this.gender.length; i++) {
        this.dataValue[i] = this.gender[i][1];
      }
    }

  getGenderCountWoman() {
    let women = "w";
    let countW = 0;
    if (this.gender && this.gender.length) {
      for (let j = 0; j < this.gender.length; j++) {

        if (this.gender[j][2]=== '"w"') {
          countW++;
        }
      }
    }
    return countW;
  }

  getGenderCountMan() {
    let men = "m";
    let countM = 0;
    if (this.gender && this.gender.length) {
      for (let j = 0; j < this.gender.length; j++) {

        if (this.gender[j][2] === '"m"') {

          countM++;
        }
      }
    }
    return countM;
  }


  calculatePercentW():Observable<number> {
    return this.httpClient.get<string[][]>("http://localhost:8080/CSV/1").pipe(
      map((data: string[][]) => {
        this.gender = data;
        this.genderWomen = this.getGenderCountWoman();
        return parseFloat(((this.genderWomen / this.gender.length) * 100).toPrecision(1));
      })
    );
  }

  calculatePercentM():Observable<number> {
    return this.httpClient.get<string[][]>("http://localhost:8080/CSV/1").pipe(
      map((data: string[][]) => {
        this.gender = data;
        this.genderMen = this.getGenderCountMan();
        return parseFloat(((this.genderMen / this.gender.length) * 100).toPrecision(1));
      })
    );
  }


}
