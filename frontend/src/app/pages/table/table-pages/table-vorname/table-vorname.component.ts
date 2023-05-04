import { Component } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-table-vorname',
  templateUrl: './table-vorname.component.html',
  styleUrls: ['./table-vorname.component.scss']
})
export class TableVornameComponent {

  tableData!: any[][];

  constructor(private http: HttpClient) {
  }

  ngOnInit() {
    const tableId = 2;
    this.http.get<any[][]>('http://localhost:8080/CSV/' + tableId).subscribe(data => {
      this.tableData = data;
    });
  }
}
