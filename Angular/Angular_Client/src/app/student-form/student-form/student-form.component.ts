import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {StudentServiceService} from "../../Service/student-service.service";
import {Student} from "../../Model/student";
import {Observable} from "rxjs";

@Component({
  selector: 'app-student-form',
  templateUrl: './student-form.component.html',
  styleUrls: ['./student-form.component.scss']
})
export class StudentFormComponent {

  student:Student;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private studentService: StudentServiceService) {this.student=new Student()}

  onSubmit()
  {
    //Aufgabe 1
  }
}
