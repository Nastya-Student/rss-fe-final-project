import { EVENT } from "../../constants";

export const goBackHandler = (resultBlock: HTMLElement): void => {
  const goBackButton = document.querySelector(""); // add id to this button
  if (!goBackButton) {
    return;
  }
  goBackButton.addEventListener(EVENT.click, () => {
    resultBlock.remove();
  });
};
