import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { PostActions } from './action-types';
import { concatMap, map } from 'rxjs/operators';
import { allPostsLoaded } from './post.actions';
import { PostService } from '@app/posts/post.service';

@Injectable()
export class PostsEffects {
  loadPosts$ = createEffect(() => {
    console.log('[Post Effects]: load posts');
    return this.actions$.pipe(
      ofType(PostActions.loadAllPosts),
      concatMap((action) => this.postService.loadPosts()),
      map((posts) => allPostsLoaded({ posts }))
    );
  });

  updatePost$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(PostActions.postUpdated),
        concatMap((action) =>
          this.postService.updatePost(
            action.update.id as string,
            action.update.changes
          )
        )
      ),
    { dispatch: false }
  );

  // savePost$ = createEffect(
  //   () =>
  //     this.actions$.pipe(
  //       ofType(PostActions.postCreated),
  //       concatMap((action) =>
  //         this.postService.savePost(action.post._id as string, action.post)
  //       )
  //     ),
  //   { dispatch: false }
  // );
  
  // updateComment$ = createEffect(
  //   () =>
  //     this.actions$.pipe(
  //       ofType(PostActions.commentUpdated),
  //       concatMap((action) => {
  //         console.log('### action', action);
  //         return this.postService.updateComment(
  //           action.update.id as string,
  //           action.update.changes
  //         );
  //       })
  //     ),
  //   { dispatch: false }
  // );
  constructor(private actions$: Actions, private postService: PostService) {}
}
