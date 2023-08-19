import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PeriodicElement } from '../components/posts-table/posts-table.component';

@Injectable({
  providedIn: 'root',
})
export class PostsService {
  constructor(private http: HttpClient) {}

  fetchPosts(): Observable<PeriodicElement[]> {
    return this.http.get<PeriodicElement[]>(
      'https://jsonplaceholder.typicode.com/posts'
    );
  }
}
