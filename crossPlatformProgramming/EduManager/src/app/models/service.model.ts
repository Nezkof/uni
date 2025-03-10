export interface IService {
  getId(): string;
  getTitle(): string;
  getDescription(): string;
  getPrice(): number;
  getDuration(): number;
  getDetails(): string;
}
