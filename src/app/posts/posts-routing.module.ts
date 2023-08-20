import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { authGuard } from '../auth/guards/auth.guard';
import { PostsTableComponent } from './components/posts-table/posts-table.component';
import { PostComponent } from './components/post/post.component';
import { postResolver } from './resolvers/post.resolver';

const routes: Routes = [
  { path: '', component: PostsTableComponent, canActivate: [authGuard] },
  {
    path: ':id',
    component: PostComponent,
    resolve: { article: postResolver },
    canActivate: [authGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PostsRoutingModule {}
