import {Component, Output} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {TableService} from "../../../../services/table.service";

@Component({
  selector: 'app-table-vorname',
  templateUrl: './table-vorname.component.html',
  styleUrls: ['./table-vorname.component.scss']
})
export class TableVornameComponent {

  tableData!: any[][];
  loadTableId = this.tableService.loadTableId;

  constructor(private http: HttpClient, private tableService: TableService) {
  }

  ngOnInit() {
    this.http.get<any[][]>('http://localhost:8080/CSV/' + this.loadTableId).subscribe(data => {
      this.tableData = data;
    });
  }
}
