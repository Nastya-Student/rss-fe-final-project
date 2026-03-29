import { HEADINGS_ONE, HEADINGS_TWO } from "../../constants.js";
import { PracticeSession } from "../../interfaces/practice-session.interface.js";
import { User } from "../../interfaces/user.interface.js";
import { RoutePath } from "../../types/route-path.enum.js";
import ButtonCreator from "../../utils/button/button-creator.js";
import ElementCreator from "../../utils/element-creator.js";
import HeadingsCreator from "../../utils/headings/headings-creator.js";
import { BasePage } from "../base-page.js";
import { SettingsButtonHandler } from "./controllers/settings.js";
import {
  ACHIEVEMENTS,
  BUTTONS,
  ERRORS,
  NOTIFICATIONS,
} from "./profile-configs.js";
import { renderSettingsWindow } from "./profile-settings.window.js";
import "./profile.page.css";
import { createChart } from "./utils/create-chart.js";
import {
  createLocalUser,
  createPracticeHistory,
} from "../../local-storage/create-local-data.js";
import { establishAchievementStatus } from "./utils/establish-achievement-status.js";

const LOCAL_USER = "u1";
// const LOCAL_AVATAR_PATH = "../../assets/";

export class ProfilePage extends BasePage {
  private user: User | undefined;
  private sessions: PracticeSession[] | undefined;

  private _avatar?: HTMLImageElement | undefined;

  private _name?: HTMLHeadingElement | undefined;

  private _achievement?: HTMLElement | undefined;

  private _ctx?: HTMLCanvasElement | undefined;

  private _readyText: HTMLElement | undefined;

  public get avatar(): HTMLImageElement {
    if (!this._avatar) {
      throw new Error(ERRORS.avatar);
    }
    return this._avatar;
  }

  public get name(): HTMLHeadingElement {
    if (!this._name) {
      throw new Error(ERRORS.user);
    }
    return this._name;
  }

  public get achievement(): HTMLElement {
    if (!this._achievement) {
      throw new Error(ERRORS.achievement);
    }
    return this._achievement;
  }

  public get ctx(): HTMLCanvasElement {
    if (!this._ctx) {
      throw new Error(ERRORS.chart);
    }
    return this._ctx;
  }

  public get readyText(): HTMLElement {
    if (!this._readyText) {
      throw new Error(ERRORS.finalText);
    }
    return this._readyText;
  }

  loadImage(name: string): string {
    return new URL(`../../assets/${name}`, import.meta.url).href;
  }

  private async setData(): Promise<void> {
    this.user = await createLocalUser(LOCAL_USER).catch();
    this.sessions = await createPracticeHistory(LOCAL_USER);

    if (!this.user || !this.sessions) {
      return;
    }

    this.avatar.src = this.loadImage(this.user.photo);
    this.name.textContent = this.user.name;
    const status = `status: ${establishAchievementStatus(this.sessions)}`;
    this.achievement.textContent = status;
    if (status === ACHIEVEMENTS.expert) {
      this.readyText.classList.remove("hidden");
    }
    createChart(this.ctx, this.sessions);
  }

  create(parent: HTMLElement): void {
    parent.append(this.container);
    this.container.classList.add("profile-page");
    this.container.id = "profile-page";

    const profileHeader = new ElementCreator({
      classes: ["profile__header"],
      parent: this.container,
    }).getElement();

    const profileContent = new ElementCreator({
      classes: ["profile__content"],
      parent: this.container,
    }).getElement();
    profileContent.id = "profile-content";

    const profileSettings = new ElementCreator({
      classes: ["profile__settings", "hidden"],
      parent: this.container,
    }).getElement();
    profileSettings.id = "profile-settings";
    renderSettingsWindow(profileSettings);

    const pageTitle = new HeadingsCreator(HEADINGS_TWO, {
      parent: profileHeader,
    }).getElement();
    pageTitle.textContent = NOTIFICATIONS.profileTitle;

    const buttons = new ElementCreator({
      classes: ["profile__header-buttons"],
      parent: profileHeader,
    }).getElement();

    const toDashboardButton = new ButtonCreator({
      text: BUTTONS.toDashboard,
      classes: ["button"],
      parent: buttons,
    }).getElement();

    new ButtonCreator({
      text: BUTTONS.logout,
      classes: ["button"],
      parent: buttons,
    }).getElement();

    const descriptionBlock = new ElementCreator({
      classes: ["profile__description-block"],
      parent: profileContent,
    }).getElement();
    descriptionBlock.id = "profile-description-block";

    const avatarWrapper = new ElementCreator({
      classes: ["profile__avatar-wrapper"],
      parent: descriptionBlock,
    }).getElement();
    avatarWrapper.id = "profile-avatar-wrapper";

    this._avatar = document.createElement("img");
    this.avatar.classList.add("profile__avatar");
    avatarWrapper.append(this.avatar);

    const rightWrapper = new ElementCreator({
      classes: ["profile__right-wrapper"],
      parent: descriptionBlock,
    }).getElement();

    const rightWrapperHeader = new ElementCreator({
      classes: ["profile__right-wrapper-header"],
      parent: rightWrapper,
    }).getElement();

    const rightWrapperChart = new ElementCreator({
      classes: ["profile__right-wrapper-chart"],
      parent: rightWrapper,
    }).getElement();

    const description = new ElementCreator({
      classes: ["profile__description"],
      parent: rightWrapperHeader,
    }).getElement();

    const descriptionHeader = new ElementCreator({
      classes: ["profile__description-header"],
      parent: description,
    }).getElement();

    this._name = new HeadingsCreator(HEADINGS_ONE, {
      classes: ["profile__username"],
      parent: descriptionHeader,
    }).getElement();

    const settings = new ButtonCreator({
      classes: ["button"],
      parent: rightWrapperHeader,
    }).getElement();
    settings.id = "profile-settings-button";
    settings.innerHTML = settingsSVG;

    this._achievement = new ElementCreator({
      classes: ["profile__achievement-wrapper"],
      parent: description,
    }).getElement();
    this._achievement.id = "profile-achievement-wrapper";

    this._readyText = new ElementCreator({
      text: NOTIFICATIONS.finalText,
      classes: ["profile__ready-text"],
      hidden: true,
      parent: description,
    }).getElement();
    this._readyText.id = "profile-ready-text";

    const chartBlock = new ElementCreator({
      classes: ["profile__chart-block"],
      parent: rightWrapperChart,
    }).getElement();
    chartBlock.id = "profile-chart-block";

    this._ctx = document.createElement("canvas");
    this._ctx.id = "profile-chart";
    chartBlock.append(this._ctx);

    toDashboardButton.dataset.route = RoutePath.Dashboard;

    SettingsButtonHandler(settings);

    this.setData().catch(() => {
      throw new Error(ERRORS.userData);
    });
  }
}

const settingsSVG = `<svg xmlns="http://www.w3.org/2000/svg" fill="#ffffff" width="2rem" height="2rem" viewBox="0 0 32 32" version="1.1">
    <path d="M30.015 12.97l-2.567-0.569c-0.2-0.64-0.462-1.252-0.762-1.841l1.389-2.313c0.518-0.829 0.78-2.047 0-2.829l-1.415-1.414c-0.78-0.781-2.098-0.64-2.894-0.088l-2.251 1.434c-0.584-0.303-1.195-0.563-1.829-0.768l-0.576-2.598c-0.172-0.953-1.005-1.984-2.11-1.984h-2c-1.104 0-1.781 1.047-2 2l-0.642 2.567c-0.678 0.216-1.328 0.492-1.948 0.819l-2.308-1.47c-0.795-0.552-2.114-0.692-2.894 0.088l-1.415 1.414c-0.781 0.782-0.519 2 0 2.828l1.461 2.435c-0.274 0.552-0.517 1.123-0.705 1.72l-2.566 0.569c-0.953 0.171-1.984 1.005-1.984 2.109v2c0 1.105 1.047 1.782 2 2l2.598 0.649c0.179 0.551 0.404 1.080 0.658 1.593l-1.462 2.438c-0.518 0.828-0.78 2.047 0 2.828l1.415 1.414c0.78 0.782 2.098 0.64 2.894 0.089l2.313-1.474c0.623 0.329 1.277 0.608 1.96 0.823l0.64 2.559c0.219 0.953 0.896 2 2 2h2c1.105 0 1.938-1.032 2.11-1.985l0.577-2.604c0.628-0.203 1.23-0.459 1.808-0.758l2.256 1.438c0.796 0.552 2.114 0.692 2.895-0.089l1.415-1.414c0.78-0.782 0.518-2 0-2.828l-1.39-2.317c0.279-0.549 0.521-1.12 0.716-1.714l2.599-0.649c0.953-0.219 2-0.895 2-2v-2c0-1.104-1.031-1.938-1.985-2.11zM30.001 16.939c-0.085 0.061-0.245 0.145-0.448 0.192l-3.708 0.926-0.344 1.051c-0.155 0.474-0.356 0.954-0.597 1.428l-0.502 0.986 1.959 3.267c0.125 0.2 0.183 0.379 0.201 0.485l-1.316 1.314c-0.127-0.040-0.271-0.092-0.341-0.14l-3.292-2.099-1.023 0.529c-0.493 0.256-0.999 0.468-1.503 0.631l-1.090 0.352-0.824 3.723c-0.038 0.199-0.145 0.36-0.218 0.417h-1.8c-0.061-0.085-0.145-0.245-0.191-0.448l-0.921-3.681-1.066-0.338c-0.549-0.173-1.097-0.404-1.63-0.684l-1.028-0.543-3.293 2.099c-0.135 0.091-0.279 0.143-0.409 0.143l-1.311-1.276c0.018-0.104 0.072-0.274 0.181-0.449l2.045-3.408-0.487-0.98c-0.227-0.462-0.407-0.895-0.547-1.325l-0.343-1.052-3.671-0.918c-0.231-0.052-0.398-0.139-0.485-0.2v-1.86c0.001 0.001 0.002 0.001 0.005 0.001 0.034 0 0.198-0.117 0.335-0.142l3.772-0.835 0.346-1.103c0.141-0.449 0.333-0.917 0.588-1.43l0.487-0.98-2.024-3.373c-0.125-0.201-0.184-0.38-0.201-0.485l1.315-1.314c0.128 0.041 0.271 0.093 0.34 0.14l3.354 2.138 1.027-0.542c0.527-0.278 1.073-0.507 1.622-0.682l1.063-0.338 0.912-3.649c0.053-0.231 0.138-0.398 0.2-0.485h1.859c-0.014 0.020 0.115 0.195 0.142 0.339l0.84 3.794 1.089 0.352c0.511 0.165 1.023 0.38 1.523 0.639l1.023 0.532 3.224-2.053c0.135-0.092 0.279-0.143 0.409-0.143l1.313 1.276c-0.017 0.104-0.072 0.276-0.181 0.45l-1.98 3.296 0.505 0.988c0.273 0.533 0.48 1.033 0.635 1.529l0.346 1.104 3.697 0.82c0.224 0.041 0.398 0.171 0.434 0.241zM16.013 9.99c-3.321 0-6.023 2.697-6.023 6.010s2.702 6.010 6.023 6.010 6.023-2.697 6.023-6.009c0-3.313-2.702-6.010-6.023-6.010zM16 20c-2.205 0-4-1.794-4-4s1.794-4 4-4c2.206 0 4 1.794 4 4s-1.794 4-4 4z"/>
</svg>`;
