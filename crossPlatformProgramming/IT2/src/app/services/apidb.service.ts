import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class APIDBService {
  constructor(private httpClient: HttpClient) {}

  getData(url: string) {
    return this.httpClient.get(url);
  }
}
