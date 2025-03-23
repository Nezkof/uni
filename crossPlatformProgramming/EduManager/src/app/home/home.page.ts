import { Component, OnDestroy, OnInit, Signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormComponent } from '../forms/form/form.component';
import { EditFormComponent } from '../forms/edit-form/edit-form.component';
import { ServiceSelectorComponent } from '../components/service-selector/service-selector.component';
import { UserDataService } from '../services/user-data.service';
import { map, Observable } from 'rxjs';
import { IService } from '../models/service.model';

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

    this.services$ = this.userDataService.getUserData$.pipe(
      map((userData) => userData.services)
    );
  }

  filterServices(services: any[]): any[] {
    if (!this.searchText.trim()) {
      return services;
    }

    return services.filter((service) =>
      service.title.toLowerCase().includes(this.searchText.toLowerCase())
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
}
