import {Component} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {TableService} from "../../../services/table.service";

@Component({
  selector: 'app-table-vorname',
  templateUrl: './table-pages.component.html',
  styleUrls: ['./table-pages.component.scss']
})
export class TablePagesComponent {

  tableData: any[][] = [];
  filteredTableData: any[][] = [];
  loadTableId = this.tableService.loadTableId;
  searchTerm: String = "";
  headers: string[] = [];

  constructor(private http: HttpClient, private tableService: TableService) {
  }

  ngOnInit() {
    this.http.get<any[][]>('http://localhost:8080/CSV/' + this.loadTableId).subscribe(data => {
      this.tableData = data;
      this.headers = this.tableData[0];
      this.filteredTableData = this.tableData.slice(1);
    });
  }

  applyFilter() {
    if(this.searchTerm) {
      this.filteredTableData = this.tableData.slice(1).filter(row =>
        row.some(cell => cell.toString().toLowerCase().includes(this.searchTerm.toLowerCase()))
      );
    } else {
      this.filteredTableData = this.tableData.slice(1);
    }
  }
}
