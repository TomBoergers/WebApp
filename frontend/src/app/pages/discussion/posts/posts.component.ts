import { Component } from '@angular/core';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss']
})
export class PostsComponent {

  posts: { title: string, content: string }[] = [
    { title: 'von: Phong, date: 23.06.2023  ', content: 'Ja hab gehört Aachen soll mies langweilig sein, aber immerhin schön.' },

  ];


}
