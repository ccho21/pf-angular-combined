import { User } from '@app/auth/model/user';

export interface Like {
  author: User;
  user: string,
  createdAt?: string;
}
