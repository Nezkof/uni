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

import { ServiceFactory, ServiceType } from 'src/app/factories/service.factory';

import { IService } from 'src/app/models/service.model';

import { Firestore } from '@angular/fire/firestore';
import { FirestoreService } from 'src/app/services/firestore.service';
import { UserDataService } from 'src/app/services/user-data.service';

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
  selectedType: string = '';

  constructor(
    private fb: FormBuilder,
    private titleValidator: TitleValidatorService,
    private priceValidator: PriceValidatorService,
    private serviceFactory: ServiceFactory,
    private userDataService: UserDataService
  ) {}

  ngOnInit() {
    this.courseForm = this.fb.group({
      title: ['', this.titleValidator.validateTitle()],
      description: ['', [Validators.required, Validators.minLength(5)]],
      price: [null, this.priceValidator.validatePrice()],
      duration: [null, [Validators.required, Validators.min(1)]],
      type: ['Course'],
      additionalFields: this.fb.array([]),
    });

    this.courseForm.reset({
      title: 'title',
      description: 'description',
      price: 1,
      duration: 2,
      type: 'Course',
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

    if (type === 'Consultation') {
      this.additionalFields.push(
        this.fb.group({
          expert: ['', [Validators.required, Validators.minLength(1)]],
        })
      );
    } else if (type === 'Seminar') {
      this.additionalFields.push(
        this.fb.group({
          lector: ['', [Validators.required, Validators.minLength(1)]],
        })
      );
    } else if (type === 'Training') {
      this.additionalFields.push(
        this.fb.group({
          level: ['', [Validators.required, Validators.minLength(1)]],
        })
      );
    }
  }

  async onSubmit() {
    if (this.courseForm.valid) {
      const formValue = this.courseForm.value;
      const serviceType = formValue.type.toLowerCase() as ServiceType;

      const additionalData = this.additionalFields.controls[0]?.value || {};
      const serviceData = {
        id: Date.now(),
        ...formValue,
        ...additionalData,
      };

      try {
        const newService: IService = ServiceFactory.createService(
          serviceType,
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
