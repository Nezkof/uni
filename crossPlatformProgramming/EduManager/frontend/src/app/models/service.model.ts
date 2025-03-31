export interface IService {
  id: string;
  userId: string;
  getTitle(): string;
  getDescription(): string;
  getPrice(): number;
  getDuration(): number;
  getDetails(): any;
  getType(): string;
  getRating(): number;
  setType(type: string): void;
}
