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
  private servicesSubject = new BehaviorSubject<IService[]>([]);

  get services$(): Observable<IService[]> {
    return this.servicesSubject.asObservable();
  }

  addService(newService: IService) {
    this.servicesSubject.next([...this.servicesSubject.getValue(), newService]);
  }

  createService(type: ServiceType, data: any): IService {
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

  updateService(updatedService: IService): void {
    const services = this.servicesSubject.getValue();
    const serviceIndex = services.findIndex(
      (service) => service.id === updatedService.id
    );

    if (serviceIndex !== -1) {
      services[serviceIndex] = updatedService;

      this.servicesSubject.next([...services]);
    } else {
      console.warn('Service not found for update');
    }
  }
}
