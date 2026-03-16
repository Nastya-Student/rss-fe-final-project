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

describe("TopicProgressService", () => {
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
      },
      {
        id: "u2",
        name: "Olga",
        email: "olga@mail.com",
        passwordHash: "hashed",
        xp: 80,
        streak: 2,
        createdAt: "2026-02-18",
      },
      {
        id: "u3",
        name: "Alex",
        email: "alex@mail.com",
        passwordHash: "hashed",
        xp: 200,
        streak: 10,
        createdAt: "2026-02-10",
      },
    ];

    service = new TestUserService(mockData);
  });

  it("getUsers should return all users", async () => {
    const users = await service.getUsers();
    expect(users).toHaveLength(mockData.length);
  });
});
