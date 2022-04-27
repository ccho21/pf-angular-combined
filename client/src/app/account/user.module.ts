import { NgModule } from '@angular/core';
import { SharedModule } from '@app/shared/shared.module';

import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';

import { MainComponent } from './main/main.component';
import { UserResolver } from './user.resolver';
import { PostsModule } from '@app/posts/posts.module';
import { StoreModule } from '@ngrx/store';
import { userReducer } from './reducers';
import { EffectsModule } from '@ngrx/effects';
import { UserEffects } from './user.effects';
import { UserProfileComponent } from './user-profile/user-profile.component';

export const usersRoutes: Routes = [
  {
    path: '',
    component: MainComponent,
  },
  {
    path: ':id',
    component: UserProfileComponent,
    resolve: {
      user: UserResolver,
    },
  },
];

@NgModule({
  declarations: [MainComponent, UserProfileComponent],
  imports: [
    CommonModule,
    StoreModule.forFeature('user', userReducer),
    SharedModule,
    RouterModule.forChild(usersRoutes),
    PostsModule,
    EffectsModule.forFeature([UserEffects]),
  ],
})
export class UserModule {}
