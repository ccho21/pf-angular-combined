import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Post } from '@app/posts/model/post';
import { defaultDialogConfig } from '@app/shared/default-dialog-config';
import { PostDetailComponent } from '../post-detail/post-detail.component';
import { PostService } from '../post.service';

import SwiperCore, {
  Navigation,
  Pagination,
  SwiperOptions,
  Scrollbar,
} from 'swiper';
import { Observable } from 'rxjs';
import { User } from '@app/auth/model/user';
import { select, Store } from '@ngrx/store';
import { getCurrentUser } from '@app/auth/auth.selectors';
import { PostEditDialogComponent } from '../post-edit-dialog/post-edit-dialog.component';

// install Swiper components
SwiperCore.use([Navigation, Pagination, Scrollbar]);

@Component({
  selector: 'app-post-list-full',
  templateUrl: './post-list-full.component.html',
  styleUrls: ['./post-list-full.component.scss'],
})
export class PostListFullComponent implements OnInit {
  @Input() posts!: Array<Post> | null;
  user$?: Observable<User>;

  default: string =
    'https://firebasestorage.googleapis.com/v0/b/bulletin-board-d1815.appspot.com/o/uploads%2F1582746081704_ayo-ogunseinde-2.jpg?alt=media&token=cbc87b46-e85a-4de3-93c3-416dd289b2f1';

  constructor(
    private postService: PostService,
    private dialog: MatDialog,
    private store: Store
  ) {}

  ngOnInit(): void {
    console.log('### POST FULL COMPONENTS ###');
    this.user$ = this.store.pipe(select(getCurrentUser)) as Observable<User>;
  }

  onSlideChange() {
    console.log('slide change');
  }

  getBackgroundImageUrl(image: string) {
    return `url(${image})`;
  }

  openDialog(post: Post, e: Event) {
    e.preventDefault();

    const dialogRef = this.postService.openDialog(
      PostDetailComponent,
      post._id as string
    );
    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }

  // LIKE FUNCTIONS
  isPostLiked(post: Post, userId?: string) {
    return this.postService.isLikedByUser(post, userId);
  }
}
