import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SEPHeaderComponent } from './sepheader/sepheader.component';
import { SepbottomComponent } from './sepbottom/sepbottom.component';
import { StudentFormComponent } from './student-form/student-form/student-form.component';
import {FormsModule} from "@angular/forms";
import { StudentListComponent } from './student-list/student-list/student-list.component';
import {HttpClientModule} from "@angular/common/http";
import {StudentServiceService} from "./Service/student-service.service";
import { StudentSearchComponent } from './student-search/student-search.component';
import { BarComponent } from './bar/bar.component';
import { PieComponent } from './pie/pie.component';

@NgModule({
  declarations: [
    AppComponent,
    SEPHeaderComponent,
    SepbottomComponent,
    StudentFormComponent,
    StudentListComponent,
    StudentSearchComponent,
    BarComponent,
    PieComponent
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        FormsModule
    ],
  providers: [StudentServiceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
