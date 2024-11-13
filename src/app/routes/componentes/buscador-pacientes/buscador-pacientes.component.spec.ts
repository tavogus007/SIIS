import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuscadorPacientesComponent } from './buscador-pacientes.component';

describe('BuscadorPacientesComponent', () => {
  let component: BuscadorPacientesComponent;
  let fixture: ComponentFixture<BuscadorPacientesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BuscadorPacientesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BuscadorPacientesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  xit('should create', () => {
    expect(component).toBeTruthy();
  });
});
