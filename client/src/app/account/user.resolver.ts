import { Injectable } from '@angular/core';
import {
  Router,
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot,
} from '@angular/router';
import { loadAllPosts } from '@app/posts/post.actions';
import { arePostsLoaded } from '@app/posts/posts.selectors';
import { AppState } from '@app/reducers';
import { select, Store } from '@ngrx/store';
import {
  concatMap,
  filter,
  finalize,
  first,
  forkJoin,
  map,
  Observable,
  of,
  tap,
} from 'rxjs';
import { loadUser } from './user.actions';
import { isSameUser, isUserLoaded } from './user.selectors';

@Injectable({
  providedIn: 'root',
})
export class UserResolver implements Resolve<boolean> {
  loading = false;

  constructor(private store: Store<AppState>) {}
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> {
    const userId = route.paramMap.get('id') as string;

    // TODO: add validation logic when userId is not valid
    // if (userId) {
    //   this.loading = false;
    // }
    console.log('USEr ID!########### ', userId);
    return this.store.pipe(
      select(isSameUser(userId)),
      concatMap((isSame: any) => {
        console.log('*****[ USER Resolver ]: LOAD USER', isSame);
        if (!this.loading && !isSame) {
          this.loading = true;
          this.store.dispatch(loadUser({ id: userId }));
        }
        return this.store.pipe(select(arePostsLoaded));
      }),
      tap((postsLoaded) => {
        if (!postsLoaded) {
          console.log('*****[ USER Resolver ]: LOAD ALL POSTS CALLED');
          this.loading = true;
          this.store.dispatch(loadAllPosts());
          console.log(
            '*****[ USER Resolver ]: called',
            this.loading,
            postsLoaded
          );
        }
      }),
      filter((postsLoaded) => postsLoaded),
      first(),
      finalize(() => {
        this.loading = false;
      })
    );
  }
}
