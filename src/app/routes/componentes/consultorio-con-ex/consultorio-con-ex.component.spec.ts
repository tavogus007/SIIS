import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultorioConExComponent } from './consultorio-con-ex.component';

describe('ConsultorioConExComponent', () => {
  let component: ConsultorioConExComponent;
  let fixture: ComponentFixture<ConsultorioConExComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConsultorioConExComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConsultorioConExComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  xit('should create', () => {
    expect(component).toBeTruthy();
  });
});
