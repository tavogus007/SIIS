import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageMonitorComponent } from './page-monitor.component';

describe('PageMonitorComponent', () => {
  let component: PageMonitorComponent;
  let fixture: ComponentFixture<PageMonitorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PageMonitorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PageMonitorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  xit('should create', () => {
    expect(component).toBeTruthy();
  });
});
