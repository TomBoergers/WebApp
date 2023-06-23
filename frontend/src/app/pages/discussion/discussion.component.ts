import { Component } from '@angular/core';
import {User} from "../../classes/user";
import {HttpClient} from "@angular/common/http";
import {TableService} from "../../services/table.service";
import {Router} from "@angular/router";
import {friendListService} from "../../services/friendlist.service";

@Component({
  selector: 'app-discussion',
  templateUrl: './discussion.component.html',
  styleUrls: ['./discussion.component.scss']
})
export class DiscussionComponent {
  tableData: any[][] = [];
  filteredTableData: any[][] = [];
  searchTerm: String = "";
  tableID!: number;
  favorites: any[] = [];
  userID!: number;
  email: string = "";
  privacy!: boolean;
  user!: User;


  constructor(private http: HttpClient, private tableService: TableService, private router: Router, private friendlistService: friendListService) {
  }

  ngOnInit() {
    this.refreshTableData();
  }

  applyFilter() {
    if (this.searchTerm) {
      this.filteredTableData = this.tableData.filter(row =>
        row.some(cell => cell.toString().toLowerCase().includes(this.searchTerm.toLowerCase()))
      );
    } else {
      this.filteredTableData = this.tableData;
    }
  }

  private refreshTableData() {
    if (localStorage.getItem('user')) {
      let userStore = localStorage.getItem('user');
      let userData = userStore && JSON.parse(userStore);
      this.userID = userData.id;
      this.http.get<any[][]>("http://localhost:8080/nutzer/all").subscribe(data => {
        console.log(data);
        this.tableData = data;
        this.filteredTableData = data;
      });
    }
  }

  createPost(){
    this.router.navigate(['/createPost'])
  }

  openPost(){
    this.router.navigate(['/posts'])
  }


}



