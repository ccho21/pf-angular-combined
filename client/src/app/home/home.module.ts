import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { PostsResolver } from '@app/posts/posts.resolver';
import { RouterModule, Routes } from '@angular/router';
import { PostsModule } from '@app/posts/posts.module';
import { PostNewComponent } from '@app/posts/post-new/post-new.component';
import { PostDetailComponent } from '@app/posts/post-detail/post-detail.component';
export const homeRoutes: Routes = [
  {
    path: '',
    component: HomeComponent,
    resolve: {
      posts: PostsResolver,
    },
  },
  {
    path: 'create',
    component: PostNewComponent,
  },
  {
    path: ':id',
    component: PostDetailComponent,
    resolve: {
      posts: PostsResolver,
    },
  },
];

@NgModule({
  declarations: [HomeComponent],
  imports: [CommonModule, 
    RouterModule.forChild(homeRoutes), 
    PostsModule],
})
export class HomeModule {}
