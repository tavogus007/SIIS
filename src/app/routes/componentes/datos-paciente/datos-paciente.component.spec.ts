import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DatosPacienteComponent } from './datos-paciente.component';

describe('DatosPacienteComponent', () => {
  let component: DatosPacienteComponent;
  let fixture: ComponentFixture<DatosPacienteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DatosPacienteComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DatosPacienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  xit('should create', () => {
    expect(component).toBeTruthy();
  });
});
