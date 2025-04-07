import { CommonModule } from '@angular/common';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-string-checker-form',
  standalone: true,
  templateUrl: './string-checker-form.component.html',
  styleUrls: ['./string-checker-form.component.scss'],
  imports: [CommonModule, ReactiveFormsModule, IonicModule],
})
export class StringCheckerFormComponent implements OnInit {
  public myForm = new FormGroup({
    textControl: new FormControl('', Validators.required),
  });

  @Output() textSubmitted = new EventEmitter<string>();

  submit() {
    if (this.myForm.invalid) {
      return;
    }

    if (this.myForm.valid) {
      const formValue = this.myForm.value.textControl;
      if (formValue) this.textSubmitted.emit(formValue);
    }
  }

  isFieldInvalid(controlName: string): boolean {
    const control = this.myForm.get(controlName);
    return (control?.touched && control?.invalid) ?? false;
  }

  constructor() {}

  ngOnInit() {}
}
