import { Component, Input, OnInit } from '@angular/core';
import { PostService } from '@app/posts/post.service';
import { Comment } from '../model/comment';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss'],
})
export class CommentComponent implements OnInit {
  @Input() comment?: Comment;
  @Input() userId?: string;
  @Input() postId?: string;

  default: string =
    'https://firebasestorage.googleapis.com/v0/b/bulletin-board-d1815.appspot.com/o/uploads%2F1582746081704_ayo-ogunseinde-2.jpg?alt=media&token=cbc87b46-e85a-4de3-93c3-416dd289b2f1';
  constructor(private postService: PostService) {}

  ngOnInit(): void {}
  isCommentLiked(comment?: Comment, userId?: string) {
    return this.postService.isLikedByUser(comment as Comment, userId);
  }

  reply(comment?: Comment) {
    this.postService.updateReplyDTO(comment as Comment);
  }
}
