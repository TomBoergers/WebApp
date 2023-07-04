import {ChangeDetectorRef, Component} from '@angular/core';
import {DiscussionService} from "../../../services/discussion.service";
import {HttpClient} from "@angular/common/http";
import {User} from "../../../classes/user";

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss']
})
export class PostsComponent {
  post: { discussionId: number, title: string, content: string, category: string } = { discussionId: 0, title: '', content: '', category: '' };
  postLoaded!: boolean;

  newComment: string = '';
  comments: string[] = [];

  user!: User;


  constructor(private discussionService: DiscussionService, private httpClient: HttpClient, private changeDetectorRef: ChangeDetectorRef) {
  }

  ngOnInit() {
    this.loadPost(this.discussionService.postId);
    this.loadComments();
    this.user = JSON.parse(localStorage.getItem('user')!);
    console.log(this.post);
  }

  loadPost(id: number) {
    this.httpClient.get<{ discussionId: number, title: string, content: string, category: string }>("http://localhost:8080/discussion/getById/" + id).subscribe(response => {
      this.post = response;
      console.log(this.post);
    }, error => {
      console.log("Error");
    });
  }

  loadComments() {
    this.httpClient.get<any[]>("http://localhost:8080/discussion/getComments/" + this.discussionService.postId).subscribe(response => {
      this.comments = response;
    });
  }

  addComment() {
    console.log(this.newComment);
    if (this.newComment.trim() !== '') {
      this.httpClient.put("http://localhost:8080/discussion/addComment" + this.discussionService.postId, [this.newComment, this.user.vorname]);
      //this.comments.push(this.newComment); // Hinzufügen des Kommentars zur lokalen Liste
      this.newComment = ''; // Zurücksetzen des Eingabefelds
    }
  }
}

