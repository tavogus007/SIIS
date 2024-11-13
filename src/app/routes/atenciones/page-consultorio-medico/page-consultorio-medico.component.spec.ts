import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageConsultorioMedicoComponent } from './page-consultorio-medico.component';

describe('PageConsultorioMedicoComponent', () => {
  let component: PageConsultorioMedicoComponent;
  let fixture: ComponentFixture<PageConsultorioMedicoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PageConsultorioMedicoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PageConsultorioMedicoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  xit('should create', () => {
    expect(component).toBeTruthy();
  });
});
