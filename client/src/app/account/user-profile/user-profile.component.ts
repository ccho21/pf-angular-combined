import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route } from '@angular/router';
import { User } from '@app/auth/model/user';
import { Post } from '@app/posts/model/post';
import {
  selectLikedPost,
  selectPostsByUserId,
} from '@app/posts/posts.selectors';
import { AppState } from '@app/reducers';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { selectUser } from '../user.selectors';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss'],
})
export class UserProfileComponent implements OnInit {
  user$?: Observable<User>;
  userPosts$?: Observable<Post[]>;
  userPostsLiked$?: Observable<Post[]>;
  userId?: string;
  constructor(private store: Store<AppState>, private route: ActivatedRoute) {}

  ngOnInit(): void {
    // Reload the selectors when the route is changed.
    this.route.paramMap.subscribe((params) => {
      console.log('[USER DETAIL COMPONENT]');
      this.userId = params.get('id') as string;
      this.reload(this.userId);
    });
  }
  reload(id: string) {
    // Use Select to get users and posts by user ID
    this.user$ = this.store.pipe(select(selectUser)) as Observable<User>;
    this.userPosts$ = this.store.pipe(select(selectPostsByUserId(id)));
    this.userPostsLiked$ = this.store.pipe(select(selectLikedPost(id)));
  }
}
