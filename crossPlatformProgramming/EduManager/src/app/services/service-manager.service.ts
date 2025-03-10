import { Injectable, Signal, signal, WritableSignal } from '@angular/core';
import { IService } from '../models/service.model';
import { ServiceFactory, ServiceType } from '../factories/service.factory';

@Injectable({
  providedIn: 'root',
})
export class ServiceManager {
  private services: WritableSignal<IService[]> = signal<IService[]>([]);

  constructor(private serviceFactory: ServiceFactory) {}

  getAllServices(): Signal<IService[]> {
    return this.services;
  }

  addService(type: ServiceType, data: any): void {
    const service = this.serviceFactory.createService(type, data);
    this.services.update((s) => [...s, service]);
  }

  removeService(id: string): void {
    this.services.update((s) => s.filter((service) => service.getId() !== id));
  }
}
