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
  discussionTable: any[][] = [];
  filteredDiscussionTable: any[][] = [];
  searchTerm: String = "";
  tableID!: number;
  email: string = "";
  user!: User;


  constructor(private httpClient: HttpClient, private tableService: TableService, private router: Router, private discussionService: DiscussionService) {
  }

  ngOnInit() {
    this.refreshDiscussionTable();
    this.user = JSON.parse(localStorage.getItem('user')!);
  }

  refreshDiscussionTable() {
    this.httpClient.get<any[][]>("http://localhost:8080/discussion/getDiscussions").subscribe(data => {
      this.discussionTable = data;
      this.filteredDiscussionTable = data;
      console.log(this.discussionTable);
    });
  }

  applyFilter() {
    if (this.searchTerm) {
      this.filteredDiscussionTable = this.discussionTable.filter(row =>
        row.some(cell => cell.toString().toLowerCase().includes(this.searchTerm.toLowerCase()))
      );
    } else {
      this.filteredDiscussionTable = this.discussionTable;
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
    if(localStorage.getItem('favorite_' + id) === 'true') {
      alert("You already favorited this post");
    } else {
      this.httpClient.put("http://localhost:8080/discussion/addFavourite/" + id, this.user).subscribe(response => {
        alert("Added to Favorite");
      }, error => {
        alert("Couldn't add to Favorite");
      });
      localStorage.setItem('favorite_' + id, 'true');
    }
  }

  addLike(row: any[]){
    const id = row[3];
    if(localStorage.getItem('likedPost_' + id) === 'true') {
      alert("You already liked this post");
    } else {
      this.httpClient.put("http://localhost:8080/discussion/addLike/" + id, {}).subscribe(response => {
        console.log("OK");
        this.refreshDiscussionTable();
      }, error => {
        console.log("Error");
        this.refreshDiscussionTable();
      });
      localStorage.setItem('likedPost_' + id, 'true');
    }
  }
}



