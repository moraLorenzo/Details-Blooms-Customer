import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuickmodeComponent } from './quickmode.component';

describe('QuickmodeComponent', () => {
  let component: QuickmodeComponent;
  let fixture: ComponentFixture<QuickmodeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuickmodeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QuickmodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
