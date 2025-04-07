import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { StringCheckerFormComponent } from './string-checker-form.component';

describe('StringCheckerFormComponent', () => {
  let component: StringCheckerFormComponent;
  let fixture: ComponentFixture<StringCheckerFormComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [StringCheckerFormComponent, IonicModule.forRoot()],
    }).compileComponents();

    fixture = TestBed.createComponent(StringCheckerFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
