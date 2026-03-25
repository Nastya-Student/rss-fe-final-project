export const ACHIEVEMENTS = {
  novice: "novice",
  student: "student",
  topPerformer: "top-performer",
  expert: "expert",
} as const;

export const LOCAL_STORAGE = {
  currentUser: "current-user",
  userSessions: "user-sessions",
} as const;

export const ERRORS = {
  avatar: "Avatar not found",
  user: "User name not found",
  achievement: "Achievement can not be calculated",
  chart: "Chart can not be created. Please, reload this page.",
  finalText: "Some error with getting text. Please, reload this page.",
  userData: "Error loading user data",
};

export const NOTIFICATIONS = {
  finalText: "You are ready to the interview!",
  profileTitle: "Profile Page",
};

export const BUTTONS = {
  logout: "Logout",
  toDashboard: "To dashboard",
};
