import { Component, OnInit } from '@angular/core';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
} from '@ionic/angular/standalone';
import { Client } from '../models/Client';
import { APIDBService } from '../services/apidb.service';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [CommonModule, IonicModule],
})
export class HomePage implements OnInit {
  private db_url: string = `http://localhost:8000/clients`;
  private message: any;
  clients: Client[] = new Array();

  constructor(private apiService: APIDBService) {}

  ngOnInit() {
    this.apiService.getData(this.db_url).subscribe((data) => {
      this.clients = new Array();
      this.message = data;
      this.clients = this.message;
      console.log(this.clients);
    });
  }
}
