import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageHistorialComponent } from './page-historial.component';

describe('PageHistorialComponent', () => {
  let component: PageHistorialComponent;
  let fixture: ComponentFixture<PageHistorialComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PageHistorialComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PageHistorialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
