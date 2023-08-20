import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PostsRoutingModule } from './posts-routing.module';
import { SharedModule } from '../shared/shared.module';
import { PostsTableComponent } from './components/posts-table/posts-table.component';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { PostComponent } from './components/post/post.component';
import { PostsService } from './services/posts.service';

@NgModule({
  declarations: [PostsTableComponent, PostComponent],
  imports: [
    CommonModule,
    PostsRoutingModule,
    FormsModule,
    SharedModule,
    MatInputModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
  ],
  providers: [PostsService],
})
export class PostsModule {}
