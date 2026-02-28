import type { User } from "../interfaces/user.interface.js";
import usersMock from "../data/mock-user.data.json" with { type: "json" };
import { isUserArray } from "../guards/user.guards.js";
import { BaseDataService } from "./base-data.service.js";

class UserService extends BaseDataService<User> {
  protected endpoint = "users";
  protected mockData: unknown = usersMock;
  protected isValid = isUserArray;

  async getUsers(): Promise<User[] | undefined> {
    return this.getAll();
  }

  async getUserById(id: string): Promise<User | undefined> {
    const users = await this.getAll();
    return users?.find((user) => user.id === id);
  }
}

export const userService = new UserService();
