import { Injectable } from '@angular/core';
import { IService } from '../models/service.model';

@Injectable({
  providedIn: 'root',
})
export class CloudService {
  private jsonUrl = 'https://api.jsonbin.io/v3/b/67ceef198561e97a50e96354';

  constructor() {}

  async loadServices(): Promise<IService[]> {
    try {
      const response = await fetch(this.jsonUrl, {
        method: 'GET',
      });

      if (!response.ok) {
        throw new Error('Failed to fetch data from the cloud');
      }

      const data = await response.json();
      return data.record;
    } catch (error) {
      console.error('Error loading services:', error);
      return [];
    }
  }
}
