import { createFeatureSelector, createSelector } from '@ngrx/store';
import { PostsState } from './reducers/post.reducers';
import * as fromPosts from './reducers/post.reducers';

import { Post } from './model/post';

export const selectPostsState = createFeatureSelector<PostsState>('posts');

export const selectAllPosts = createSelector(
  selectPostsState,
  fromPosts.selectAllPosts
);

export const selectPostsByUserId = (id: string) => {
  return createSelector(selectAllPosts, (posts) =>
    posts.filter((post) => post.author?._id === id)
  );
};

export const selectLikedPost = (id: string) => {
  return createSelector(selectAllPosts, (posts) =>
    posts.filter((post) => post.likes.some((like) => like.user === id))
  );
};

export const arePostsLoaded = createSelector(
  selectPostsState,
  (state) => state.allPostsLoaded
);

export const selectPost = (id: string) =>
  createSelector(selectAllPosts, (posts) => {
    const post = posts.find((post) => post._id === id);
    return post as Post;
  });
