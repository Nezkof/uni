import { IService } from './service.model';

export interface IConsultation extends IService {
  getExpert(): string;
}

export class Consultation implements IConsultation {
  private id: string;
  private title: string;
  private description: string;
  private price: number;
  private duration: number;
  private expert: string;

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
    this.expert = expert;
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

  getDetails(): {
    title: string;
    description: string;
    price: number;
    duration: number;
    expert: string;
  } {
    return {
      title: this.getTitle(),
      description: this.getDescription(),
      price: this.getPrice(),
      duration: this.getDuration(),
      expert: this.getExpert(),
    };
  }
}
