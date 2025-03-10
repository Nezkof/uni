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

  getDetails(): string {
    return `
    <ul>
      <li>Title: ${this.getTitle()}</li>
      <li>Description: ${this.getDescription()}</li>
      <li>Price: ${this.getPrice()}</li>
      <li>Duration: ${this.getDuration()} hours</li>
      <li>Expert: ${this.getExpert()} </li> 
    </ul>
  `;
  }
}
