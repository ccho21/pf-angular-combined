import { Comment } from './comment';
import { Like } from './like';
import { View } from './view';
import { User } from '@app/auth/model/user';

export interface Post {
  _id?: string;
  content: string;
  author?: User;
  images: Array<string>;
  likes: Array<Like>;
  views?: Array<View>;
  comments?: Array<Comment>;
  createdAt?: string;
  updatedAt?: string;
  
}
