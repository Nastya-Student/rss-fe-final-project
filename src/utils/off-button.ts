import { CLASS_NAME } from "../constants";

export function offButton(button: HTMLButtonElement): void {
  button.classList.add(CLASS_NAME.noActive);
  button.disabled = true;
}
