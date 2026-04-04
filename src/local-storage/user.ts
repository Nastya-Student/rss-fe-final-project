import { isUser } from "../guards/user.guards";
import { User } from "../interfaces/user.interface";
import { LOCAL_STORAGE } from "./objects";

export const setUser = (user: User): void => {
  localStorage.setItem(LOCAL_STORAGE.currentUser, JSON.stringify(user) ?? "");
};

export const getUser = (): User => {
  const user: unknown = JSON.parse(
    localStorage.getItem(LOCAL_STORAGE.currentUser) ?? "{}",
  );
  if (isUser(user)) {
    return user;
  }
  throw new Error("This user does not exist");
};

export const updateUser = (user: User): void => {
  setUser(user);
};

export const deleteUser = (): void => {
  localStorage.removeItem(LOCAL_STORAGE.currentUser);
};
