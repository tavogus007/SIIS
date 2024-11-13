import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageFichasCajasComponent } from './page-fichas-cajas.component';

describe('PageFichasCajasComponent', () => {
  let component: PageFichasCajasComponent;
  let fixture: ComponentFixture<PageFichasCajasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PageFichasCajasComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PageFichasCajasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  xit('should create', () => {
    expect(component).toBeTruthy();
  });
});
