import { Component } from '@angular/core';
import {User} from "../../classes/user";
import {HttpClient} from "@angular/common/http";
import {TableService} from "../../services/table.service";
import {Router} from "@angular/router";
import {DiscussionService} from "../../services/discussion.service";

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
  email: string = "";
  user!: User;


  constructor(private httpClient: HttpClient, private tableService: TableService, private router: Router, private discussionService: DiscussionService) {
  }

  ngOnInit() {
    this.refreshTableData();
    this.user = JSON.parse(localStorage.getItem('user')!);
  }

  refreshTableData() {
    this.httpClient.get<any[][]>("http://localhost:8080/discussion/getDiscussions").subscribe(data => {
      this.tableData = data;
      this.filteredTableData = data;
      console.log(this.tableData);
    });
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

  createPost(){
    this.router.navigate(['/createPost'])
  }

  openPost(id: number){
    localStorage.setItem('postId', JSON.stringify(id));
    this.discussionService.loadPost(id);
    this.router.navigate(['/posts'])
  }

  addFavorite(id: number) {
    this.httpClient.put("http://localhost:8080/discussion/addFavourite/" + id, this.user).subscribe();
  }
}



