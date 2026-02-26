import type { User } from "../interfaces/user.interface.js";
import { API_BASE_URL, isMockData } from "../config/api.config.js";
import usersMock from "../data/mock-user.data.json" with { type: "json" };
import { isUserArray } from "../guards/user.guards.js";

class UserService {
  async getUsers(): Promise<User[] | undefined> {
    if (isMockData()) {
      const data: unknown = usersMock;

      if (isUserArray(data)) {
        return data;
      }

      return;
    }

    return fetch(`${API_BASE_URL}/users`)
      .then((response) => response.json())
      .then((data) => {
        if (isUserArray(data)) {
          return data;
        }

        return;
      });
  }

  async getUserById(id: string): Promise<User | undefined> {
    const users = await this.getUsers();
    return users?.find((user) => user.id === id);
  }
}

export const userService = new UserService();
