import { EVENT } from "../../../constants.js";

export const SettingsButtonHandler = (button: HTMLButtonElement): void => {
  const profileContent =
    document.querySelector<HTMLElement>("#profile-content");
  const profileSettings =
    document.querySelector<HTMLElement>("#profile-settings");

  if (!profileContent || !profileSettings) {
    return;
  }

  button.addEventListener(EVENT.click, () => {
    toggleContent(profileContent);
    toggleContent(profileSettings);
  });
};

export const toggleContent = (content: HTMLElement): void => {
  if (content.classList.contains("hidden")) {
    content.classList.remove("hidden");
  } else {
    content.classList.add("hidden");
  }
};
