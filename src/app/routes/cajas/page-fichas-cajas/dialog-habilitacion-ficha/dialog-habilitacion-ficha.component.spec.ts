import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogHabilitacionFichaComponent } from './dialog-habilitacion-ficha.component';

describe('DialogHabilitacionFichaComponent', () => {
  let component: DialogHabilitacionFichaComponent;
  let fixture: ComponentFixture<DialogHabilitacionFichaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DialogHabilitacionFichaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogHabilitacionFichaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  xit('should create', () => {
    expect(component).toBeTruthy();
  });
});
