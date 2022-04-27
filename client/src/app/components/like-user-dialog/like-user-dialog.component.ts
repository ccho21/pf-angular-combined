import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Post } from '@app/posts/model/post';
import { defaultDialogConfig } from '@app/shared/default-dialog-config';

@Component({
  selector: 'app-like-user-dialog',
  templateUrl: './like-user-dialog.component.html',
  styleUrls: ['./like-user-dialog.component.scss'],
})
export class LikeUserDialogComponent implements OnInit {
  @Input() post?: Post;
  constructor(private dialog: MatDialog) {}

  ngOnInit(): void {}
  openLikes(component: any) {
    const dialogConfig = defaultDialogConfig();

    dialogConfig.data = {
      dialogTitle: 'Likes',
    };
    dialogConfig.panelClass = 'custom-no-padding';
    this.dialog
      .open(component, dialogConfig)
      .afterClosed()
      .subscribe(() => {});
  }
}
