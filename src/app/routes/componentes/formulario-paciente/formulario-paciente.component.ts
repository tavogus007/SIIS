import { Component, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { DataService } from 'app/routes/servicios/data.service';
import { MatStepperModule } from '@angular/material/stepper';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
//import { DataService } from '../../servicios/data.service';

@Component({
  selector: 'app-formulario-paciente',
  providers: [
    {
      provide: STEPPER_GLOBAL_OPTIONS,
      useValue: {displayDefaultIndicatorType: false},
    },
  ],
  standalone: true,
  imports: [
    FormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatStepperModule,
    ReactiveFormsModule
  ],
  templateUrl: './formulario-paciente.component.html',
  styleUrl: './formulario-paciente.component.scss'
})
export class FormularioPacienteComponent implements OnInit {
  data: any = {};
  sql: any;
  responde: any;
  fileToUpload: any = null;
  img: any = "images/MASCULINO.gif";
  @Output() retornar = new EventEmitter();
  @Output() guardarDatos = new EventEmitter();
  @Input() dataPaciente: any = [];
  //constructor(private http: DataService) { }
  
  private http = inject(DataService);

  
  ngOnInit(): void {
    console.log("dataPaciente-----", this.dataPaciente);
    console.log(this.dataPaciente.dtspsl_ci);
    
    if (this.dataPaciente.dtspsl_ci) {
      this.data.nombre = this.dataPaciente.dtspsl_nombres;
      this.data.primer_apellido = this.dataPaciente.dtspsl_paterno;
      this.data.segundo_apellido = this.dataPaciente.dtspsl_materno;
      this.data.ci = this.dataPaciente.dtspsl_ci;
      this.data.genero = this.dataPaciente.dtspsl_sexo;
      this.data.fecha_nac = this.dataPaciente.dtspsl_fec_nacimiento;
      this.data.estado_civil = this.dataPaciente.dtspsl_id_estado_civil;
      this.data.direccion = this.dataPaciente.dtspsl_direccion;
      this.data.telefono = this.dataPaciente.dtspsl_telefono;
      this.data.expedido = this.dataPaciente.dtspsl_expedido;
      this.data.tipoPaciente = this.dataPaciente.dtspsl_tipo_persona;      
      this.data.email = this.dataPaciente.dtspsl_correo;
      this.data.lugar_nac = this.dataPaciente.dtspsl_lugar_nac;
      this.data.celular = this.dataPaciente.dtspsl_celular;
    }else{
      this.data = [];
    }
  }

  handleFileInput(event: any) {
    this.fileToUpload = event.target.files[0] ?? null;
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      this.img = reader.result;
    };

  }

  funcionCancelar() {
    this.retornar.emit("123");
  }

  funcionGuardar() {
    console.log("data", this.data);
    this.funcionCancelar();
    this.guardarDatos.emit('123');
    //this.funcionConsumirServicio();
  }

  funcionConsumirServicio() {
    try {
      console.log("datos", this.data);
      this.sql = {
        consulta: 'select * from actualizar_pacientes($$' + this.data.nombre + '$$,'
          + '$$' + this.data.primer_apellido + '$$,'
          + '$$' + this.data.segundo_apellido + '$$,'
          + '$$' + this.data.ci + '$$,'
          + '$$' + this.data.genero + '$$,'
          + '$$' + this.data.fecha_nac + '$$,'
          + '$$' + this.data.estado_civil + '$$,'
          + '$$' + this.data.direccion + '$$,'
          + '$$' + this.data.telefono + '$$,'
          + '$$' + this.data.expedido + '$$,'
          + '$$' + this.data.tipoPaciente + '$$,'
          + '$$' + 1 + '$$,'
          + '$$' + this.data.email + '$$,'
          + '$$' + this.data.lugar_nac + '$$,'
          + '$$' + this.data.celular + '$$)'
      };
      this.http.dinamico(this.sql).subscribe(res => {
        this.responde = res as { message: string };
        if (this.responde.success.code == 200) {
          console.log("this.responde 2", this.responde);
        } else {
          console.log("this.responde 2", this.responde);
        }
      });
    } catch (error) {
    }
  }
}