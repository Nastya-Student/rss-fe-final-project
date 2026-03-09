import { HEADINGS_TWO } from "../../constants.js";
import ButtonCreator from "../../utils/button/button-creator.js";
import ElementCreator from "../../utils/element-creator.js";
import HeadingsCreator from "../../utils/headings/headings-creator.js";
import { goBackHandler } from "./controllers/go-back.js";

export const renderSettingsWindow = (): void => {
  const container = document.querySelector<HTMLElement>("#profile-settings");

  if (!container) {
    return;
  }

  const settingsHeader = new ElementCreator({
    classes: ["profile__settings-header"],
    parent: container,
  }).getElement();

  const pageTitle = new HeadingsCreator(HEADINGS_TWO, {
    parent: settingsHeader,
  }).getElement();
  pageTitle.textContent = "Profile Settings:";
  pageTitle.id = "profile-settings-header";

  const goBack = new ButtonCreator({
    classes: ["button"],
    parent: settingsHeader,
  }).getElement();
  goBack.id = "profile-back-button";
  goBack.innerHTML = backSVG;

  goBackHandler();

  const buttons = new ElementCreator({
    classes: ["profile__settings-buttons"],
    parent: container,
  }).getElement();

  const changePassword = new ButtonCreator({
    text: "Change Password",
    classes: ["button"],
    parent: buttons,
  }).getElement();
  changePassword.id = "profile-change-password-btn";

  const changeName = new ButtonCreator({
    text: "Change Name",
    classes: ["button"],
    parent: buttons,
  }).getElement();
  changeName.id = "profile-change-name-btn";

  const changeEmail = new ButtonCreator({
    text: "Change Email",
    classes: ["button"],
    parent: buttons,
  }).getElement();
  changeEmail.id = "profile-change-email-btn";

  const getReminders = new ButtonCreator({
    text: "Get Reminders",
    classes: ["button"],
    parent: buttons,
  }).getElement();
  getReminders.id = "profile-get-reminders-btn";

  const resetProgress = new ButtonCreator({
    text: "Reset Progress",
    classes: ["button"],
    parent: buttons,
  }).getElement();
  resetProgress.id = "profile-reset-progress-btn";

  const deleteAccount = new ButtonCreator({
    text: "Delete Account",
    classes: ["button"],
    parent: buttons,
  }).getElement();
  deleteAccount.id = "profile-delete-account-btn";
};

const backSVG = `<svg xmlns="http://www.w3.org/2000/svg" width="2rem" height="2rem" viewBox="0 0 24 24" fill="none">
<path d="M9 22H15C20 22 22 20 22 15V9C22 4 20 2 15 2H9C4 2 2 4 2 9V15C2 20 4 22 9 22Z" stroke="#ffffff" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M9.00002 15.3802H13.92C15.62 15.3802 17 14.0002 17 12.3002C17 10.6002 15.62 9.22021 13.92 9.22021H7.15002" stroke="#292D32" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M8.57 10.7701L7 9.19012L8.57 7.62012" stroke="#292D32" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`;
