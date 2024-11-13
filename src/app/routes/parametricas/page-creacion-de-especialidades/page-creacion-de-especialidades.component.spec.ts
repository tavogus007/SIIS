import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageCreacionDeEspecialidadesComponent } from './page-creacion-de-especialidades.component';

describe('PageCreacionDeEspecialidadesComponent', () => {
  let component: PageCreacionDeEspecialidadesComponent;
  let fixture: ComponentFixture<PageCreacionDeEspecialidadesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PageCreacionDeEspecialidadesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PageCreacionDeEspecialidadesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  xit('should create', () => {
    expect(component).toBeTruthy();
  });
});
