import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Observable } from 'rxjs';
import { UserDataService } from 'src/app/services/user-data.service';

@Component({
  selector: 'app-service-selector',
  templateUrl: './service-selector.component.html',
  styleUrls: ['./service-selector.component.scss'],
  imports: [IonicModule, ReactiveFormsModule, CommonModule, FormsModule],
})
export class ServiceSelectorComponent implements OnInit {
  userData$: Observable<any>;
  selectedServiceTypes!: string[];
  searchText: string = '';

  constructor(private userDataService: UserDataService) {
    this.userData$ = this.userDataService.getUserData$;
    this.userDataService.getUserData$.subscribe((userData) => {
      this.selectedServiceTypes = userData.selectedServiceTypes;
    });
  }

  onSearchChange() {
    this.userDataService.setInputFilter(this.searchText);
  }

  ngOnInit() {
    console.log('ServiceSelectorComponent ngOnInit called');
  }

  onButtonClick(service: string) {
    this.userDataService.setSelectedServiceType(service);
  }
}
