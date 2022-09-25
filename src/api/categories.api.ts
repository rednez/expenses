import { v4 as uid } from 'uuid';
import { Category } from '../data/category';
import { findAllUsersInLocalStorage, findUserInLocalSorage } from './users.api';

export const fetchAllCategories = (username: string): Promise<Category[]> =>
  new Promise((resolve) =>
    setTimeout(() => {
      const categories = findAllCategoriesFromLocalStorage(username);
      return resolve(categories);
    }, 20)
  );

export const addOneCategory = ({
  name,
  username,
}: {
  name: string;
  username: string;
}): Promise<Category> =>
  new Promise((resolve) =>
    setTimeout(() => {
      const category = { id: uid(), name };
      addOneCategoryToLocalStorage(category, username);
      return resolve(category);
    }, 50)
  );

const findAllCategoriesFromLocalStorage = (username: string): Category[] => {
  const user = findUserInLocalSorage(username);
  return user?.categories || [];
};

const addOneCategoryToLocalStorage = (
  category: Category,
  username: string
): void => {
  const user = findUserInLocalSorage(username);
  let allUsers = findAllUsersInLocalStorage();

  if (!user) {
    throw new Error('User not found');
  }

  user.categories = [...user.categories, category];
  allUsers = { ...allUsers, [username]: user };
  localStorage.setItem('users', JSON.stringify(allUsers));
};
