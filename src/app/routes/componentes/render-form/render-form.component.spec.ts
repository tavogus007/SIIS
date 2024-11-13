import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RenderFormComponent } from './render-form.component';

describe('RenderFormComponent', () => {
  let component: RenderFormComponent;
  let fixture: ComponentFixture<RenderFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RenderFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RenderFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  xit('should create', () => {
    expect(component).toBeTruthy();
  });
});
