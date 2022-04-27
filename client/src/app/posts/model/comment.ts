import { User } from '@app/auth/model/user';
import { Like } from './like';

export interface Comment {
  _id?: string;
  content: string;
  likes?: Array<Like>;
  author: User;
  parentId: string;
  replyTo?: string;
  comments?: Array<Comment>;
  createdAt?: string;
  updatedAt?: string;
}
