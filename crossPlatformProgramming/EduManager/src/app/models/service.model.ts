export interface IService {
  id: string;
  getTitle(): string;
  getDescription(): string;
  getPrice(): number;
  getDuration(): number;
  getDetails(): any;
  getType(): string;
}
