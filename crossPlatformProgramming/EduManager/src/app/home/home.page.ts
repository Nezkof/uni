import { Component, OnInit, Signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { IService } from '../models/service.model';
import { CloudService } from '../services/cloud.service';
import { ServiceFactory } from '../factories/service.factory';

@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [CommonModule, IonicModule],
})
export class HomePage implements OnInit {
  services: IService[] = [];

  constructor(
    private cloudService: CloudService,
    private serviceFactory: ServiceFactory
  ) {}

  ngOnInit(): void {
    this.loadServices();
  }

  async loadServices(): Promise<void> {
    const data = await this.cloudService.loadServices();
    data.forEach((element: any) => {
      const { type, ...data } = element;

      this.services.push(this.serviceFactory.createService(type, data));
    });

    console.log(this.services);
  }

  removeService(id: string): void {}
}
