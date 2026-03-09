import { EVENT } from "../../../constants.js";

export const settingsOnClickHandler = (): void => {
  const settings = document.querySelector<HTMLButtonElement>(
    "#profile-settings-button",
  );

  const profileContent =
    document.querySelector<HTMLElement>("#profile-content");
  const profileSettings =
    document.querySelector<HTMLElement>("#profile-settings");

  if (!settings || !profileContent || !profileSettings) {
    return;
  }

  settings.addEventListener(EVENT.click, () => {
    profileContent.classList.add("hidden");
    profileSettings.classList.remove("hidden");
  });
};
