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

  openTable(tableId: number) {
    this.tableService.loadTableId = tableId;
    this.tableID = tableId;
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
    row[3] = true;
    this.tableID = row[2];
  }

  submitEditRow(form: NgForm, tableId: number) {
    const newName = form.value.newName;
    const newYear = form.value.newYear;

    this.http.post<any[][]>("http://localhost:8080/CSV/editTable/" + tableId, { newName: newName, newYear: newYear }).subscribe(response => {
      const updatedRowIndex = this.tableData.findIndex(row => row[2] === tableId);
      this.tableData[updatedRowIndex][0] = newName;
      this.tableData[updatedRowIndex][1] = newYear;

      this.refreshTableData();
    });
  }

  private refreshTableData() {
    this.http.get<any[][]>("http://localhost:8080/CSV/allNamesAndYears").subscribe(data => {
      this.tableData = data;
      this.filteredTableData = data;
    })
  }

  addToFavorites(tableId: number) {
    if (!localStorage.getItem('favoriteTable')) {
      localStorage.setItem('favoriteTable', tableId.toString());
      this.favorites = [tableId];
    } else {
      const favorites = JSON.parse(localStorage.getItem('favoriteTable')!);
      if (favorites.length === 1) {
        alert('Es kann nur ein Favorit gespeichert werden.');
      } else {
        favorites.push(tableId);
        localStorage.setItem('favoriteTable', tableId.toString());
        this.favorites = favorites;
      }
    }
  }

  removeFavorites() {
    localStorage.removeItem('favoriteTable');
  }
}
