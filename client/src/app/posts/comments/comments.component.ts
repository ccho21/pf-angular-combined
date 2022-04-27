import { Component, Input, OnInit } from '@angular/core';
import { PostService } from '@app/posts/post.service';
import { Comment } from '../../posts/model/comment';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss'],
})
export class CommentsComponent implements OnInit {
  @Input() comments?: Array<Comment>;
  @Input() userId?: string;
  @Input() postId?: string;
 

  constructor(private postService: PostService) {}

  ngOnInit(): void {
  }
  // isCommentLiked(comment: Comment, userId?: string) {
  //   return this.postService.isLikedByUser(comment, userId);
  // }
}
