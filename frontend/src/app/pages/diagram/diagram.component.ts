import { Component, OnInit, AfterViewInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'diagram',
  templateUrl: './diagram.component.html',
  styleUrls: ['./diagram.component.scss']
})
export class DiagramComponent {


  constructor(private http: HttpClient) {
  }

  /*ngOnInit() {
    this.createPieChart();
  }*/

  ngAfterViewInit() {
  }

  /*createPieChart() {
    const pieChart = new Chart('pieChart', {
      type: 'pie',
      date: {
        labels: ['Label 1', 'Label 2', 'Label 3'],
        datasets: [
          {
            data: [40, 30, 20],
            backgroundColor: ['red', 'blue', 'green'],
          },
        ],
      },
      options: {
        responsive: true,
      },
    });
  }*/
}
