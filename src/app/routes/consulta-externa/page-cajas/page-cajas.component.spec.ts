import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageCajasComponent } from './page-cajas.component';

describe('PageCajasComponent', () => {
  let component: PageCajasComponent;
  let fixture: ComponentFixture<PageCajasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PageCajasComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PageCajasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  xit('should create', () => {
    expect(component).toBeTruthy();
  });
});
