import { ResolveFn, Router } from '@angular/router';
import { Post } from '../interfaces/post.interfaces';
import { inject } from '@angular/core';
import { PostsService } from '../services/posts.service';
import { catchError, from, lastValueFrom, of, switchMap } from 'rxjs';

export const postResolver: ResolveFn<Post | undefined> = route => {
  const postsService = inject(PostsService);
  const router = inject(Router);

  const postId = Number(route.paramMap.get('id'));
  const postPromise = postsService.fetchPostById(postId);

  return from(lastValueFrom(postPromise)).pipe(
    switchMap(post => {
      if (post) {
        return of(post);
      } else {
        router.navigate(['/not-found']).then(r => r);
        return of(undefined);
      }
    }),
    catchError(() => {
      router.navigate(['/not-found']).then(r => r);
      return of(undefined);
    })
  );
};
