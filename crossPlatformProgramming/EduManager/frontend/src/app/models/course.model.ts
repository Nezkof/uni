import { IService } from './service.model';

export interface ICourse extends IService {}

export class Course implements ICourse {
  public id: string;
  public userId: string;
  private title: string;
  private description: string;
  private price: number;
  private duration: number;
  private rating: number;
  private type: string;

  constructor(
    id: string,
    userId: string,
    title: string,
    description: string,
    price: number,
    duration: number,
    type: string,
    rating: number
  ) {
    this.id = id;
    this.userId = userId;
    this.title = title;
    this.description = description;
    this.price = price;
    this.duration = duration;
    this.rating = rating;
    this.type = type;
  }

  getRating(): number {
    return this.rating;
  }

  setType(type: string) {
    this.type = type;
  }

  getId(): string {
    return this.id;
  }

  getTitle(): string {
    return this.title;
  }

  getDescription(): string {
    return this.description;
  }

  getPrice(): number {
    return this.price;
  }

  getDuration(): number {
    return this.duration;
  }

  getType() {
    return this.type;
  }

  getDetails(): {
    title: string;
    description: string;
    price: number;
    duration: number;
    rating: number;
  } {
    return {
      title: this.getTitle(),
      description: this.getDescription(),
      price: this.getPrice(),
      duration: this.getDuration(),
      rating: this.getRating(),
    };
  }
}
