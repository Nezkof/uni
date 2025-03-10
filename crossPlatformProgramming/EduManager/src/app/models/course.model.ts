import { IService } from './service.model';

export interface ICourse extends IService {}

export class Course implements ICourse {
  private id: string;
  private title: string;
  private description: string;
  private price: number;
  private duration: number;

  constructor(
    id: string,
    title: string,
    description: string,
    price: number,
    duration: number
  ) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.price = price;
    this.duration = duration;
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

  getDetails(): string {
    return `
     <ul>
       <li>Title: ${this.getTitle()}</li>
       <li>Description: ${this.getDescription()}</li>
       <li>Price: $${this.getPrice()}</li>
       <li>Duration: ${this.getDuration()} hours</li>
     </ul>
   `;
  }
}
