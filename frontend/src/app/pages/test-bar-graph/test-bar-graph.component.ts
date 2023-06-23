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
chartOptions: any = {};

  constructor(private httpClient: HttpClient) { }

  ngOnInit() {
  }


  /*getDataForChart(tableId: number): any {
const dArray: any[]=[];
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
      };*/


getChart2(){
      this.chartOptions = {
    title:{
      text: "Sterbefälle 2015"
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
        { label: "Januar", y: 263},
        { label: "Februar", y: 241 },
        { label: "März", y: 223 },
        { label: "April", y: 188 },
        { label: "Mai", y: 146 },
        { label: "Juni", y: 227 },
        { label: "Juli", y: 190 },
        { label: "August", y: 190 },
        { label: "September", y: 187 },
        { label: "Oktober", y: 187 },
        { label: "November", y: 203 },
        { label: "Dezember", y: 184 },
        { label: "Total", y: 2459 }
      ]
    }]
  }}


  getChart5(){
    this.chartOptions = {
      title:{
        text: "Geburten 2015"
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
          { label: "Januar", y: 208},
          { label: "Februar", y: 171 },
          { label: "März", y: 174 },
          { label: "April", y: 172 },
          { label: "Mai", y: 145},
          { label: "Juni", y: 187},
          { label: "Juli", y: 248 },
          { label: "August", y: 210 },
          { label: "September", y: 186},
          { label: "Oktober", y: 162 },
          { label: "November", y: 189 },
          { label: "Dezember", y: 171 },
          { label: "Total", y: 2223 }
        ]
      }]
    }}

    getChart3(){
    this.chartOptions = {
      title:{
        text: "Arbeitslose Jan 22"
      },
      animationEnabled: true,
      axisY: {
        includeZero: true,
        suffix: ""
      },
      data: [{
        type: "bar",
        indexLabel: "{y}",
        yValueFormatString: "##,###",
        dataPoints: [
          { label: "ELB", y: 15430},
          { label: "Männer", y: 8671},
          { label: "Frauen", y: 6759 },
          { label: "unter 25 Jahren", y: 1082 },
          { label: "25 bis unter 55 Jahren", y: 11423},
          { label: "55 Jahre und Älter", y: 2925},
          { label: "Langzeitarbeitslose ELB", y: 9168 },
          { label: "Männer", y: 5165 },
          { label: "Frauen", y: 4003},
          { label: "unter 25 Jahren;", y: 226 },
          { label: "25 bis unter 55 Jahren", y: 6798 },
          { label: "55 Jahre und Älter", y: 2144 }
        ]
      }]
    }}

    getChart4(){
      this.chartOptions = {
        title:{
          text: "Arbeitssuchende Jan 22"
        },
        animationEnabled: true,
        axisY: {
          includeZero: true,
          suffix: ""
        },
        data: [{
          type: "bar",
          indexLabel: "{y}",
          yValueFormatString: "##,###",
          dataPoints: [
            { label: "ELB", y: 6534},
            { label: "Ohne abgeschlossene Berufsausbildung", y: 433},
            { label: "Betriebliche/schulische Ausbildung", y: 7684},
            { label: "Akademische Ausbildung", y:4220 },
            { label: "Ohne Angabe", y: 200},
            { label: "Kein Hauptschulabschluss", y: 2595},
            { label: "Hauptschulabschlus", y: 1408 },
            { label: "Mittlere Reife", y: 1187 },
            { label: "Fachhochschulreife", y: 23092},
            { label: "Abitur/Hochschulreife", y: 17085 },
            { label: "Ohne Angabe", y: 4884}
          ]
        }]
      }}
}
