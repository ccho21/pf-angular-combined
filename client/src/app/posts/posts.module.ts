import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { postsReducer } from './reducers/post.reducers';
import { PostsResolver } from './posts.resolver';
import { PostsEffects } from './posts.effects';

import { PipesModule } from '../shared/pipes/pipes.module';
import { SharedModule } from '@app/shared/shared.module';
import { ComponentsModule } from '@app/components/components.module';


import { PostDetailComponent } from './post-detail/post-detail.component';
import { PostListComponent } from './post-list/post-list.component';
import { PostEditDialogComponent } from './post-edit-dialog/post-edit-dialog.component';
import { PostNewComponent } from './post-new/post-new.component';

import { CommentComponent } from './comment/comment.component';
import { CommentsComponent } from './comments/comments.component';
import { CommentCreateComponent } from './comment-create/comment-create.component';
import { LikesComponent } from './likes/likes.component';
import { PostListFullComponent } from './post-list-full/post-list-full.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    EffectsModule.forFeature([PostsEffects]),
    StoreModule.forFeature('posts', postsReducer),
    PipesModule,
    ComponentsModule,
    SharedModule,
  ],
  declarations: [
    PostDetailComponent,
    PostNewComponent,
    PostEditDialogComponent,
    PostDetailComponent,
    CommentComponent,
    CommentsComponent,
    CommentCreateComponent,
    LikesComponent,
    PostListComponent,
    PostListFullComponent,
  ],
  exports: [
    PostListComponent,
    PostDetailComponent,
    PostListFullComponent,
    RouterModule,
  ],
  entryComponents: [],
  providers: [PostsResolver],
})
export class PostsModule {
  constructor() {}
}
