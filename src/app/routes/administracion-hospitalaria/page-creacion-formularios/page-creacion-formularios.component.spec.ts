import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageCreacionFormulariosComponent } from './page-creacion-formularios.component';

describe('PageCreacionFormulariosComponent', () => {
  let component: PageCreacionFormulariosComponent;
  let fixture: ComponentFixture<PageCreacionFormulariosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PageCreacionFormulariosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PageCreacionFormulariosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  xit('should create', () => {
    expect(component).toBeTruthy();
  });
});
