import { Component } from '@angular/core';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.scss']
})
export class CreatePostComponent {
  post: { title: string, content: string } = { title: '', content: '' };

  onSubmit() {
    // Perform actions when the form is submitted
    console.log('New post:', this.post);
    // You can implement logic here to save the post or perform other operations
    // For this example, we'll just clear the form fields
    this.post = { title: '', content: '' };
  }
}
