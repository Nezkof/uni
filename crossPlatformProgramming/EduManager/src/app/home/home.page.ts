import { Component, OnDestroy, OnInit, Signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { IService } from '../models/service.model';
import { CloudService } from '../services/cloud.service';
import { ServiceFactory } from '../factories/service.factory';
import { FormComponent } from '../forms/form/form.component';
import { Observable, Subject, takeUntil } from 'rxjs';
import { EditFormComponent } from '../forms/edit-form/edit-form.component';
import { ServiceManager } from '../services/service-manager.service';

@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [CommonModule, IonicModule, FormComponent, EditFormComponent],
})
export class HomePage implements OnDestroy {
  private destroy$ = new Subject<void>();
  services$: Observable<IService[]>;
  selectedService: IService | null = null;

  constructor(private serviceManager: ServiceManager) {
    this.services$ = this.serviceManager.services$;
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  onSelectService(service: IService) {
    this.selectedService = service;
  }

  onServiceCreated(newService: IService) {
    console.log('New service added:', newService);
  }

  onServiceUpdated(updatedService: IService) {
    this.selectedService = null;
  }

  onDeleteService(service: IService) {
    this.serviceManager.deleteService(service.id);
  }
}
