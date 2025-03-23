import { Injectable } from '@angular/core';
import { IService } from '../models/service.model';
import { Course } from '../models/course.model';
import { Training } from '../models/training.model';
import { Consultation } from '../models/consultation.model';
import { Seminar } from '../models/seminar.model';
import { BehaviorSubject, Observable } from 'rxjs';

export enum ServiceType {
  Course = 'course',
  Training = 'training',
  Consultation = 'consultation',
  Seminar = 'seminar',
}

@Injectable({
  providedIn: 'root',
})
export class ServiceFactory {
  static createService(type: ServiceType, data: any): IService {
    let service: IService;

    switch (type) {
      case ServiceType.Course:
        service = new Course(
          data.id,
          data.title,
          data.description,
          data.price,
          data.duration
        );
        break;
      case ServiceType.Training:
        service = new Training(
          data.id,
          data.title,
          data.description,
          data.price,
          data.duration,
          data.level
        );
        break;
      case ServiceType.Consultation:
        service = new Consultation(
          data.id,
          data.title,
          data.description,
          data.price,
          data.duration,
          data.expert
        );
        break;
      case ServiceType.Seminar:
        service = new Seminar(
          data.id,
          data.title,
          data.description,
          data.price,
          data.duration,
          data.lector
        );
        break;
      default:
        throw new Error('Unknown service type');
    }

    return service;
  }
}
