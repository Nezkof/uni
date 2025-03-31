import { IService } from './service.model';

export interface IConsultation extends IService {
  getExpert(): string;
}

export class Consultation implements IConsultation {
  public id: string;
  public userId: string;
  private title: string;
  private description: string;
  private price: number;
  private duration: number;
  private expert: string;
  private rating: number;
  private type: string;

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
    this.expert = expert;
    this.type = type;
    this.rating = rating;
  }

  getRating(): number {
    return this.rating;
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

  getExpert(): string {
    return this.expert;
  }

  getType() {
    return this.type;
  }

  setType(type: string) {
    this.type = type;
  }

  getDetails(): {
    title: string;
    description: string;
    price: number;
    duration: number;
    expert: string;
    rating: number;
  } {
    return {
      title: this.getTitle(),
      description: this.getDescription(),
      price: this.getPrice(),
      duration: this.getDuration(),
      expert: this.getExpert(),
      rating: this.getRating(),
    };
  }
}
