import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageCreacionHospitalesComponent } from './page-creacion-hospitales.component';

describe('PageCreacionHospitalesComponent', () => {
  let component: PageCreacionHospitalesComponent;
  let fixture: ComponentFixture<PageCreacionHospitalesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PageCreacionHospitalesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PageCreacionHospitalesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  xit('should create', () => {
    expect(component).toBeTruthy();
  });
});
