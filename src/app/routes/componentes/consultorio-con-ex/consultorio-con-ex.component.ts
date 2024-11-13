import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatStepperModule } from '@angular/material/stepper';
import { SignosVitalesComponent } from '../signos-vitales/signos-vitales.component';

@Component({
  selector: 'app-consultorio-con-ex',
  standalone: true,
  imports: [
    MatStepperModule,
    MatButtonModule,
    MatCardModule,
    SignosVitalesComponent
  ],
  templateUrl: './consultorio-con-ex.component.html',
  styleUrl: './consultorio-con-ex.component.scss'
})
export class ConsultorioConExComponent {

}
