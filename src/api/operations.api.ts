import { v4 as uid } from 'uuid';
import { Operation } from '../data/operation';
import { findAllUsersInLocalStorage, findUserInLocalSorage } from './users.api';

export const fetchAllOperations = (username: string): Promise<Operation[]> =>
  new Promise((resolve, reject) =>
    setTimeout(() => {
      try {
        const operations = findAllOperationsFromLocalStorage(username);
        return resolve(operations);
      } catch (e: unknown) {
        return reject((e as Error).message);
      }
    }, 20)
  );

export const addOneOperation = ({
  operation,
  username,
}: {
  operation: Omit<Operation, 'id'>;
  username: string;
}): Promise<Operation> =>
  new Promise((resolve, reject) =>
    setTimeout(() => {
      try {
        const newOperation = { ...operation, id: uid() };
        addOneOperationToLocalStorage(newOperation, username);
        return resolve(newOperation);
      } catch (e: unknown) {
        return reject((e as Error).message);
      }
    }, 50)
  );

export const deleteOperation = ({
  operationId,
  username,
}: {
  operationId: string;
  username: string;
}): Promise<void> =>
  new Promise((resolve, reject) =>
    setTimeout(() => {
      try {
        deleteOperationInLocalStorage({ operationId, username });
        return resolve();
      } catch (e: unknown) {
        return reject((e as Error).message);
      }
    }, 10)
  );

const findAllOperationsFromLocalStorage = (username: string): Operation[] => {
  const user = findUserInLocalSorage(username);
  return user?.operations || [];
};

const addOneOperationToLocalStorage = (
  operation: Operation,
  username: string
): void => {
  const user = findUserInLocalSorage(username);
  let allUsers = findAllUsersInLocalStorage();

  if (!user) {
    throw new Error('User not found');
  }

  user.operations = [...user.operations, operation];
  allUsers = { ...allUsers, [username]: user };
  localStorage.setItem('users', JSON.stringify(allUsers));
};

function deleteOperationInLocalStorage({
  operationId,
  username,
}: {
  operationId: string;
  username: string;
}) {
  const user = findUserInLocalSorage(username);
  let allUsers = findAllUsersInLocalStorage();

  if (!user) {
    throw new Error('User not found');
  }

  user.operations = user.operations.filter((i) => i.id !== operationId);
  allUsers = { ...allUsers, [username]: user };
  localStorage.setItem('users', JSON.stringify(allUsers));
}
