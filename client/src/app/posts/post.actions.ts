import { createAction, props } from '@ngrx/store';
import { Post } from './model/post';
import { Update } from '@ngrx/entity';

export const loadAllPosts = createAction('[Posts Resolver] Load All Posts');

export const allPostsLoaded = createAction(
  '[Load Posts Effect] All Posts Loaded',
  props<{ posts: Post[] }>()
);

export const postUpdated = createAction(
  '[Edit Post Dialog] Post Updated',
  props<{ update: Update<Post> }>()
);

export const postCreated = createAction(
  '[Create Post] Post Created',
  props<{ post: Post }>()
);

export const postDeleted = createAction(
  '[Delete Post] Post deleted',
  props<{ id: string }>()
);

export const commentUpdated = createAction(
  '[Update Post Comment] Comment Updated',
  props<{ update: Update<Post> }>()
);

export const likeUpdated = createAction(
  '[Update Post Like] Like Updated',
  props<{ update: Update<Post> }>()
);

export const viewUpdated = createAction(
  '[Update Post View] View Updated',
  props<{ update: Update<Post> }>()
);
