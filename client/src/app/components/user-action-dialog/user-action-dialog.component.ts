import { Component, Input, OnInit, TemplateRef } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Post } from '@app/posts/model/post';
import { PostEditDialogComponent } from '@app/posts/post-edit-dialog/post-edit-dialog.component';
import { PostService } from '@app/posts/post.service';
import { defaultDialogConfig } from '@app/shared/default-dialog-config';
import { of } from 'rxjs';
import { concatMap, tap } from 'rxjs/operators';

@Component({
  selector: 'app-user-action-dialog',
  templateUrl: './user-action-dialog.component.html',
  styleUrls: ['./user-action-dialog.component.scss'],
})
export class UserActionDialogComponent implements OnInit {
  @Input() post?: Post;
  @Input() userId?: string;

  isSameAuthor: boolean = false;

  constructor(private dialog: MatDialog, private postService: PostService) {}

  ngOnInit(): void {
    this.isSameAuthor = this.post?.author?._id === this.userId ? true : false;
  }

  // POST FUNCTIONS
  editPost(post?: Post) {
    const dialogConfig = defaultDialogConfig();

    dialogConfig.data = {
      dialogTitle: 'Edit Post',
      post,
      mode: 'update',
    };

    this.dialog
      .open(PostEditDialogComponent, dialogConfig)
      .afterClosed()
      .subscribe(() => {
        console.log('dialog is done');
      });
  }
  deletePost(post?: Post, component?: any) {
    console.log('DELETE POST', post);
    const dialogConfig = defaultDialogConfig();

    this.dialog
      .open(component, dialogConfig)
      .afterClosed()
      .pipe(
        concatMap((answer: boolean) => {
          if (answer === true) {
            return this.postService.deletePost(post?._id as string);
          }
          return of(false);
        })
      )
      .subscribe((answer) => {
        console.log('### dialog is done Thank you');
      });
  }

  // UI FUNCTIONS
  openActionModal(component: TemplateRef<any>) {
    const dialogConfig = defaultDialogConfig();

    dialogConfig.data = {
      dialogTitle: 'Edit Post',
      mode: 'update',
    };
    dialogConfig.panelClass = 'custom-no-padding';

    this.dialog
      .open(component, dialogConfig)
      .afterClosed()
      .subscribe(() => {});
  }
}
