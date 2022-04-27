import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AppState } from '@app/reducers';
import { PostService } from '@app/posts/post.service';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { Post } from '../../posts/model/post';

@Component({
  selector: 'app-likes',
  templateUrl: './likes.component.html',
  styleUrls: ['./likes.component.scss'],
})
export class LikesComponent implements OnInit {
  @Input() postId?: string;
  @Input() userId?: string;
  @Input() commentId?: string;
  @Input() isLiked?: boolean;
  @Output() commentEmit: EventEmitter<any> = new EventEmitter();

  @Input() likeStyle?: any;
  likeSub$?: Subscription;
  constructor(
    private store: Store<AppState>,
    private postService: PostService
  ) {}

  ngOnInit(): void {}

  clickLike(e: Event) {
    e.preventDefault();
    console.log('Post Id', this.postId);
    console.log('COMMENT?', this.commentId);
    this.postService
      .clickLike(this.postId as string, this.commentId)
      .subscribe({
        next: () => {
          console.log('success');
        },
        error: (err) => {
          console.log(err.error);
        },
      });
  }
  removeLike(e: Event) {
    e.preventDefault();
    this.postService
      .removeLike(this.postId as string, this.commentId)
      .subscribe({
        next: () => {
          console.log('success');
        },
        error: (err) => {
          console.log(err.error);
        },
      });
  }
}
