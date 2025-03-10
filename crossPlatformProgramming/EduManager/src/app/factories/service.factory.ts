import { Injectable } from '@angular/core';
import { IService } from '../models/service.model';
import { Course } from '../models/course.model';
import { Training } from '../models/training.model';
import { Consultation } from '../models/consultation.model';
import { Seminar } from '../models/seminar.model';

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
  createService(type: ServiceType, data: any): IService {
    switch (type) {
      case ServiceType.Course:
        return new Course(
          data.id,
          data.title,
          data.description,
          data.price,
          data.duration
        );
      case ServiceType.Training:
        return new Training(
          data.id,
          data.title,
          data.description,
          data.price,
          data.duration,
          data.level
        );
      case ServiceType.Consultation:
        return new Consultation(
          data.id,
          data.title,
          data.description,
          data.price,
          data.duration,
          data.expert
        );
      case ServiceType.Seminar:
        return new Seminar(
          data.id,
          data.title,
          data.description,
          data.price,
          data.duration,
          data.lector
        );
      default:
        throw new Error('Unknown service type');
    }
  }
}
