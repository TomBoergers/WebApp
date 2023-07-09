import {Component} from '@angular/core';
import {DiscussionService} from "../../../services/discussion.service";
import {HttpClient} from "@angular/common/http";
import {User} from "../../../classes/user";
import {Router} from "@angular/router";

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss']
})
export class PostsComponent {
  post: { discussionId: number, title: string, content: string, category: string } = { discussionId: 0, title: '', content: '', category: '' };
  postId: number = 0;

  newComment: string = '';
  comments: { comment: string, name: string, commentId: number }[] = [];
  commentId!: number;

  user!: User;
  commentUser: { comment: string, name: string } = { comment: '', name: ''};


  constructor(private discussionService: DiscussionService, private httpClient: HttpClient, private router: Router) {
  }

  ngOnInit() {
    this.postId = JSON.parse(localStorage.getItem('postId') || '0');
    this.loadPost(this.postId);
    this.loadComments();
    this.user = JSON.parse(localStorage.getItem('user')!);
    console.log(this.post);
  }

  loadPost(id: number) {
    this.httpClient.get<any>("http://localhost:8080/discussion/getById/" + id).subscribe(response => {
      this.post = response;
      console.log(this.post);
    }, error => {
      console.log("Error");
    });
  }

  loadComments() {
    this.postId = JSON.parse(localStorage.getItem('postId') || '0');
    this.httpClient.get<any[]>("http://localhost:8080/discussion/getComments/" + this.postId).subscribe(response => {
      this.comments = response.map(comment => ({
        comment: comment[0],
        name: comment[1],
        commentId: comment[2]
      }));
      console.log(this.comments);
    });
  }

  addComment() {
    this.postId = JSON.parse(localStorage.getItem('postId') || '0');
    this.commentUser.comment = this.newComment;
    this.commentUser.name = this.user.vorname;
    if (this.newComment.trim() !== '') {
      this.httpClient.put("http://localhost:8080/discussion/addComment/" + this.postId, this.commentUser).subscribe(response => {
        console.log("OK");
        this.loadComments(); // Laden Sie die aktualisierte Liste der Kommentare
      }, error => {
        console.log("Error");
      });

      this.newComment = ''; // Zurücksetzen des Eingabefelds
      this.commentUser = { comment: '', name: ''};
    }
  }

  deletePost() {
    if(!localStorage.getItem('admin')) {
      alert("Keine Berechtigung");
    } else {
      this.httpClient.delete("http://localhost:8080/discussion/deletePost/" + this.postId).subscribe(response => {
        console.log("Post deleted successfully");
        this.router.navigate(['/discussion']);
        // Führen Sie die gewünschten Aktionen nach dem Löschen des Posts aus
      }, error => {
        this.router.navigate(['/discussion']);
        console.log("Failed to delete post");
      });
    }
  }

  deleteComment(id: number) {
    if (!localStorage.getItem('admin')) {
      alert("Keine Bereichtigung");
    } else {
      console.log(id);
      this.commentId = id;
      console.log(this.commentId);
      this.httpClient.delete("http://localhost:8080/discussion/deleteComment/" + this.commentId).subscribe(response => {
        console.log("Comment deleted successfully");
        this.loadComments();
        // Führen Sie die gewünschten Aktionen nach dem Löschen des Kommentars aus
      }, error => {
        console.log("Failed to delete comment");
        this.loadComments();
      });
    }
  }
}

