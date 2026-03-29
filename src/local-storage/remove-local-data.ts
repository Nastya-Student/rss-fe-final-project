import { deleteSessions } from "./practice-sessions";
import { deleteUser } from "./user";

export const removeLocalData = (): void => {
  deleteUser();
  deleteSessions();
  deleteSessions();
};
