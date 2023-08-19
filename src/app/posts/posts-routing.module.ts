import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PostsComponent } from './components/posts/posts.component';
import { authGuard } from '../auth/guards/auth.guard';

const routes: Routes = [
  { path: '', component: PostsComponent, canActivate: [authGuard] },
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
