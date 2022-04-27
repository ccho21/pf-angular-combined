import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Update } from '@ngrx/entity';
import { Post } from '../../posts/model/post';
import { Comment } from '../../posts/model/comment';
import { commentUpdated } from '../../posts/post.actions';
import { AppState } from '@app/reducers';
import { Store } from '@ngrx/store';
import { PostService } from '@app/posts/post.service';
import { Subscription } from 'rxjs';
import { ThisReceiver } from '@angular/compiler';
import { User } from '@app/auth/model/user';

@Component({
  selector: 'app-comment-create',
  templateUrl: './comment-create.component.html',
  styleUrls: ['./comment-create.component.scss'],
})
export class CommentCreateComponent implements OnInit {
  form!: FormGroup;
  @Input() post!: Post;
  @Input() user!: User;
  @Output() commentEmit: EventEmitter<any> = new EventEmitter();

  replySubscription$?: Subscription;
  nameTag?: string;
  pComment?: Comment; // comment object from parent array of comment
  constructor(
    private store: Store<AppState>,
    private postService: PostService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      content: ['', [Validators.required]],
      replyTo: [''],
    });

    this.replySubscription$ = this.postService
      .getReplyDTO()
      .subscribe((res: Comment) => {
        // get Parent comment in comment component through subject event
        console.log('COMMENT', res);
        this.nameTag = `@${res.author?.username} `;
        this.pComment = res;
        // store the nametag to the textarea
        this.form.patchValue({ replyTo: this.nameTag });
      });
  }

  onSubmit() {
    if (!this.form.valid) {
      return;
    }
    const postId = this.post._id as string;
    const regex = new RegExp(this.nameTag as string, 'g');
    const comment: Comment = {
      parentId: postId,
      author: this.user,
      content: this.form.get('content')?.value.replace(regex, '').trim(),
    };
    const pCommentId =
      this.pComment?.parentId !== postId
        ? this.pComment?.parentId
        : (this.pComment?._id as string);

    if (pCommentId && this.nameTag) {
      comment.replyTo = this.nameTag.trim();
      comment.parentId = pCommentId;
      this.updateSubComment(comment, postId, pCommentId);
    } else {
      this.updateComment(comment, postId);
    }
  }

  updateComment(comment: Comment, postId: string) {
    this.postService.addComment(comment, postId).subscribe({
      next: () => {
        console.log('Comment updated');
      },
      error: (err) => {
        console.log('Error occurred', err);
      },
    });
  }

  updateSubComment(comment: Comment, postId: string, commentId: string) {
    this.postService.addSubComment(comment, postId, commentId).subscribe({
      next: () => {
        console.log('Sub Comment updated');
        this.form.reset();
        this.nameTag = '';
      },
      error: (err) => {
        console.log('Error occurred', err);
      },
    });
  }

  ngOnDestroy() {
    if (this.replySubscription$) {
      this.replySubscription$.unsubscribe();
    }
  }
}
