import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageCreacionDeGruposComponent } from './page-creacion-de-grupos.component';

describe('PageCreacionDeGruposComponent', () => {
  let component: PageCreacionDeGruposComponent;
  let fixture: ComponentFixture<PageCreacionDeGruposComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PageCreacionDeGruposComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PageCreacionDeGruposComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  xit('should create', () => {
    expect(component).toBeTruthy();
  });
});
