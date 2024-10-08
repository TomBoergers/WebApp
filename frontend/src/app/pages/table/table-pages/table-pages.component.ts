import {Component} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {TableService} from "../../../services/table.service";
import {Router} from "@angular/router";
import {tsCastToAny} from "@angular/compiler-cli/src/ngtsc/typecheck/src/ts_util";

@Component({
  selector: 'app-table-vorname',
  templateUrl: './table-pages.component.html',
  styleUrls: ['./table-pages.component.scss']
})
export class TablePagesComponent {

  tableData: any[][] = [];
  filteredTableData: any[][] = [];
  tableId!: number;
  searchTerm: String = "";
  headers: string[] = [];
  editingCell: boolean[][] = [];

  constructor(private http: HttpClient, private router: Router) {
  }

  ngOnInit() {
    this.refreshTableData();
  }

  refreshTableData() {
    this.tableId = parseInt(localStorage.getItem("tableID") || "0");
    if (localStorage.getItem("identifier") === "csv") {
      this.http.get<any[][]>('http://localhost:8080/CSV/' + this.tableId).subscribe(data => {
        this.tableData = data;
        this.headers = this.tableData[0];
        this.filteredTableData = this.tableData.slice(1);
        this.initializeEditingCell();
      });
    } else if (localStorage.getItem("identifier") === "xml") {
      this.http.get<any[][]>('http://localhost:8080/XML/' + this.tableId).subscribe(data => {
        this.tableData = data;
        this.headers = this.tableData[0];
        this.filteredTableData = this.tableData.slice(1);
        this.initializeEditingCell();
      });
    } else {
      console.log("Tabelle nicht gefunden");
    }
  }

  closeTable() {
    localStorage.removeItem("tableID");
    localStorage.removeItem("identifier")
    this.router.navigate(['/table']);
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

  editCell(rowIndex: number, collIndex: number) {
    if(localStorage.getItem('admin')){
      if (!this.editingCell[rowIndex]) {
        this.editingCell[rowIndex] = [];
      }
    this.editingCell[rowIndex][collIndex] = true;
    }
  }
  initializeEditingCell() {
    this.editingCell = new Array(this.tableData.length).fill(null).map(() => new Array(this.headers.length).fill(false));
  }

  saveCell(rowIndex: number, colIndex: number, event: any) {
    const target = event.target as HTMLElement;
    this.filteredTableData[rowIndex][colIndex] = target.innerText;
    this.editingCell[rowIndex][colIndex] = false;
    this.saveChanges(this.tableData);
  }

  saveChanges(tableData: any[][]) {
    if (localStorage.getItem("identifier") === "csv") {
      this.http.put<String[][]>("http://localhost:8080/CSV/editContent/" + this.tableId, tableData).subscribe(response => {
        this.refreshTableData()
        console.log("OK")
      });
    } else if (localStorage.getItem("identifier") === "xml") {
      this.http.put<String[][]>("http://localhost:8080/XML/editContent/" + this.tableId, tableData).subscribe(response => {
        this.refreshTableData()
        console.log("OK")
      });
    }
  }

  cancelCell(rowIndex: number, colIndex: number) {
    this.editingCell[rowIndex][colIndex] = false;
  }
}
