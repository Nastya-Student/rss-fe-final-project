import { UserService } from "../src/services/user.service.js";
import { User } from "../src/interfaces/user.interface.js";
import { beforeEach, describe, expect, it } from "vitest";

class TestUserService extends UserService {
  constructor(data: User[] | undefined) {
    super();
    this.mockData = data;
  }

  public callGetAll() {
    return this.getAll();
  }
}

describe("UserService", () => {
  let service: TestUserService;
  let mockData: User[];
  beforeEach(() => {
    mockData = [
      {
        id: "u1",
        name: "Ivan",
        email: "ivan@mail.com",
        passwordHash: "hashed",
        xp: 120,
        streak: 5,
        createdAt: "2026-02-20",
        photo: "",
        getReminder: false,
      },
      {
        id: "u2",
        name: "Olga",
        email: "olga@mail.com",
        passwordHash: "hashed",
        xp: 80,
        streak: 2,
        createdAt: "2026-02-18",
        photo: "",
        getReminder: false,
      },
      {
        id: "u3",
        name: "Alex",
        email: "alex@mail.com",
        passwordHash: "hashed",
        xp: 200,
        streak: 10,
        createdAt: "2026-02-10",
        photo: "",
        getReminder: false,
      },
    ];

    service = new TestUserService(mockData);
  });

  it("getUsers should return all users", async () => {
    const users = await service.getUsers();
    expect(users).toHaveLength(mockData.length);
  });

  it("getUserById should filter correctly for a random Id", async () => {
    const userIds = mockData.map((user) => user.id);
    const randomUserId = userIds[Math.floor(Math.random() * userIds.length)];
    if (randomUserId === undefined) {
      throw new Error("randomUserId is undefined");
    }

    const expectedUser = mockData.find((user) => user.id === randomUserId);
    const userById = await service.getUserById(randomUserId);
    expect(userById).toStrictEqual(expectedUser);
  });

  it("getAll should return undefined if mockData is invalid", async () => {
    const service = new TestUserService(undefined);
    const topics = await service.callGetAll();
    expect(topics).toBeUndefined();
  });

  it("getUserById should return undefined if no matches", async () => {
    const users = await service.getUserById("null");
    expect(users).toBeUndefined();
  });
});
