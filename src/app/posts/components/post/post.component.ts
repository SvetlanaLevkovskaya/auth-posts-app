import { Component, OnInit } from '@angular/core';
import { Post } from '../../interfaces/post.interfaces';
import { ActivatedRoute } from '@angular/router';
import { PostsService } from '../../services/posts.service';
import { Observable, switchMap } from 'rxjs';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css'],
})
export class PostComponent implements OnInit {
  post$!: Observable<Post | undefined>;

  constructor(
    private route: ActivatedRoute,
    private postsService: PostsService
  ) {}

  ngOnInit() {
    this.post$ = this.route.params.pipe(
      switchMap(params => this.postsService.fetchPostById(params['id']))
    );
  }
}
