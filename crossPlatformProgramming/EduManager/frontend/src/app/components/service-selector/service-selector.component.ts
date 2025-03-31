import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { user } from '@angular/fire/auth';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Observable } from 'rxjs';
import { IService } from 'src/app/models/service.model';
import { ServiceType } from 'src/app/models/serviceType.model';
import { UserDataService } from 'src/app/services/user-data.service';
import { AlertController } from '@ionic/angular';
import { SortByRatingPipe } from 'src/app/pipes/sort-by-rating.pipe';
import { SortingService } from 'src/app/services/sorting.service';

@Component({
  selector: 'app-service-selector',
  templateUrl: './service-selector.component.html',
  styleUrls: ['./service-selector.component.scss'],
  imports: [
    IonicModule,
    ReactiveFormsModule,
    CommonModule,
    FormsModule,
    SortByRatingPipe,
  ],
})
export class ServiceSelectorComponent implements OnInit {
  userData$: Observable<any>;
  selectedServiceTypes!: string[];
  searchText: string = '';

  constructor(
    private userDataService: UserDataService,
    private alertController: AlertController,
    private sortingService: SortingService
  ) {
    this.userData$ = this.userDataService.getUserData$;
    this.userDataService.getUserData$.subscribe((userData) => {
      this.selectedServiceTypes = userData.selectedServiceTypes;
    });
  }

  setAscending(isAscending: boolean) {
    this.sortingService.setSorting(isAscending);
  }

  onAddServiceTypeClick() {
    this.userDataService.createServiceType();
  }

  isServiceSelected(serviceName: string): boolean {
    return this.selectedServiceTypes.some(
      (type) => type.toLowerCase() === serviceName.toLowerCase()
    );
  }

  async onUpdateServiceTypeButtonClick(service: ServiceType) {
    const alert = await this.alertController.create({
      header: 'Оновити сервіс',
      inputs: [
        {
          name: 'newName',
          type: 'text',
          placeholder: 'Нова назва',
          value: service.getName(),
        },
      ],
      buttons: [
        {
          text: 'Скасувати',
          role: 'cancel',
        },
        {
          text: 'Зберегти',
          handler: (data) => {
            if (data.newName.trim()) {
              const oldName = service.getName();
              service.setName(data.newName.trim());
              this.userDataService.updateServiceType(service, oldName);
            }
          },
        },
      ],
    });

    await alert.present();
  }

  onDeleteServiceTypeButtonClick(service: ServiceType) {
    this.userDataService.deleteServiceType(service.getId());
  }

  onSearchChange() {
    this.userDataService.setInputFilter(this.searchText);
  }

  ngOnInit() {}

  onButtonClick(service: string) {
    this.userDataService.setSelectedServiceType(service);
  }
}
