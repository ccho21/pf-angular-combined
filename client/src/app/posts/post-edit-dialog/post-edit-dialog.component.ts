import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AppState } from '@app/reducers';
import { PostService } from '@app/posts/post.service';
import { Update } from '@ngrx/entity';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Post } from '../model/post';
import { postUpdated } from '../post.actions';

@Component({
  selector: 'app-post-edit-dialog',
  templateUrl: './post-edit-dialog.component.html',
  styleUrls: ['./post-edit-dialog.component.scss'],
})
export class PostEditDialogComponent {
  form?: FormGroup;
  loading$?: Observable<boolean>;

  post?: Post;
  dialogTitle: string;
  mode?: 'create' | 'update';

  constructor(
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) data: any,
    private store: Store<AppState>,
    private postService: PostService
  ) {
    this.dialogTitle = data.dialogTitle;
    this.mode = data.mode;
    this.post = data.post;
    const formControls = {
      content: ['', [Validators.required]],
      images: ['', [Validators.required]],
    };

    if (this.mode == 'update') {
      this.form = this.fb.group(formControls);
      this.form.patchValue({ ...data.post });
    }
  }

  addImages(urls: Array<string>) {
    console.log('### urls :', urls);
    this.form?.get('images')?.setValue(urls);
    console.log('first', this.form?.get('images'));
  }

  onSubmit() {
    if (!this.form?.valid) {
      return;
    }
    console.log(this.form.value);
    const post = { ...this.form.value };

    const update: Update<Post> = {
      id: this.post?._id as string,
      changes: post,
    };
    this.store.dispatch(postUpdated({ update }));
    // this.postService.updatePost(update.id, update.changes).subscribe({
    //   next: () => {
    //     console.log('Post updated');
    //   },
    //   error: (err) => {
    //     console.log('Error occurred', err);
    //   },
    // });
  }
}
