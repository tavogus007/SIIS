import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageCreacionDePrestacionesComponent } from './page-creacion-de-prestaciones.component';

describe('PageCreacionDePrestacionesComponent', () => {
  let component: PageCreacionDePrestacionesComponent;
  let fixture: ComponentFixture<PageCreacionDePrestacionesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PageCreacionDePrestacionesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PageCreacionDePrestacionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  xit('should create', () => {
    expect(component).toBeTruthy();
  });
});
