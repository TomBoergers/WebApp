import { Component, OnInit } from '@angular/core';
import {Student} from "../../Model/student";
import {StudentServiceService} from "../../Service/student-service.service";
import {ActivatedRoute, Router} from "@angular/router";
import * as d3 from 'd3';
import {Subject} from "../../Model/subject";

@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.scss']
})
export class StudentListComponent implements OnInit {

  students: Student[]|any;
  subjects: Subject[]|any;
  url: string="http://localhost:8080/students/StudentPerSubject";

  private ChartData:any;

  constructor(private studentService:StudentServiceService,
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit(): void
  {
    this.studentService.findAll().subscribe(data=>{this.students=data});
    this.studentService.studentsPerSubject().subscribe(data=>{this.subjects=data});
    d3.json(this.url).then(data=>{this.drawBars(data as Subject[]);})
    d3.json(this.url).then(data=>{this.drawPie(data as Subject[]);})
  }

  deleteStudent(student:Student)
  {
    this.studentService.delete(student);
    window.location.reload();
  }

  private drawBars(data: any[]): void
  {
      //Aufgabe 3
  }

  private drawPie(data: any[]): void {
    let svg: any;
    let width = 350;
    let height = 400;
    let radius = Math.min(width, height) / 2;
    let colors = d3.scaleOrdinal()
      .domain(data.map(d => d.numberOfStudents.toString()))
      .range(["#4daf4a","#377eb8","#ff7f00","#984ea3","#e41a1c","#ffff33","#a65628"]);

    svg = d3.select("figure#pie")
      .append("svg")
      .attr("width", width)
      .attr("height", height)
      .append("g")
      .attr(
        "transform",
        "translate(" + width / 2 + "," + height / 2 + ")"
      );
    const pie = d3.pie<Subject>().value((d: Subject) => Number(d.numberOfStudents));

    svg
      .selectAll('pieces')
      .data(pie(data))
      .enter()
      .append('path')
      .attr('d', d3.arc()
        .innerRadius(0)
        .outerRadius(radius)
      )
      .attr('fill', (d: any, i: any) => (colors(i)))
      .attr("stroke", "#000000")
      .style("stroke-width", "1px");

    const labelLocation = d3.arc()
      .innerRadius(100)
      .outerRadius(radius);

    svg
      .selectAll('pieces')
      .data(pie(data))
      .enter()
      .append('text')
      .text((d: any) => d.data.name)
      .attr("transform", (d: any) => "translate(" + labelLocation.centroid(d) + ")")
      .style("text-anchor", "middle")
      .style("font-size", 15);
  }
}
