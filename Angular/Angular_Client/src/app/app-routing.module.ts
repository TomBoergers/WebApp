import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {StudentListComponent} from "./student-list/student-list/student-list.component";
import {StudentFormComponent} from "./student-form/student-form/student-form.component";
import {StudentSearchComponent} from "./student-search/student-search.component";

const routes: Routes = [
  {path:'students',component:StudentListComponent},
  {path:'addstudent',component:StudentFormComponent},
  {path:'searchstudent',component:StudentSearchComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
