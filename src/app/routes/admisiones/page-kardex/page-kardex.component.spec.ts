import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageKardexComponent } from './page-kardex.component';

describe('PageKardexComponent', () => {
  let component: PageKardexComponent;
  let fixture: ComponentFixture<PageKardexComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PageKardexComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PageKardexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  xit('should create', () => {
    expect(component).toBeTruthy();
  });
});
