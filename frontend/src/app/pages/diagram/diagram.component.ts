import {Component} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {map, Observable} from "rxjs";

@Component({
  selector: 'diagram',
  templateUrl: './diagram.component.html',
  styleUrls: ['./diagram.component.scss']
})
export class DiagramComponent {

  genderWomen: any;
  genderMen: any;
  gender: string[][] = [];
chartOptions:any;
dataALL: any[][]= [];

  constructor(private httpClient: HttpClient) {

  }




  ngOnInit() {
    this.httpClient.get<string[][]>("http://localhost:8080/CSV/1").subscribe(
      (data: string[][]) => {
        this.gender = data;
        this.genderMen = this.getGenderCountMan(); // Aufruf von getGenderCountMan() hier
        this.genderWomen = this.getGenderCountWoman();

        let percentW = parseFloat(((this.genderWomen / this.gender.length) * 100).toPrecision(2));
        let percentM = parseFloat(((this.genderMen / this.gender.length) * 100).toPrecision(3));

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
              { y: percentW, name: "Women" },
              { y: percentM, name: "Men" }
            ]
          }]
        };
      }
    );

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
