import { Component, Inject, OnInit, Output } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { getCurrentUser } from '@app/auth/auth.selectors';
import { User } from '@app/auth/model/user';
import { AppState } from '@app/reducers';
import { PostService } from '@app/posts/post.service';
import { defaultDialogConfig } from '@app/shared/default-dialog-config';
import { select, Store } from '@ngrx/store';
import {
  catchError,
  combineLatest,
  concatMap,
  EMPTY,
  forkJoin,
  Observable,
  of,
} from 'rxjs';
import { Post } from '../model/post';
import { PostEditDialogComponent } from '../post-edit-dialog/post-edit-dialog.component';
import { selectPost } from '../posts.selectors';

import SwiperCore, {
  Navigation,
  Pagination,
  SwiperOptions,
  Scrollbar,
} from 'swiper';

// install Swiper components
SwiperCore.use([Navigation, Pagination, Scrollbar]);
@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.scss'],
})
export class PostDetailComponent implements OnInit {
  @Output()
  default: string =
    'https://firebasestorage.googleapis.com/v0/b/bulletin-board-d1815.appspot.com/o/uploads%2F1582746081704_ayo-ogunseinde-2.jpg?alt=media&token=cbc87b46-e85a-4de3-93c3-416dd289b2f1';
  post$?: Observable<Post>;
  postId?: string | undefined;

  user$?: Observable<User>;
  isLiked?: boolean;

  proportion: number = 25;
  slides: number = 5;
  postData?: Post;

  config: SwiperOptions = {
    slidesPerView: 1,
    spaceBetween: 50,
    navigation: true,
    pagination: { clickable: true },
    scrollbar: { draggable: true },
  };
  constructor(
    private postService: PostService,
    private route: ActivatedRoute,
    @Inject(MAT_DIALOG_DATA) data: any,
    private dialog: MatDialog,
    private store: Store<AppState>
  ) {
    this.postId = data.postId;
  }

  ngOnInit(): void {
    console.log('### POST DETAIL COMPONENT ###');
    this.reload();
  }

  onSlideChange() {
    console.log('slide change');
  }
  // INIT FUNCTION
  reload() {
    if (!this.postId) {
      this.postId = this.route.snapshot.paramMap.get('id') as string;
    }

    if (this.postId) {
      // Call Selector to get user and post even in refreshed page.
      this.post$ = this.store.pipe(select(selectPost(this.postId)));
      this.user$ = this.store.pipe(select(getCurrentUser)) as Observable<User>;
    }
  }

  // LIKE FUNCTIONS
  isPostLiked(post: Post, userId?: string) {
    return this.postService.isLikedByUser(post, userId);
  }

  getBackgroundImageUrl(image: string) {
    return `url(${image})`;
  }

  // ADD VIEW
  // addView() {
  //   // Check if this post has been viewed by user.
  //   return forkJoin
  //     .pipe(
  //       concatMap(([post, user]: [Post, User]) => {
  //         console.log('@!#%!@#%!@#%', post, user);
  //         if (!post.views?.some((view) => view.user === user._id)) {
  //           console.log('not viewed yet');
  //           return this.postService
  //             .addView(post._id as string)
  //             .pipe(catchError((err) => EMPTY));
  //         }
  //         return of(false);
  //       })
  //     )
  //     .subscribe({
  //       next: (val) => {
  //         console.log(val);
  //       },
  //       error: (err) => console.log(err),
  //     });
  // }
}
