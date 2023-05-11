import {Component, OnInit} from '@angular/core';
import {TableService} from "../../services/table.service";
import {Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {NgForm} from "@angular/forms";

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {
  tableData: any[][] = [];
  filteredTableData: any[][] = [];
  searchTerm: String = "";
  tableID!: number;
  favorites: any[] = [];

  constructor(private http: HttpClient, private tableService: TableService, private router: Router) {
  }

  ngOnInit() {
    this.refreshTableData();
  }

  openTable(tableId: number, tableIdentifier: string) {
    this.tableService.loadTableId = tableId;
    this.tableID = tableId;
    localStorage.setItem("tableID", tableId.toString());
    localStorage.setItem("identifier", tableIdentifier);
    this.router.navigate(['/table', tableId]);
  }

  applyFilter() {
    if(this.searchTerm) {
      this.filteredTableData = this.tableData.filter(row =>
        row.some(cell => cell.toString().toLowerCase().includes(this.searchTerm.toLowerCase()))
      );
    } else {
      this.filteredTableData = this.tableData;
    }
  }

  editRow(row: any[]) {
    if(!localStorage.getItem('admin')){
      alert("Keine Berechtigung")
    }
    else{
      row[4] = true;
      this.tableID = row[2];
      localStorage.setItem("identifier", row[3]);
    }

  }

  submitEditRow(form: NgForm, tableId: number) {
    const newName = form.value.newName;
    const newYear = form.value.newYear;

    if(localStorage.getItem("identifier") === "csv") {
      this.http.post<any[][]>("http://localhost:8080/CSV/editTable/" + tableId, {
        newName: newName,
        newYear: newYear
      }).subscribe(response => {
        const updatedRowIndex = this.tableData.findIndex(row => row[2] === tableId);
        this.tableData[updatedRowIndex][0] = newName;
        this.tableData[updatedRowIndex][1] = newYear;

        this.refreshTableData();
      });
    } else if(localStorage.getItem("identifier") === "xml") {
      this.http.post<any[][]>("http://localhost:8080/XML/editTable/" + tableId, {
        newName: newName,
        newYear: newYear
      }).subscribe(response => {
        const updatedRowIndex = this.tableData.findIndex(row => row[2] === tableId);
        this.tableData[updatedRowIndex][0] = newName;
        this.tableData[updatedRowIndex][1] = newYear;

        this.refreshTableData();
      });
    }
    localStorage.removeItem("identifier");
  }

  private refreshTableData() {
    this.http.get<any[][]>("http://localhost:8080/CSV/allNamesAndYears").subscribe(data => {
      this.tableData = data;
      this.filteredTableData = data;

      this.http.get<any[][]>("http://localhost:8080/XML/allNamesAndYears").subscribe(data => {
        this.tableData = this.filteredTableData.concat(data);
        this.filteredTableData = this.tableData;
      });
    });
  }

  addToFavorites(tableId: number, identifier: string) {
    if (!localStorage.getItem('favoriteTable')) {
      localStorage.setItem('favoriteTable', tableId.toString());
      localStorage.setItem("favoriteTableIdentifier", identifier);
      this.favorites = [tableId];
    } else {
      let favoriteTable = JSON.parse(localStorage.getItem('favoriteTable')!) as number[];
      if (favoriteTable.length === 1) {
        alert('Es kann nur ein Favorit gespeichert werden.');
      } else {
        localStorage.setItem('favoriteTable', JSON.stringify(favoriteTable));
        localStorage.setItem("favoriteTableIdentifier", identifier);
        this.favorites = favoriteTable;
      }
    }
  }

  removeFavorites() {
    localStorage.removeItem('favoriteTable');
    localStorage.removeItem('favoriteTableIdentifier')
  }
}
