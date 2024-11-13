import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageHospitalesComponent } from './page-hospitales.component';

describe('PageHospitalesComponent', () => {
  let component: PageHospitalesComponent;
  let fixture: ComponentFixture<PageHospitalesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PageHospitalesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PageHospitalesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  xit('should create', () => {
    expect(component).toBeTruthy();
  });
});
