import { API_BASE_URL, isMockData } from "../config/api.config.js";

export abstract class BaseDataService<T> {
  protected abstract endpoint: string;
  protected abstract mockData: unknown;
  protected abstract isValid(data: unknown): data is T[];

  protected async getAll(): Promise<T[] | undefined> {
    if (isMockData()) {
      if (this.isValid(this.mockData)) {
        return this.mockData;
      }
      return;
    }

    const response = await fetch(`${API_BASE_URL}/${this.endpoint}`);
    const data: unknown = await response.json();

    if (this.isValid(data)) {
      return data;
    }

    return;
  }
}
