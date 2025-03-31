import { Injectable } from '@angular/core';
import { IService } from '../models/service.model';
import { Course } from '../models/course.model';
import { Training } from '../models/training.model';
import { Consultation } from '../models/consultation.model';
import { Seminar } from '../models/seminar.model';
import { BehaviorSubject, Observable } from 'rxjs';
import { Default } from '../models/default.model';

export enum ServiceTypeEnum {
  Course = 'course',
  Training = 'training',
  Consultation = 'consultation',
  Seminar = 'seminar',
}

@Injectable({
  providedIn: 'root',
})
export class ServiceFactory {
  static createService(
    type: ServiceTypeEnum,
    userId: string,
    data: any
  ): IService {
    let service: IService;

    console.log(data);

    switch (type) {
      case ServiceTypeEnum.Course:
        service = new Course(
          data.id,
          userId,
          data.title,
          data.description,
          data.price,
          data.duration,
          type,
          data.rating
        );
        break;
      case ServiceTypeEnum.Training:
        service = new Training(
          data.id,
          userId,
          data.title,
          data.description,
          data.price,
          data.duration,
          data.level,
          type,
          data.rating
        );
        break;
      case ServiceTypeEnum.Consultation:
        service = new Consultation(
          data.id,
          userId,
          data.title,
          data.description,
          data.price,
          data.duration,
          data.expert,
          type,
          data.rating
        );
        break;
      case ServiceTypeEnum.Seminar:
        service = new Seminar(
          data.id,
          userId,
          data.title,
          data.description,
          data.price,
          data.duration,
          data.lector,
          type,
          data.rating
        );
        break;
      default:
        service = new Default(
          data.id,
          userId,
          data.title,
          data.description,
          data.price,
          data.duration,
          type,
          data.rating
        );
    }

    return service;
  }
}
