import { IService } from './service.model';

export interface ITraining extends IService {
  getLevel(): string;
}

export class Training implements ITraining {
  public id: string;
  public userId: string;
  private title: string;
  private description: string;
  private price: number;
  private duration: number;
  private level: string;
  private type: string;

  constructor(
    id: string,
    userId: string,
    title: string,
    description: string,
    price: number,
    duration: number,
    level: string,
    type: string
  ) {
    this.id = id;
    this.userId = userId;
    this.title = title;
    this.description = description;
    this.price = price;
    this.duration = duration;
    this.level = level;
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

  getLevel(): string {
    return this.level;
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
    level: string;
  } {
    return {
      title: this.getTitle(),
      description: this.getDescription(),
      price: this.getPrice(),
      duration: this.getDuration(),
      level: this.getLevel(),
    };
  }
}
