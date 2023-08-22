import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Post } from '../interfaces/post.interfaces';

@Injectable({
  providedIn: 'root',
})
export class PostsService {
  private readonly apiUrl = 'https://jsonplaceholder.typicode.com/posts';

  constructor(private http: HttpClient) {}

  fetchPosts(): Observable<Post[]> {
    return this.http.get<Post[]>(this.apiUrl);
  }

  fetchPostById(id: number): Observable<Post> {
    const postUrl = `${this.apiUrl}/${id}`;
    return this.http.get<Post>(postUrl);
  }
}
