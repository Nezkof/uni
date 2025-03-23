import { Injectable, OnInit } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { IService } from '../models/service.model';
import { FirestoreService } from './firestore.service';
import { ServiceFactory } from '../factories/service.factory';

interface UserData {
  serviceTypes: string[];
  selectedServiceTypes: string[];
  services: IService[];
  inputFilter: string;
  selectedService: IService | null;
}

@Injectable({
  providedIn: 'root',
})
export class UserDataService {
  private userDataSubject = new BehaviorSubject<UserData>({
    serviceTypes: ['course', 'consultation', 'seminar', 'training'],
    selectedServiceTypes: [],
    services: [],
    inputFilter: '',
    selectedService: null,
  });
  userData$: Observable<UserData> = this.userDataSubject.asObservable();

  constructor(private firestoreService: FirestoreService) {
    this.fetchData();
  }

  public addService(newService: IService): void {
    const currentData = this.userDataSubject.value;
    const updatedServices = [...currentData.services, newService];
    this.userDataSubject.next({
      ...currentData,
      services: updatedServices,
    });

    const serviceDataPlain = { type: newService.getType(), ...newService };
    this.firestoreService.addItem(serviceDataPlain);
  }

  private fetchData(): void {
    this.firestoreService.getItems().subscribe(
      (data) => {
        const services = data.map((service) => {
          const serviceData = { ...service, id: service['id'] };

          return ServiceFactory.createService(service['type'], serviceData);
        });

        this.userDataSubject.next({
          ...this.userDataSubject.value,
          services,
        });

        console.log('Fetched Services:', services);
      },
      (error) => {
        console.error('Error fetching services:', error);
      }
    );
  }

  deleteService(service: IService): void {
    const currentData = this.userDataSubject.value;
    const updatedServices = currentData.services.filter(
      (s) => s.id !== service.id
    );

    this.userDataSubject.next({
      ...currentData,
      services: updatedServices,
    });

    this.firestoreService.deleteItem(Number(service.id));
  }

  public setInputFilter(inputFilter: string): void {
    const currentData = this.userDataSubject.value;
    this.userDataSubject.next({
      ...currentData,
      inputFilter,
    });
  }

  public setSelectedServiceType(service: string) {
    const currentData = this.userDataSubject.value;

    let updatedSelectedServiceTypes: string[];

    if (currentData.selectedServiceTypes.includes(service)) {
      updatedSelectedServiceTypes = currentData.selectedServiceTypes.filter(
        (type) => type !== service
      );
    } else {
      updatedSelectedServiceTypes = [
        ...currentData.selectedServiceTypes,
        service,
      ];
    }

    this.userDataSubject.next({
      ...currentData,
      selectedServiceTypes: updatedSelectedServiceTypes,
    });
  }

  public setSelectedService(service: IService) {
    const currentData = this.userDataSubject.value;
    this.userDataSubject.next({
      ...currentData,
      selectedService: service,
    });
  }

  public updateService(updatedService: IService) {
    this.userDataSubject.next({
      ...this.userDataSubject.value,
      services: this.userDataSubject.value.services.map((service) =>
        service.id === updatedService.id ? updatedService : service
      ),
      selectedService: null,
    });
  }

  public get getUserData$() {
    return this.userData$;
  }

  public get getSelectedServiceType() {
    return this.userDataSubject.value.selectedServiceTypes;
  }
}
