import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PostsComponent } from './components/posts/posts.component';
import { PostsRoutingModule } from './posts-routing.module';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [PostsComponent],
  imports: [CommonModule, PostsRoutingModule, FormsModule, SharedModule],
  providers: [],
})
export class PostsModule {}
