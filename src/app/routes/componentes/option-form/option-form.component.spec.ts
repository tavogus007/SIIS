import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OptionFormComponent } from './option-form.component';

describe('OptionFormComponent', () => {
  let component: OptionFormComponent;
  let fixture: ComponentFixture<OptionFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OptionFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OptionFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  xit('should create', () => {
    expect(component).toBeTruthy();
  });
});
