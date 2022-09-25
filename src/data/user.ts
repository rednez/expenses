import { Category } from './category';
import { Operation } from './operation';

export interface NewUser {
  username: string;
  password: string;
}

export interface User extends NewUser {
  categories: Category[];
  operations: Operation[];
}
