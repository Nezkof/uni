import { Injectable, Signal, signal, WritableSignal } from '@angular/core';
import { IService } from '../models/service.model';
import { ServiceFactory, ServiceType } from '../factories/service.factory';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ServiceManager {
  private servicesSubject = new BehaviorSubject<IService[]>([]);

  constructor() {}

  get services$(): Observable<IService[]> {
    return this.servicesSubject.asObservable();
  }

  addService(newService: IService) {
    this.servicesSubject.next([...this.servicesSubject.getValue(), newService]);
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

  deleteService(id: string) {
    const services = this.servicesSubject.getValue();
    const updatedServices = services.filter((service) => service.id !== id);

    if (services.length !== updatedServices.length) {
      this.servicesSubject.next(updatedServices);
    } else {
      console.warn('Service not found for deletion');
    }
  }
}
