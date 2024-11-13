import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageAdmisionComponent } from './page-admision.component';

describe('PageAdmisionComponent', () => {
  let component: PageAdmisionComponent;
  let fixture: ComponentFixture<PageAdmisionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PageAdmisionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PageAdmisionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  xit('should create', () => {
    expect(component).toBeTruthy();
  });
});
