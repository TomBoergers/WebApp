import {Component} from '@angular/core';
import {TableService} from "../../services/table.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent {

  constructor(private tableService: TableService, private router: Router) {
  }

  openTable(tableId: number) {
    this.tableService.loadTableId = tableId;
    this.router.navigate(['/table', tableId]);
  }
}
