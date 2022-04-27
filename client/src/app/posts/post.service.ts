import { Injectable } from '@angular/core';
import { from, Observable, of, Subject } from 'rxjs';
import { Post } from '@posts/model/post';
import { Comment } from '@posts/model/comment';
import { concatMap, map, tap } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import {
  commentUpdated,
  likeUpdated,
  postCreated,
  postDeleted,
} from '@app/posts/post.actions';
import { Update } from '@ngrx/entity';
import { Like } from '@app/posts/model/like';
import { View } from '@app/posts/model/view';
import { largeDialogConfig } from '@app/shared/default-dialog-config';
import { MatDialog } from '@angular/material/dialog';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  private replySubject$ = new Subject<Comment>();
  private replySubscription$ = this.replySubject$.asObservable();

  constructor(
    private store: Store,
    private http: HttpClient,
    private router: Router,
    private dialog: MatDialog
  ) {}
  loadPosts(): Observable<Post[]> {
    return this.http.get('http://localhost:5000/api/posts').pipe(
      map((res) => {
        console.log(res);
        return res as Post[];
      })
    );
  }

  findPostById(postId: string | null): Observable<Post> {
    return this.http.get(`http://localhost:5000/api/posts/${postId}`).pipe(
      map((res) => {
        return res as Post;
      })
    );
  }

  savePost(postId: string, post: Partial<Post>): Observable<Post> {
    postId = postId ? postId : '';
    return this.http
      .post<Post>(`http://localhost:5000/api/posts/${postId}`, post)
      .pipe(
        tap((post: Post) => {
          this.store.dispatch(postCreated({ post }));
          this.router.navigateByUrl('/posts');
        })
      );
  }

  updatePost(postId: string, changes: Partial<Post>): Observable<Post> {
    console.log('POST Id ', postId, '### CHANGES ', changes);
    postId = postId ? postId : '';
    return this.http
      .put<Post>(`http://localhost:5000/api/posts/${postId}`, changes)
      .pipe(
        tap((post: Post) => {
          console.log('[UPDATE POST EFFECT] has been done successfuly', post);
        })
      );
  }

  deletePost(postId: string) {
    return this.http
      .delete<Post>(`http://localhost:5000/api/posts/${postId}`)
      .pipe(
        tap((post: Post) => {
          console.log('[DELETE POST] has been done successfuly', post);
          this.store.dispatch(postDeleted({ id: postId }));
        })
      );
  }

  addComment(comment: Comment, postId: string): Observable<Post> {
    return this.http
      .post<Comment[]>(
        `http://localhost:5000/api/comments/p/${postId}`,
        comment
      )
      .pipe(
        tap((res: any) => {
          console.log('### COMMENT OUTCOME', res);
          const post = {
            comments: res,
          };
          const update: Update<Post> = {
            id: postId,
            changes: post,
          };
          this.store.dispatch(commentUpdated({ update }));
        })
      );
  }

  addSubComment(
    comment: Comment,
    postId: string,
    commentId: string
  ): Observable<Post> {
    commentId = commentId ? commentId : '';
    return this.http
      .post<Comment[]>(
        `http://localhost:5000/api/comments/p/${postId}/r/${commentId}`,
        comment
      )
      .pipe(
        tap((res: any) => {
          console.log('### COMMENT OUTCOME', res);
          const post = {
            comments: res,
          };
          const update: Update<Post> = {
            id: postId,
            changes: post,
          };
          this.store.dispatch(commentUpdated({ update }));
        })
      );
  }

  // LIKE FUNCTIONS
  clickLike(
    postId: string,
    commentId: string | undefined
  ): Observable<Like[] | Comment[]> {
    commentId = commentId ? `c/${commentId}` : '';
    return this.http
      .post<Like[] | Comment[]>(
        `http://localhost:5000/api/likes/p/${postId}/${commentId}`,
        {}
      )
      .pipe(
        tap((res: Like[] | Comment[]) => {
          if (commentId) {
            this.updateCommentToStore(postId, res as Comment[]);
          } else {
            this.updateLikeToStore(postId, res as Like[]);
          }
        })
      );
  }

  removeLike(
    postId: string,
    commentId: string | undefined
  ): Observable<Like[] | Comment[]> {
    commentId = commentId ? `c/${commentId}` : '';
    return this.http
      .delete<Like[] | Comment[]>(
        `http://localhost:5000/api/likes/p/${postId}/${commentId}`,
        {}
      )
      .pipe(
        tap((res: Like[] | Comment[]) => {
          if (commentId) {
            this.updateCommentToStore(postId, res as Comment[]);
          } else {
            this.updateLikeToStore(postId, res as Like[]);
          }
        })
      );
  }

  private updateLikeToStore(postId: string, res: Like[]) {
    const post = {
      likes: res,
    };
    const update: Update<Post> = {
      id: postId,
      changes: post,
    };
    console.log('update!', update);
    this.store.dispatch(likeUpdated({ update }));
  }

  private updateCommentToStore(postId: string, res: Comment[]) {
    const post = {
      comments: res,
    };
    const update: Update<Post> = {
      id: postId,
      changes: post,
    };
    this.store.dispatch(commentUpdated({ update }));
  }

  isLikedByUser(obj: Post | Comment, userId?: string) {
    return obj.likes?.some((like) => like.user === userId);
  }

  //  Views service
  addView(postId: string): Observable<View[]> {
    console.log('add view working?', postId);
    return this.http
      .put<View[]>(`http://localhost:5000/api/views/${postId}`, {})
      .pipe(
        map((res: View[]) => {
          console.log('RES!!! in VIEW', res);
          return res;
        })
      );
  }

  //Subject to populate the data on comment create comment
  updateReplyDTO(comment: Comment) {
    this.replySubject$.next(comment);
  }

  getReplyDTO() {
    return this.replySubscription$;
  }

  // OPEN DIALOG FOR POST DETAIL
  openDialog(component: any, postId: string) {
    const dialogConfig = largeDialogConfig();

    dialogConfig.data = {
      dialogTitle: 'POST DETAIL',
      postId,
    };
    dialogConfig.panelClass = 'no-padding-post';
    return this.dialog.open(component, dialogConfig);
  }
}
