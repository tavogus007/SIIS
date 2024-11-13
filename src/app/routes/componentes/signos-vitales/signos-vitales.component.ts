import { animate, state, style, transition, trigger } from '@angular/animations';
import { CommonModule } from '@angular/common';
import { AfterViewInit, ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatRadioModule } from '@angular/material/radio';

@Component({
  selector: 'app-signos-vitales',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    MatDividerModule,
    MatIconModule,
    MatMenuModule,
    MatRadioModule
  ],
  templateUrl: './signos-vitales.component.html',
  styleUrl: './signos-vitales.component.scss',
  animations: [
    trigger('grow', [
      state(
        'true',
        style({
          height: '{{temperaturaHeight}}px',
        }),
        { params: { temperaturaHeight: 1 } }
      ),
      state(
        'false',
        style({
          height: '{{temperaturaHeight}}px',
        }),
        { params: { temperaturaHeight: 1 } }
      ),
      transition('true => false', animate('600ms ease-in')),
      transition('false => true', animate('600ms ease-in')),
    ]),
    trigger('grow2', [
      state(
        'true',
        style({
          height: '{{temperaturaHeight}}px',
        }),
        { params: { temperaturaHeight: 1 } }
      ),
      state(
        'false',
        style({
          height: '{{temperaturaHeight}}px',
        }),
        { params: { temperaturaHeight: 1 } }
      ),
      transition('true => false', animate('600ms ease-in')),
      transition('false => true', animate('600ms ease-in')),
    ]),
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SignosVitalesComponent implements AfterViewInit {
  @Output() retornar = new EventEmitter();
  siluetaHombre = [
    'hombre-bajopeso1.png',
    'hombre-normal1.png',
    'hombre-sobrepeso1.png',
    'hombre-obesidad-g1-1.png',
    'hombre-obesidad-g2-1.png',
    'hombre-obesidad-g3-1.png',
  ];
  siluetaMujer = [
    'mujer-bajopeso1.png',
    'mujer-normal1.png',
    'mujer-sobrepeso1.png',
    'mujer-obesidad-g1-1.png',
    'mujer-obesidad-g2-1.png',
    'mujer-obesidad-g3-1.png',
  ];
  signosVitales: any = {};
  silueta: any;
  classSilueta: any;
  imc_total: any;
  genero: any = 1;
  temperaturaHeight: any = -2;
  valueState = true;
  isDisabled: any = true;
  estadoTemperatura: any;
  estadoFrecuenciaCardiaca: any;
  estadoPresionArterial: any;
  estadoFrecuenciaRespiratoria: any;
  estadoSaturacionOxigeno: any;

  //edicion:boolean = false;

  @Input() edicion: boolean = false;
  @Input() tipoConsumo: any = '';
  
  ngAfterViewInit(): void {
    if (this.tipoConsumo != 'LECTURA') {
      this.tipoConsumo = 'global-card';
    }
    if (this.edicion) {
      this.funcionRecuperarDatos();
    } else {
      this.signosVitales = {
        IMC: '0.0'
      };
      if (this.genero === 1) {
        //this.silueta = "hombre-normal1.png";
        this.silueta = "antiguo/hombre-normal.png";
      } else {
        //this.silueta = "mujer-normal1.png";
        this.silueta = "antiguo/mujer-normal.png";
      }
    }
  }

  funcionRecuperarDatos(){
    this.signosVitales = {
      IMC: '24.22',
      peso:"70",
      altura:"1.70",
      temperaturaSignosVitales1:"2",
      temperatura:"37",
      frecuencia_cardiaca:"90",
      presion_arterial:"90/60",
      frecuencia_respiratoria:"20",
      saturacion_oxigeno:"70",
    };
    this.changeIMC();
    this.funcionSeleccionTemperatura(2);
    this.funcionEstadoTemperatura();
    this.funcionFrecuenciaCardiaca(90);
    this.funcionPresionArterial('90/60');
    this.funcionFrecuenciaRespiratoria(20);
    this.funcionSaturacionOxigeno(70);
  }

  funcionRetornar() {
    this.retornar.emit('');
  }

  changeIMC() {
    var posIMC = this.funcionIndiceMasaCorporal();
    if (this.genero == 1) {
      this.silueta = this.siluetaHombre[posIMC];
    } else {
      if (this.genero == 2) {
        this.silueta = this.siluetaMujer[posIMC];
      }
    }
    console.log(this.silueta,"-",posIMC);
  }

  funcionIndiceMasaCorporal() {
    const peso = parseFloat(this.signosVitales.peso);
    const altura = parseFloat(this.signosVitales.altura);
    if (!isNaN(peso) && !isNaN(altura) && altura !== 0) {
      this.imc_total = peso / (altura * altura);
      this.signosVitales.IMC = this.imc_total.toFixed(2);
    } else {
      this.signosVitales.IMC = '0.0';
    }
    if (this.imc_total < 18.5) {
      return 0;
    } else {
      if (this.imc_total >= 18.5 && this.imc_total < 25) {
        return 1;
      } else {
        if (this.imc_total >= 25 && this.imc_total < 30) {
          return 2;
        } else {
          if (this.imc_total >= 30 && this.imc_total < 35) {
            return 3;
          } else {
            if (this.imc_total >= 35 && this.imc_total < 40) {
              return 4;
            } else {
              return 5;
            }
          }
        }
      }
    }
  }

  funcionSeleccionTemperatura(event: any) {
    this.signosVitales.tipoTenperatura = event.value;
    this.isDisabled = false;
  }

  funcionEstadoTemperatura(): void {
    this.temperaturaHeight = this.signosVitales.temperatura;
    this.estadoTemperatura = this.funcionTemperatura(this.signosVitales.temperatura);
    this.valueState = !this.valueState;
  }

  funcionTemperatura(temperatura: any) {
    let estado;
    if (temperatura < 32) {
      estado = 'Hipotermia severa: su temperatura es peligrosamente baja. Esto es una emergencia médica, se requiere atención inmediata.';
      this.classSilueta = 'hipotermia-severa';
    } else if (temperatura >= 32 && temperatura < 35) {
      estado = 'Hipotermia moderada: su temperatura está baja. Consulte a un médico lo antes posible.';
      this.classSilueta = 'hipotermia-leve';
    } else if (temperatura >= 35 && temperatura < 36) {
      estado = 'Hipotermia leve: su temperatura está algo baja. Manténgase abrigado y monitoree su estado.';
      this.classSilueta = 'hipotermia-leve';
    } else if (temperatura >= 36 && temperatura <= 37.2) {
      estado = 'Temperatura normal: todo está bien, su temperatura está dentro del rango saludable.';
      this.classSilueta = 'normal';
    } else if (temperatura > 37.2 && temperatura <= 37.9) {
      estado = 'Febrícula: su temperatura está ligeramente elevada. Podría tener una infección leve, consulte a su médico si los síntomas persisten.';
      this.classSilueta = 'febricula';
    } else if (temperatura >= 38 && temperatura <= 38.9) {
      estado = 'Fiebre leve: su temperatura es elevada, lo que podría ser señal de una infección. Manténgase hidratado y consulte a un médico si empeora.';
      this.classSilueta = 'fiebre-leve';
    } else if (temperatura >= 39 && temperatura <= 39.9) {
      estado = 'Fiebre moderada: su temperatura es alta, lo que podría indicar una infección significativa. Busque atención médica.';
      this.classSilueta = 'fiebre-moderada';
    } else if (temperatura >= 40 && temperatura <= 41.4) {
      estado = 'Fiebre alta: su temperatura es muy elevada. Esto puede ser peligroso, busque atención médica urgente.';
      this.classSilueta = 'fiebre-alta';
    } else if (temperatura > 41.4) {
      estado = 'Hiperpirexia: su temperatura es extremadamente alta. Esto es una emergencia médica, busque ayuda inmediata.';
      this.classSilueta = 'hiperpirexia';
    } else {
      estado = 'Temperatura no válida: por favor ingrese un valor correcto.';
      this.classSilueta = '';
    }
    return `Su estado de temperatura es: ${estado}`;
  }

  funcionFrecuenciaCardiaca(frecuencia: number): void {
    if (frecuencia < 60) {
      this.estadoFrecuenciaCardiaca = 'Bradicardia: la frecuencia cardíaca es baja. Consulte a un médico.';
    } else if (frecuencia >= 60 && frecuencia <= 100) {
      this.estadoFrecuenciaCardiaca = 'Frecuencia cardíaca normal.';
    } else if (frecuencia > 100 && frecuencia <= 120) {
      this.estadoFrecuenciaCardiaca = 'Taquicardia leve: la frecuencia cardíaca está elevada.';
    } else if (frecuencia > 120) {
      this.estadoFrecuenciaCardiaca = 'Taquicardia grave: la frecuencia cardíaca es peligrosamente alta.';
    } else {
      this.estadoFrecuenciaCardiaca = 'Frecuencia no válida.';
    }
  }

  funcionPresionArterial(presion: string): void {
    try {
      const [sistolica, diastolica] = presion.split('/').map(Number);
      if (isNaN(sistolica) || isNaN(diastolica)) {
        this.estadoPresionArterial = 'Presión no válida.';
        return;
      }
      if (sistolica < 90 || diastolica < 60) {
        this.estadoPresionArterial = 'Hipotensión: la presión arterial es demasiado baja.';
      } else if (sistolica >= 90 && sistolica <= 120 && diastolica >= 60 && diastolica <= 80) {
        this.estadoPresionArterial = 'Presión arterial normal.';
      } else if (sistolica > 120 && sistolica <= 139 || diastolica > 80 && diastolica <= 89) {
        this.estadoPresionArterial = 'Hipertensión en etapa 1: la presión arterial está elevada.';
      } else if (sistolica >= 140 || diastolica >= 90) {
        this.estadoPresionArterial = 'Hipertensión en etapa 2: la presión arterial es alta.';
      } else {
        this.estadoPresionArterial = 'Estado no válido.';
      }
    } catch (error) {
      this.estadoPresionArterial = 'Presión no válida.';
      return;
    }

  }

  funcionFrecuenciaRespiratoria(frecuencia: number): void {
    if (frecuencia < 12) {
      this.estadoFrecuenciaRespiratoria = 'Bradipnea: la frecuencia respiratoria es baja. Consulte a un médico.';
    } else if (frecuencia >= 12 && frecuencia <= 20) {
      this.estadoFrecuenciaRespiratoria = 'Frecuencia respiratoria normal.';
    } else if (frecuencia > 20 && frecuencia <= 24) {
      this.estadoFrecuenciaRespiratoria = 'Taquipnea leve: la frecuencia respiratoria está elevada.';
    } else if (frecuencia > 24) {
      this.estadoFrecuenciaRespiratoria = 'Taquipnea grave: la frecuencia respiratoria es peligrosamente alta.';
    } else {
      this.estadoFrecuenciaRespiratoria = 'Frecuencia no válida.';
    }
  }

  funcionSaturacionOxigeno(saturacion: number): void {
    if (saturacion < 90) {
      this.estadoSaturacionOxigeno = 'Hipoxemia: saturación de oxígeno baja. Consulte a un médico.';
    } else if (saturacion >= 90 && saturacion <= 100) {
      this.estadoSaturacionOxigeno = 'Saturación de oxígeno normal.';
    } else {
      this.estadoSaturacionOxigeno = 'Saturación no válida.';
    }
  }
}
