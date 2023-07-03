import { Component } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {DiscussionService} from "../../../services/discussion.service";

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.scss']
})
export class CreatePostComponent {

  post: { title: string, content: string, category: string } = { title: '', content: '', category: '' };

  constructor(private httpClient: HttpClient, private router: Router, private discussionService: DiscussionService) {
  }

  onSubmit() {
    // Perform actions when the form is submitted
    console.log('New post:', this.post);

    this.httpClient.post("http://localhost:8080/discussion/add", this.post).subscribe(response => {
      this.post = { title: '', content: '', category: '' };
      console.log("OK");
    }, error => {
      console.log("Error", error);
    });

    this.router.navigate(['/discussion']);
  }
}
