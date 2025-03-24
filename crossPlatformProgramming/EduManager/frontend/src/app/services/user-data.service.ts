import { Injectable, OnInit } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { IService } from '../models/service.model';
import { FirestoreService } from './firestore.service';
import { ServiceFactory } from '../factories/service.factory';
import { AuthService } from './auth.service';
import { ServiceType } from '../models/serviceType.model';

export interface UserData {
  //   user: string | null;
  serviceTypes: ServiceType[];
  selectedServiceTypes: string[];
  services: IService[];
  inputFilter: string;
  selectedService: IService | null;
}

@Injectable({
  providedIn: 'root',
})
export class UserDataService {
  private userSubject = new BehaviorSubject<string | null>(null);

  private userDataSubject = new BehaviorSubject<UserData>({
    serviceTypes: [],
    selectedServiceTypes: [],
    services: [],
    inputFilter: '',
    selectedService: null,
  });
  userData$: Observable<UserData> = this.userDataSubject.asObservable();

  constructor(
    private firestoreService: FirestoreService,
    private authService: AuthService
  ) {
    this.userSubject.subscribe((user) => {
      console.log('User updated:', user);
      if (user) {
        this.fetchData(user);
      }
    });
  }

  loginUser() {
    this.authService.signInWithGoogle().subscribe({
      next: (user) => {
        const userId = this.authService.getCurrentUser()?.uid;
        if (userId) {
          this.userSubject.next(userId);
        }

        console.log('User logged in:', this.userSubject.value);
      },
      error: (err) => console.error('Login failed:', err),
    });
  }

  logoutUser() {
    this.authService.signOut().subscribe({
      next: () => {
        const userId = this.authService.getCurrentUser()?.uid;
        if (userId) {
          this.userSubject.next(null);
        }

        console.log('User logged out');
      },
      error: (err) => console.error('Logout failed:', err),
    });
  }

  createServiceType() {
    const userId = this.userSubject.value;
    if (!userId) return;

    let newServiceTypes = this.userDataSubject.value.serviceTypes;
    const newServiceType = new ServiceType(userId, 'New Type');
    newServiceTypes.push(newServiceType);

    this.userDataSubject.next({
      ...this.userDataSubject.value,
      serviceTypes: newServiceTypes,
    });

    const serviceTypeDataPlain = newServiceType.getPlainData();
    this.firestoreService.addServiceTypeItem(serviceTypeDataPlain);
  }

  deleteServiceType(id: string) {
    const currentData = this.userDataSubject.value;
    const deleteTypeName = currentData.serviceTypes
      .filter((s) => s.getId() === id)[0]
      .getName();

    const updatedServiceTypes = currentData.serviceTypes.filter(
      (s) => s.getId() !== id
    );

    const updatedServices = currentData.services.filter(
      (service) =>
        service.getType().toLowerCase() !== deleteTypeName.toLocaleLowerCase()
    );

    const updatedDBServices = currentData.services.filter(
      (service) =>
        service.getType().toLowerCase() === deleteTypeName.toLocaleLowerCase()
    );

    this.userDataSubject.next({
      ...currentData,
      serviceTypes: updatedServiceTypes,
      services: updatedServices,
    });

    this.firestoreService.deleteServiceTypeItem(id).subscribe({
      next: () => {
        console.log('ServiceType deleted from Firebase');
      },
      error: (error) => {
        console.error('Error deleting serviceType:', error.message);
      },
    });

    console.log(updatedServices);

    updatedDBServices.forEach((service) => {
      this.firestoreService.deleteItem(service.id).subscribe({
        next: () => console.log(`Service ${service.id} deleted from Firebase`),
        error: (error) =>
          console.error(`Error deleting service ${service.id}:`, error.message),
      });
    });
  }

  public updateServiceType(serviceType: ServiceType, oldName: string) {
    const updatedServices = this.userDataSubject.value.services.map(
      (service) => {
        if (service.getType().toLowerCase() === oldName.toLocaleLowerCase()) {
          console.log('if');
          service.setType(serviceType.getName());
        }

        const serviceDataPlain = {
          type: service.getType(),
          ...service,
        };

        this.firestoreService
          .updateItem(serviceDataPlain.id.toString(), serviceDataPlain)
          .subscribe({
            next: () => console.log('Service updated in Firebase'),
            error: (error) => console.error('Error updating service:', error),
          });

        return service;
      }
    );

    this.userDataSubject.next({
      ...this.userDataSubject.value,
      services: updatedServices,
    });

    this.userDataSubject.next({
      ...this.userDataSubject.value,
      serviceTypes: this.userDataSubject.value.serviceTypes.map((st) =>
        st.getId() === serviceType.getId() ? serviceType : st
      ),
    });

    const serviceDataPlain = serviceType.getPlainData();

    this.firestoreService
      .updateServiceTypeItem(serviceDataPlain.id, serviceDataPlain)
      .subscribe({
        next: () => console.log('ServiceType updated in Firebase'),
        error: (error) => console.error('Error updating ServiceType:', error),
      });
  }

  private fetchData(user: string): void {
    this.firestoreService.getServiceTypesItems().subscribe(
      (data) => {
        const serviceTypes = data
          .filter((serviceType) => serviceType['userId'] === user)
          .map((serviceType) => {
            return new ServiceType(
              serviceType['userId'],
              serviceType['name'],
              serviceType['id']
            );
          });

        this.userDataSubject.next({
          ...this.userDataSubject.value,
          serviceTypes,
        });

        console.log('Fetched ServiceTypes for user:', serviceTypes);
      },
      (error) => {
        console.error('Error fetching service types:', error);
      }
    );

    this.firestoreService.getItems().subscribe(
      (data) => {
        const user = this.userSubject.value;

        if (!user) return;

        const services = data
          .filter((service) => service['userId'] === user)
          .map((service) => {
            const serviceData = { ...service, id: service['id'] };

            return ServiceFactory.createService(
              service['type'],
              user,
              serviceData
            );
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

  public updateService(updatedService: IService) {
    this.userDataSubject.next({
      ...this.userDataSubject.value,
      services: this.userDataSubject.value.services.map((service) =>
        service.id === updatedService.id ? updatedService : service
      ),
      selectedService: null,
    });

    const serviceDataPlain = {
      type: updatedService.getType(),
      ...updatedService,
    };

    this.firestoreService
      .updateItem(serviceDataPlain.id.toString(), serviceDataPlain)
      .subscribe({
        next: () => console.log('Service updated in Firebase'),
        error: (error) => console.error('Error updating service:', error),
      });
  }

  public deleteService(service: IService): void {
    const currentData = this.userDataSubject.value;
    const updatedServices = currentData.services.filter(
      (s) => s.id !== service.id
    );

    this.userDataSubject.next({
      ...currentData,
      services: updatedServices,
    });

    this.firestoreService.deleteItem(service.id).subscribe({
      next: () => console.log('Service deleted from Firebase'),
      error: (error) => console.error('Error deleting service:', error.message),
    });
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

  public get getUserData$() {
    return this.userData$;
  }

  public getUserDataSubject() {
    return this.userDataSubject;
  }

  public getUserSubject() {
    return this.userSubject;
  }

  public get getSelectedServiceType() {
    return this.userDataSubject.value.selectedServiceTypes;
  }
}
