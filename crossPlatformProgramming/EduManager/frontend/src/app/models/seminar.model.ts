import { IService } from './service.model';

export interface IConsultation extends IService {
  getLector(): string;
}

export class Seminar implements IConsultation {
  public id: string;
  public userId: string;
  private title: string;
  private description: string;
  private price: number;
  private duration: number;
  private lector: string;
  private type: string;
  private rating: number;

  constructor(
    id: string,
    userId: string,
    title: string,
    description: string,
    price: number,
    duration: number,
    expert: string,
    type: string,
    rating: number
  ) {
    this.id = id;
    this.userId = userId;
    this.title = title;
    this.description = description;
    this.price = price;
    this.duration = duration;
    this.lector = expert;
    this.type = type;
    this.rating = rating;
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

  getLector(): string {
    return this.lector;
  }

  getType() {
    return this.type;
  }

  getDetails(): {
    title: string;
    description: string;
    price: number;
    duration: number;
    lector: string;
    rating: number;
  } {
    return {
      title: this.getTitle(),
      description: this.getDescription(),
      price: this.getPrice(),
      duration: this.getDuration(),
      lector: this.getLector(),
      rating: this.getRating(),
    };
  }
}
