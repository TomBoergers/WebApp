import {Component, Input} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {generate, map, Observable} from "rxjs";
import { Chart, ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import {DiagramService} from "../../services/diagram.service";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import autoTable from "jspdf-autotable";


@Component({
  selector: 'diagram',
  templateUrl: './diagram.component.html',
  styleUrls: ['./diagram.component.scss']
})
export class DiagramComponent {
  constructor(private httpClient:HttpClient, private diagramService: DiagramService) { }

  genderWomen: any;
  genderMen: any;
  gender: string[][] = [];
  chartOptions: any;
  dataLabel: any[] = [];
  dataValue: any[] = [];
  @Input() pieData: { y: any, name: any}[] = [];
  tableID: string="";
  tableData: any[][] = [];
  imgWidth:any ;
  imgHeight:any ;

  ngOnInit() {
  }
  /*getDataPie(): any {
    return this.httpClient.get<any[][]>("http://localhost:8080/CSV/2").subscribe(data => {
      this.pieData = this.convertData2(data);
      console.log(this.pieData)
    });
  }

  convertData2(data: any[][]): { y: any, name: any}[] {
    // Assuming the data array has two columns: [amount, value]
    //return data.map(row => ({ x: row[0], y: row[1] }));
    const convertedData = data.map(row => ({ y: row[0], name: row[1] }));
    convertedData.shift();
    convertedData.pop();

    return convertedData;
  }

  getPie() {

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
    }*/

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

//start

  getPie2(){
    this.tableID="2";
    this.chartOptions = {
      animationEnabled: true,
      title: {
        text: "Sterbefälle 2015"
      },
      data: [{
        type: "pie",
        startAngle: -90,
        indexLabel: "{label}",
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
          { label: "Dezember", y: 184 }
        ]
      }]
    };
  }

  getPie5(){
    this.tableID="5";
    this.chartOptions = {
      animationEnabled: true,
      title: {
        text: "Geburten 2015"
      },
      data: [{
        type: "pie",
        startAngle: -90,
        indexLabel: "{label}",
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
          { label: "Dezember", y: 171 }
        ]
      }]
    };
  }

  getPie3() {
    this.tableID="3";
    this.chartOptions = {
      animationEnabled: true,
      title: {
        text: "Arbeitslose  Jan 22"
      },
      data: [{
        type: "pie",
        startAngle: -90,
        indexLabel: "{label}",
        yValueFormatString: "##,####",
        dataPoints: [
          {label: "Arbeitslose erwerbsfähige Leistungsberechtigte", y: 15430},
          {label: "Männer", y: 8671},
          {label: "Frauen", y: 6759},
          {label: "unter 25 Jahren", y: 1082},
          {label: "25 bis unter 55 Jahren", y: 11423},
          {label: "55 Jahre und Älter", y: 2925},
          { label: "Langzeitarbeitslose ELB", y: 9168 },
          { label: "Männer", y: 5165 },
          { label: "Frauen", y: 4003},
          { label: "unter 25 Jahren;", y: 226 },
          { label: "25 bis unter 55 Jahren", y: 6798 },
          { label: "55 Jahre und Älter", y: 2144 }
        ]
      }]
    };
  }



  getPie4(){
    this.tableID="4";
    this.chartOptions = {
      animationEnabled: true,
      title: {
        text: "Arbeitssuchende Jan 22"
      },
      data: [{
        type: "pie",
        startAngle: -90,
        indexLabel: "{label}",
        yValueFormatString: "##,####",
        dataPoints: [
          { label: "Arbeitsuchende erwerbsfähige Leistungsberechtigte", y: 6534},
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
    };}





  getChart2(){
    this.tableID="2";
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
    this.tableID="5";
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
    this.tableID="3";
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
    this.tableID="4";
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

  generatePDF() {
    const doc = new jsPDF();

    // Exportdatum erstellen
    const exportDate = new Date().toLocaleDateString();
    this.httpClient.get<any[][]>('http://localhost:8080/CSV/' + this.tableID).subscribe(data => {
      this.tableData = data;
      this.httpClient.get<any[][]>("http://localhost:8080/CSV/nameAndYear/"+this.tableID).subscribe(data => {
        const nameAndYear=data;

        // Titel hinzufügen
        doc.setFontSize(20);
        doc.text(nameAndYear[0], 10, 10);
        // Exportdatum hinzufügen
        doc.setFontSize(8);
        doc.text(`Exportdatum: ${exportDate}`, 10, 20);

        // Chart-Container-Element erfassen
        const chartContainer = document.getElementById("chart");
        // Überprüfen, ob das Chart-Container-Element gefunden wurde
        if (chartContainer) {
          // Das Chart-Element als Bild erfassen
          html2canvas(chartContainer).then((canvas) => {
            // Das Bilddaten-URL des Charts erhalten
            const imageData = canvas.toDataURL("image/png");
            this.imgWidth = 180;
            this.imgHeight =(canvas.height*this.imgWidth)/canvas.width;
            console.log(this.chartOptions.data[0].type);
            if(this.chartOptions.data[0].type=="pie"){
              this.imgHeight = this.imgHeight*2
              doc.addImage(imageData, "PNG", -80, 30, 180*2, this.imgHeight);
            }
            else{
              this.imgHeight = this.imgHeight*1.5;
              doc.addImage(imageData, "PNG", 10, 30, 180, this.imgHeight);
            }// Anpassen der Position und Größe des Bildes

            autoTable(doc, {
              head: [this.tableData[0]],
              body: this.tableData.slice(1),
              startY: 40+this.imgHeight,
              headStyles: {
                fillColor: [255, 165, 0]
              }
            })
            // Die PDF-Datei speichern oder anzeigen
            doc.save(nameAndYear[0]+".pdf");
          })}
      });

        });
    }


}
