import { ResolveFn, Router } from '@angular/router';
import { Post } from '../interfaces/post.interfaces';
import { inject } from '@angular/core';
import { PostsService } from '../services/posts.service';
import { Observable } from 'rxjs';

export const postResolver: ResolveFn<
  Promise<Observable<Post> | undefined>
> = async route => {
  const postsService = inject(PostsService);
  const router = inject(Router);

  const postId = Number(route.paramMap.get('id'));
  try {
    const post = await postsService.fetchPostById(postId);
    if (post) {
      return post;
    } else {
      await router.navigate(['/not-found']);
      return undefined;
    }
  } catch (error) {
    await router.navigate(['/not-found']);
    return undefined;
  }
};
