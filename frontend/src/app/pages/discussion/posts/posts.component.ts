import { Component } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss']
})
export class PostsComponent {

  post: Object = { title: '', content: '', category: '', id: 0 };

  constructor(private httpClient: HttpClient) {
  }

  loadPost(id: number) {
    this.httpClient.get("http://localhost:8080/discussion/getById/" + id).subscribe(response => {
      this.post = response;
    }, error => {
      console.log("Error")
    });
  }
}
