import { Component, OnInit } from '@angular/core';
import { UserDataService } from '../services/user-data.service';
import { IService } from '../models/service.model';
import { combineLatest, map, Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { ServiceSelectorComponent } from '../components/service-selector/service-selector.component';
import { EditFormComponent } from '../forms/edit-form/edit-form.component';
import { FormComponent } from '../forms/form/form.component';
import { SortByRatingPipe } from '../pipes/sort-by-rating.pipe';
import { SortingService } from '../services/sorting.service';
import { DurationPipe } from '../pipes/duration.pipe';

@Component({
  selector: 'app-client-home',
  templateUrl: './client-home.component.html',
  styleUrls: ['./client-home.component.scss'],
  imports: [
    CommonModule,
    IonicModule,
    FormComponent,
    EditFormComponent,
    ServiceSelectorComponent,
    SortByRatingPipe,
    DurationPipe,
  ],
  standalone: true,
})
export class ClientHomeComponent implements OnInit {
  services$: Observable<IService[]>;
  selectedServiceTypes!: string[];
  searchText: string = '';

  isAscending: boolean = true;

  constructor(
    private userDataService: UserDataService,
    private sortingService: SortingService
  ) {
    this.sortingService.isAscending$.subscribe((isAscending) => {
      this.isAscending = isAscending;
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

  ngOnInit() {}

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
