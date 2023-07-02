import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {User} from "../classes/user";

@Injectable({
  providedIn: 'root'
})
export class DiscussionService {
  postId!: number;

  constructor(private httpClient: HttpClient) {
  }

  loadPost(id: number) {
    this.postId = id;
  }
}
