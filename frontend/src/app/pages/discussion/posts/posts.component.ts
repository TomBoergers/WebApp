import { Component } from '@angular/core';
import {DiscussionService} from "../../../services/discussion.service";

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss']
})
export class PostsComponent {

  post: { title: string, content: string, category: string, id: number } = { title: '', content: '', category: '', id: 0 };

  constructor(private discussionService: DiscussionService) {
  }

  ngOnInit() {
    this.post = this.discussionService.post;
  }
}
