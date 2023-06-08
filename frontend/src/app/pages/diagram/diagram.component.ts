import { Component, OnInit, AfterViewInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";



@Component({
  selector: 'diagram',
  templateUrl: './diagram.component.html',
  styleUrls: ['./diagram.component.scss']
})
export class DiagramComponent {


  genderWomen:any = this.getGenderCountWoman();
  genderMen: any = this.getGenderCountMan();
  gender: any[][]=  [];


  constructor(private httpClient: HttpClient) {

  }

  chartOptions = {
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
        {y: 30, name: "Women"},
        {y: 20, name: "Men"}
      ]
    }]
  }

  ngOnInit() {

  }


  getGenderCountWoman() {
     this.httpClient.get<any[][]>("http://localhost:8080/CSV/1").subscribe(data => {
       this.gender = data;
     });

     let women = "w";
     let countW= 0;
     for(let j = 0; j < this.gender.length; j++){

           if(this.gender[2][j] === women){
             countW++;
           }
       }
    return countW;
     }



  getGenderCountMan() {
    this.httpClient.get<any[][]>("http://localhost:8080/CSV/1").subscribe(data => {
      this.gender = data;
    });

    //let women = "w";
    let men = "m";
    //let countW= 0;
    let countM = 0;
    for(let i = 0; i < this.gender.length; i++){

          if(this.gender[2][i] === men){
            countM++;
          }
      }
    return countM;
    }
}
