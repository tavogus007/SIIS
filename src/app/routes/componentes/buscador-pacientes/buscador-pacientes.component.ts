import { Component, EventEmitter, inject, Output } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
//import { DataService } from '../../servicios/data.service';
import { ToastrService } from 'ngx-toastr';
import { MatTableModule } from '@angular/material/table';
import { DataService } from 'app/routes/servicios/data.service';
import { PageHeaderComponent } from '@shared/components';

@Component({
  selector: 'app-buscador-pacientes',
  standalone: true,
  imports: [
    MatCardModule,
    CommonModule,
    MatInputModule,
    FormsModule,
    MatIconModule,
    MatFormFieldModule,
    MatButtonModule,
    MatTableModule,
    PageHeaderComponent,
  ],
  templateUrl: './buscador-pacientes.component.html',
  styleUrl: './buscador-pacientes.component.scss'
})
export class BuscadorPacientesComponent {

  private readonly toast = inject(ToastrService);

  navStyle = 'background: #09b8b0;color:#fefeff;';
  vci = '';
  vappaterno = '';
  vcodigoseg = '';
  vapmaterno = '';
  vnombre = '';
  text: any;

  sql: any;
  responde: any;

  displayedColumns: string[] = ['dtspsl_ci', 'dtspsl_nombres', 'dtspsl_paterno', 'dtspsl_materno'];
  dataSource: any =[];
  @Output() retornar = new EventEmitter();
  @Output() pacienteSeleccionado = new EventEmitter();


  constructor(private http: DataService) { }

  funcionCancelar() {
    this.retornar.emit("123");
  }

  buscarSice(data: any) {
    console.log("buscar", data);
    this.dataSource = [
      { dtspsl_ci: "1234567", dtspsl_nombres: "nombres", dtspsl_paterno: "paternos", dtspsl_materno: "maternos" }
    ];
    this.pacienteSeleccionado.emit(this.dataSource);
    /*try {
      this.sql = {
        consulta: 'select * from _bp_datos_personales where dtspsl_ci = $$' + data + '$$ '
      };
      this.http.dinamico(this.sql).subscribe(res => {
        this.responde = res as { message: string };
        if (this.responde.success.code == 200) {
          if (this.responde.success.data[0].sp_dinamico != null) {
            this.dataSource = this.responde.success.data[0].sp_dinamico;
            console.log("this.responde 2", this.responde);
            this.toast.success("Paciente encontrado");
          } else {
            this.toast.error("No se encuentra al paciente");
          }
        } else {
          console.log("this.responde 2", this.responde);
        }
      });
    } catch (error) {
    }*/
  }
  buscarCodigoSice(codigo: any) {
    console.log("dataBuscarCodigo", codigo);
    this.dataSource = [
      { dtspsl_ci: "1234567", dtspsl_nombres: "nombres", dtspsl_paterno: "paternos", dtspsl_materno: "maternos" }
    ];
    this.pacienteSeleccionado.emit(this.dataSource);
  }
  
  funcionEnviaDatos(data: any) {
    console.log(data);
    this.pacienteSeleccionado.emit(data);
  }

}
