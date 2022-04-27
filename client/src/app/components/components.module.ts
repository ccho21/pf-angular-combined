import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { SharedModule } from '@app/shared/shared.module';
import { PipesModule } from '@app/shared/pipes/pipes.module';

import { UploadFilesComponent } from '@app/components/upload-files/upload-files.component';
import { RouterModule } from '@angular/router';
import { UserActionDialogComponent } from './user-action-dialog/user-action-dialog.component';
import { LikeUserDialogComponent } from './like-user-dialog/like-user-dialog.component';

@NgModule({
  declarations: [
    UploadFilesComponent,
    UserActionDialogComponent,
    LikeUserDialogComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    ReactiveFormsModule,
    PipesModule,
    RouterModule,
  ],
  exports: [
    UploadFilesComponent,
    UserActionDialogComponent,
    LikeUserDialogComponent,
  ],
})
export class ComponentsModule {}
