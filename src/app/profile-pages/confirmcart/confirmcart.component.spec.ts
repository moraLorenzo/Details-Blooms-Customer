import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmcartComponent } from './confirmcart.component';

describe('ConfirmcartComponent', () => {
  let component: ConfirmcartComponent;
  let fixture: ComponentFixture<ConfirmcartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConfirmcartComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmcartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
