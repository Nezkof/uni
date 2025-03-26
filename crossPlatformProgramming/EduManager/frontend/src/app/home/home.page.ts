import { Component, OnDestroy, OnInit, Signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormComponent } from '../forms/form/form.component';
import { EditFormComponent } from '../forms/edit-form/edit-form.component';
import { ServiceSelectorComponent } from '../components/service-selector/service-selector.component';
import { UserDataService } from '../services/user-data.service';
import { combineLatest, map, Observable } from 'rxjs';
import { IService } from '../models/service.model';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [
    CommonModule,
    IonicModule,
    FormComponent,
    EditFormComponent,
    ServiceSelectorComponent,
  ],
})
export class HomePage implements OnInit {
  services$: Observable<IService[]>;
  selectedServiceTypes!: string[];
  searchText: string = '';
  selectedService!: IService | null;

  constructor(private userDataService: UserDataService) {
    this.userDataService.getUserData$.subscribe((userData) => {
      this.selectedServiceTypes = userData.selectedServiceTypes;
      this.searchText = userData.inputFilter;
      this.selectedService = userData.selectedService;
    });

    this.services$ = combineLatest([this.userDataService.getUserData$]).pipe(
      map(([userData]) => {
        let filteredServices = userData.services;

        if (userData.selectedServiceTypes.length) {
          filteredServices = filteredServices.filter((service) =>
            userData.selectedServiceTypes
              .map((type) => type.toLowerCase())
              .includes(service.getType().toLowerCase())
          );
        }

        if (userData.inputFilter.trim()) {
          filteredServices = filteredServices.filter((service) =>
            service
              .getTitle()
              .toLowerCase()
              .includes(userData.inputFilter.toLowerCase())
          );
        }

        return filteredServices;
      })
    );
  }

  ngOnInit(): void {}

  onSelectService(service: IService): void {
    this.userDataService.setSelectedService(service);
    console.log('Service selected:', service);
  }

  onDeleteService(service: IService): void {
    console.log('Delete service:', service);
    this.userDataService.deleteService(service);
  }

  login() {
    this.userDataService.loginUser();
  }

  logout() {
    this.userDataService.logoutUser();
  }

  isLogged() {
    return !!this.userDataService.getUserSubject().value;
  }
}
