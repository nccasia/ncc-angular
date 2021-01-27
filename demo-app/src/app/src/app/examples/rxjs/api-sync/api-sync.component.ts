import { Comment, Post, RxjsService } from './../rxjs.service';
import { Component, OnInit } from '@angular/core';
import { concatMap } from 'rxjs/operators';

@Component({
  selector: 'app-api-sync',
  templateUrl: './api-sync.component.html',
  styleUrls: ['./api-sync.component.css']
})
export class ApiSyncComponent implements OnInit {

  posts: Post[] = [];
  comments: Comment[] = [];


  constructor(
    private rxjsService: RxjsService
  ) { }

  ngOnInit() {
    this.rxjsService.getPosts()
    .pipe(
      concatMap(posts => {
        this.posts = posts.slice(0, 5);
        return this.rxjsService.getCommentByPostId(this.posts[0].id);
      })
    )
    .subscribe(comments => {
      this.comments = comments;
    })
  }

}
