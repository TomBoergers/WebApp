import { Component } from '@angular/core';
import {User} from "../../classes/user";
import {HttpClient} from "@angular/common/http";
import {TableService} from "../../services/table.service";
import {Router} from "@angular/router";
import {friendListService} from "../../services/friendlist.service";
import {PostsComponent} from "./posts/posts.component";

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


  constructor(private http: HttpClient, private tableService: TableService, private router: Router, private postsComponent: PostsComponent) {
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
    this.http.get<any[][]>("http://localhost:8080/discussion/getDiscussions").subscribe(data => {
      this.tableData = data;
      this.filteredTableData = data;
      console.log(this.tableData);
    });
  }

  createPost(){
    this.router.navigate(['/createPost'])
  }

  openPost(id: number){
    this.router.navigate(['/posts'])
    this.postsComponent.loadPost(id);
  }


}



