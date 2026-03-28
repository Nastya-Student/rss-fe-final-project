import { isUser } from "../guards/user.guards";
import { User } from "../interfaces/user.interface";
import { LOCAL_STORAGE } from "./objects";

export const setUser = (user: User): void => {
  localStorage.setItem(LOCAL_STORAGE.currentUser, JSON.stringify(user) ?? "");
};

export const getUser = (): User | undefined => {
  const user: unknown = JSON.parse(
    localStorage.getItem(LOCAL_STORAGE.currentUser) ?? "{}",
  );
  if (isUser(user)) {
    return user;
  }
  return;
};

export const updateUser = (): void => {};

export const deleteUser = (): void => {};
