import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomconfirmComponent } from './customconfirm.component';

describe('CustomconfirmComponent', () => {
  let component: CustomconfirmComponent;
  let fixture: ComponentFixture<CustomconfirmComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomconfirmComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomconfirmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
