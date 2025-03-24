import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import {
  FormBuilder,
  FormGroup,
  FormArray,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import {
  ServiceFactory,
  ServiceTypeEnum,
} from 'src/app/factories/service.factory';
import { IService } from 'src/app/models/service.model';
import { UserData, UserDataService } from 'src/app/services/user-data.service';
import { ServiceType } from 'src/app/models/serviceType.model';

@Component({
  selector: 'app-edit-form',
  templateUrl: './edit-form.component.html',
  styleUrls: ['./edit-form.component.scss'],
  imports: [IonicModule, ReactiveFormsModule, CommonModule],
})
export class EditFormComponent implements OnInit {
  @Input() serviceToEdit: IService | null = null;
  @Output() serviceUpdated = new EventEmitter<IService>();

  editForm!: FormGroup;
  selectedType: ServiceType | null = null;

  userId: string | null = null;
  userData: UserData | null = null;

  constructor(
    private fb: FormBuilder,
    private userDataService: UserDataService
  ) {
    this.userDataService.getUserSubject().subscribe((data) => {
      this.userId = data;
    });

    this.userDataService.getUserDataSubject().subscribe((data) => {
      this.userData = data;
    });
  }

  ngOnInit() {
    this.editForm = this.fb.group({
      title: [this.serviceToEdit?.getTitle(), Validators.required],
      description: [
        this.serviceToEdit?.getDescription(),
        [Validators.required, Validators.minLength(5)],
      ],
      price: [this.serviceToEdit?.getPrice(), Validators.required],
      duration: [
        this.serviceToEdit?.getDuration(),
        [Validators.required, Validators.min(1)],
      ],
      type: [this.serviceToEdit?.getType()],
      additionalFields: this.fb.array([]),
    });

    this.selectedType = this.editForm.get('type')?.value;
    this.toggleFields();

    this.editForm.get('type')?.valueChanges.subscribe((value) => {
      this.selectedType = value;
      this.toggleFields();
    });
  }

  get additionalFields(): FormArray {
    return this.editForm.get('additionalFields') as FormArray;
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

  onSubmit() {
    console.log('Submitting form...');
    if (this.editForm.valid) {
      const formValue = this.editForm.value;

      const serviceType = formValue.type?.getName().toLowerCase();
      const additionalData = this.additionalFields.controls[0]?.value || {};

      const updatedServiceData = {
        id: this.serviceToEdit?.id,
        ...formValue,
        ...additionalData,
      };

      try {
        if (this.serviceToEdit && this.userId) {
          const updatedService: IService = ServiceFactory.createService(
            serviceType,
            this.userId,
            updatedServiceData
          );
          this.userDataService.updateService(updatedService);
        }

        this.serviceUpdated.emit(updatedServiceData);
      } catch (error) {
        console.error('Error updating service:', error);
      }
    } else {
      console.log('Form is invalid');
    }
  }

  isInvalid(controlName: string): boolean {
    const control =
      this.editForm.get(controlName) ??
      this.additionalFields.controls[0]?.get(controlName);
    return !!(control && control.invalid && (control.dirty || control.touched));
  }
}
