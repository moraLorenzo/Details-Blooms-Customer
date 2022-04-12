import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuickconfirmComponent } from './quickconfirm.component';

describe('QuickconfirmComponent', () => {
  let component: QuickconfirmComponent;
  let fixture: ComponentFixture<QuickconfirmComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuickconfirmComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QuickconfirmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
