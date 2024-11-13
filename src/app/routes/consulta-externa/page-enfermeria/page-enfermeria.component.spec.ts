import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageEnfermeriaComponent } from './page-enfermeria.component';

describe('PageEnfermeriaComponent', () => {
  let component: PageEnfermeriaComponent;
  let fixture: ComponentFixture<PageEnfermeriaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PageEnfermeriaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PageEnfermeriaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  xit('should create', () => {
    expect(component).toBeTruthy();
  });
});
