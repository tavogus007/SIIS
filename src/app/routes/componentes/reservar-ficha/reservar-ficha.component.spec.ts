import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReservarFichaComponent } from './reservar-ficha.component';

describe('ReservarFichaComponent', () => {
  let component: ReservarFichaComponent;
  let fixture: ComponentFixture<ReservarFichaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReservarFichaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReservarFichaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  xit('should create', () => {
    expect(component).toBeTruthy();
  });
});
