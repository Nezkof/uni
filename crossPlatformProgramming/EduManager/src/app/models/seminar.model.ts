import { IService } from './service.model';

export interface IConsultation extends IService {
  getLector(): string;
}

export class Seminar implements IConsultation {
  private id: string;
  private title: string;
  private description: string;
  private price: number;
  private duration: number;
  private lector: string;

  constructor(
    id: string,
    title: string,
    description: string,
    price: number,
    duration: number,
    expert: string
  ) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.price = price;
    this.duration = duration;
    this.lector = expert;
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

  getDetails(): {
    title: string;
    description: string;
    price: number;
    duration: number;
    lector: string;
  } {
    return {
      title: this.getTitle(),
      description: this.getDescription(),
      price: this.getPrice(),
      duration: this.getDuration(),
      lector: this.getLector(),
    };
  }
}
