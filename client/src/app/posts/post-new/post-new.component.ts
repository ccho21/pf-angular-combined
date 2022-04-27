import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AppState } from '@app/reducers';
import { PostService } from '@app/posts/post.service';
import { Update } from '@ngrx/entity';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Post } from '../model/post';
import { postUpdated } from '../post.actions';

@Component({
  selector: 'app-post-new',
  templateUrl: './post-new.component.html',
  styleUrls: ['./post-new.component.scss'],
})
export class PostNewComponent implements OnInit {
  form!: FormGroup;
  post!: Post;

  loading$!: Observable<boolean>;

  constructor(
    private fb: FormBuilder,
    private store: Store<AppState>,
    private postService: PostService
  ) {
    this.form = this.fb.group({
      content: ['', [Validators.required]],
      images: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {}

  addImages(urls: Array<string>) {
    this.form.get('images')?.setValue(urls);
    console.log('first', this.form.get('images'));
  }

  onSubmit(): void {
    console.log('Post add function', this.form);
    if (!this.form.valid) {
      return;
    }
    const post = { ...this.form.value };

    this.postService.savePost(post._id, post).subscribe({
      next: () => {
        console.log('Post updated');
        
      },
      error: (err) => {
        console.log('Error occurred', err);
      },
    });
  }
}
