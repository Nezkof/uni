import { CommonModule } from '@angular/common';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
  FormArray,
} from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { TitleValidatorService } from 'src/app/services/title-validator.service';
import { PriceValidatorService } from 'src/app/services/price-validator.service';

import {
  ServiceFactory,
  ServiceTypeEnum,
} from 'src/app/factories/service.factory';

import { IService } from 'src/app/models/service.model';

import { Firestore } from '@angular/fire/firestore';
import { FirestoreService } from 'src/app/services/firestore.service';
import { UserData, UserDataService } from 'src/app/services/user-data.service';
import { ServiceType } from 'src/app/models/serviceType.model';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
  standalone: true,
  imports: [IonicModule, ReactiveFormsModule, CommonModule],
})
export class FormComponent implements OnInit {
  @Output() serviceCreated = new EventEmitter<IService>();
  courseForm!: FormGroup;
  selectedType: ServiceType | null = null;

  userId: string | null = null;
  userData: UserData | null = null;

  constructor(
    private fb: FormBuilder,
    private titleValidator: TitleValidatorService,
    private priceValidator: PriceValidatorService,
    private userDataService: UserDataService
  ) {
    this.userDataService.getUserDataSubject().subscribe((data) => {
      this.userData = data;
    });

    this.userDataService.getUserSubject().subscribe((data) => {
      this.userId = data;
    });
  }

  ngOnInit() {
    this.courseForm = this.fb.group({
      title: ['', this.titleValidator.validateTitle()],
      description: ['', [Validators.required, Validators.minLength(5)]],
      price: [null, this.priceValidator.validatePrice()],
      duration: [null, [Validators.required, Validators.min(1)]],
      type: null,
      additionalFields: this.fb.array([]),
    });

    this.courseForm.reset({
      title: 'title',
      description: 'description',
      price: 1,
      duration: 2,
      type: null,
      additionalFields: [],
    });

    this.courseForm.get('type')?.valueChanges.subscribe((value) => {
      this.selectedType = value;

      this.toggleFields();
    });

    this.selectedType = this.courseForm.get('type')?.value;
  }

  get additionalFields(): FormArray {
    return this.courseForm.get('additionalFields') as FormArray;
  }

  toggleFields() {
    const type = this.selectedType;
    this.additionalFields.clear();

    if (type?.getName() === 'Consultation') {
      this.additionalFields.push(
        this.fb.group({
          expert: ['', [Validators.required, Validators.minLength(1)]],
        })
      );
    } else if (type?.getName() === 'Seminar') {
      this.additionalFields.push(
        this.fb.group({
          lector: ['', [Validators.required, Validators.minLength(1)]],
        })
      );
    } else if (type?.getName() === 'Training') {
      this.additionalFields.push(
        this.fb.group({
          level: ['', [Validators.required, Validators.minLength(1)]],
        })
      );
    }
  }

  async onSubmit() {
    if (this.courseForm.valid && this.userId) {
      const formValue = this.courseForm.value;

      const serviceType = formValue.type?.getName().toLowerCase();

      const additionalData = this.additionalFields.controls[0]?.value || {};
      const serviceData = {
        id: String(Date.now()),
        ...formValue,
        ...additionalData,
      };

      try {
        const newService: IService = ServiceFactory.createService(
          serviceType,
          this.userId,
          serviceData
        );

        this.userDataService.addService(newService);

        this.serviceCreated.emit(newService);

        this.courseForm.reset({
          title: '',
          description: '',
          price: null,
          duration: null,
          type: 'Course',
          additionalFields: [],
        });
      } catch (error) {
        console.error('Error adding service to Firestore:', error);
      }
    } else {
      console.log('Form has errors:', this.courseForm.errors);
    }
  }

  isInvalid(controlName: string): boolean {
    const control =
      this.courseForm.get(controlName) ||
      this.additionalFields.controls[0]?.get(controlName);
    return !!(control && control.invalid && (control.dirty || control.touched));
  }
}
