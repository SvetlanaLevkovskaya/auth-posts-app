import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { authGuard } from '../auth/guards/auth.guard';
import { PostsTableComponent } from './components/posts-table/posts-table.component';

const routes: Routes = [
  { path: '', component: PostsTableComponent, canActivate: [authGuard] },
  /*  {
    path: 'posts/:id',
    //component: ArticleComponent,
    //resolve: { article: articleResolver },
    //canActivate: [authGuard],
  },*/
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PostsRoutingModule {}
