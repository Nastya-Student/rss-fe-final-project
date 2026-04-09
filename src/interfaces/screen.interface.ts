export interface Screen {
  create(parent: HTMLElement): void;
  show(params?: Record<string, string>): void;
  hide(): void;
}
