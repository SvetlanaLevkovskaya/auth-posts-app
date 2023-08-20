import { Component, OnInit } from '@angular/core';
import { Post } from '../../interfaces/post.interfaces';
import { ActivatedRoute } from '@angular/router';
import { PostsService } from '../../services/posts.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css'],
})
export class PostComponent implements OnInit {
  post: Post | undefined;

  constructor(
    private route: ActivatedRoute,
    private postsService: PostsService,
    private spinner: NgxSpinnerService
  ) {}

  ngOnInit() {
    this.spinner.show().then(r => console.log('post-r', r));
    this.route.params.subscribe(params => {
      this.spinner.hide().then(r => console.log('post-hide-r', r));
      const postId = params['id'];
      this.postsService.fetchPostById(postId).subscribe({
        next: post => {
          console.log('Fetched post:', post);
          this.post = post;
        },
        error: error => {
          this.spinner.hide().then(r => r);
          console.error('Error fetching post:', error);
        },
      });
    });
  }
}
