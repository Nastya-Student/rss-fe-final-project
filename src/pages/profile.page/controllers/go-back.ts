import { EVENT } from "../../../constants.js";

export const goBackHandler = (): void => {
  const goBack = document.querySelector<HTMLButtonElement>(
    "#profile-back-button",
  );

  const profileContent =
    document.querySelector<HTMLElement>("#profile-content");
  const profileSettings =
    document.querySelector<HTMLElement>("#profile-settings");

  if (!goBack || !profileContent || !profileSettings) {
    return;
  }

  goBack.addEventListener(EVENT.click, () => {
    profileContent.classList.remove("hidden");
    profileSettings.classList.add("hidden");
  });
};
