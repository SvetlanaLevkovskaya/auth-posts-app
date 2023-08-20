import { Component, OnInit } from '@angular/core';
import { Post } from '../../interfaces/post.interfaces';
import { ActivatedRoute } from '@angular/router';
import { PostsService } from '../../services/posts.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css'],
})
export class PostComponent implements OnInit {
  post: Post | undefined;

  constructor(
    private route: ActivatedRoute,
    private postsService: PostsService
  ) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      const postId = params['id'];
      this.postsService.fetchPostById(postId).subscribe({
        next: post => {
          console.log('Fetched post:', post);
          this.post = post;
        },
        error: error => {
          console.error('Error fetching post:', error);
        },
      });
    });
  }
}
