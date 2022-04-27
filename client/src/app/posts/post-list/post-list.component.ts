import { Component, Input, OnInit } from '@angular/core';
import { Post } from '@app/posts/model/post';
import { PostDetailComponent } from '../post-detail/post-detail.component';
import { PostService } from '../post.service';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss'],
})
export class PostListComponent implements OnInit {
  @Input() posts!: Array<Post> | null;
  default: string =
    'https://firebasestorage.googleapis.com/v0/b/bulletin-board-d1815.appspot.com/o/uploads%2F1582746081704_ayo-ogunseinde-2.jpg?alt=media&token=cbc87b46-e85a-4de3-93c3-416dd289b2f1';

  constructor(private postService: PostService) {}

  ngOnInit(): void {}

  getBackgroundImageUrl(post: Post) {
    return `url(${post.images.length ? post.images[0] : this.default})`;
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
}
