import { format, sub } from 'date-fns';
import { v4 as uid } from 'uuid';
import { Category } from '../data/category';
import { Operation } from '../data/operation';
import { NewUser, User } from '../data/user';

export const createUser = (user: NewUser): Promise<User> =>
  new Promise((resolve, reject) =>
    setTimeout(() => {
      try {
        addUserToLocalStorage(user);
      } catch (e: unknown) {
        return reject((e as Error).message);
      }
      return resolve({ ...user, categories: [], operations: [] });
    }, 50)
  );

export const sighIn = (user: NewUser): Promise<User> =>
  new Promise((resolve, reject) => {
    const existedUser = findUserInLocalSorage(user.username);
    if (!existedUser) {
      return reject('User not found');
    }
    if (existedUser.password !== user.password) {
      return reject('Username or password is incorrect');
    }
    return setTimeout(
      () => resolve({ ...user, categories: [], operations: [] }),
      50
    );
  });

export const generateDemoData = (username: string): Promise<User> =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      try {
        const user = generateDemoDataInLocalStorage(username);
        resolve(user);
      } catch (e: unknown) {
        return reject((e as Error).message);
      }
    }, 10);
  });

export const getCurrentUsername = (): string | null => {
  return findCurrentUsernameInLocalStorage();
};

export const findAllUsersInLocalStorage = (): Record<string, User> => {
  const lsUsers = localStorage.getItem('users');
  return lsUsers ? JSON.parse(lsUsers) : {};
};

export const findUserInLocalSorage = (username: string): User | null => {
  const users = findAllUsersInLocalStorage();
  return users[username] || null;
};

const addUserToLocalStorage = ({ username, password }: NewUser): void => {
  const existedUser = findUserInLocalSorage(username);
  if (existedUser) {
    throw new Error('User already exists');
  }
  const users: Record<string, User> = {
    ...findAllUsersInLocalStorage(),
    [username]: { username, password, categories: [], operations: [] },
  };
  localStorage.setItem('users', JSON.stringify(users));
};

const findCurrentUsernameInLocalStorage = (): string | null => {
  return localStorage.getItem('currentUsername');
};

function generateDemoDataInLocalStorage(username: string): User {
  const user = findUserInLocalSorage(username);
  let allUsers = findAllUsersInLocalStorage();

  if (!user) {
    throw new Error('User not found');
  }

  user.categories = generateCategories();
  user.operations = generateOperations();
  allUsers = { ...allUsers, [username]: user };
  localStorage.setItem('users', JSON.stringify(allUsers));

  return user;
}

function generateCategories(): Category[] {
  return [
    'Life',
    'Sport',
    'Health',
    'Car',
    'Foods',
    'Travel',
    'Drink',
    'Games',
    'Business',
  ].map((i) => ({
    id: uid(),
    name: i,
  }));
}

function generateOperations(): Operation[] {
  const dateFormat = 'yyyy-MM-dd';
  const today = new Date();

  return [
    {
      id: uid(),
      date: format(today, dateFormat),
      description: 'Life 1',
      amount: 200,
      type: 'spense',
      category: 'Life',
    },
    {
      id: uid(),
      date: format(sub(today, { days: 1 }), dateFormat),
      description: 'Gas',
      amount: 1500.7,
      type: 'spense',
      category: 'Car',
    },
    {
      id: uid(),
      date: format(sub(today, { days: 2 }), dateFormat),
      description: 'Car wash',
      amount: 120,
      type: 'spense',
      category: 'Car',
    },
    {
      id: uid(),
      date: format(sub(today, { days: 2 }), dateFormat),
      description: 'Income from Starlink',
      amount: 18000,
      type: 'income',
      category: 'Business',
    },
    {
      id: uid(),
      date: format(sub(today, { days: 2 }), dateFormat),
      description: 'Dentist',
      amount: 1500,
      type: 'spense',
      category: 'Health',
    },
    {
      id: uid(),
      date: format(sub(today, { days: 6 }), dateFormat),
      description: 'Visit to sport club',
      amount: 300,
      type: 'spense',
      category: 'Sport',
    },
    {
      id: uid(),
      date: format(sub(today, { days: 12 }), dateFormat),
      description: 'Gran Turismo 7',
      amount: 950,
      type: 'spense',
      category: 'Games',
    },
  ];
}
