import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class DiscussionService {

  post: { title: string, content: string, category: string, id: number } = { title: '', content: '', category: '', id: 0 };

  constructor(private httpClient: HttpClient) {
  }

  loadPost(id: number) {
    this.httpClient.get<{ title: string; content: string; category: string; id: number }>("http://localhost:8080/discussion/getById/" + id).subscribe(response => {
      this.post = response;
    }, error => {
      console.log("Error");
    });
  }
}
