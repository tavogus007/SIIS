import { HttpErrorResponse } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Router, RouterLink } from '@angular/router';
import { MtxButtonModule } from '@ng-matero/extensions/button';
import { TranslateModule } from '@ngx-translate/core';
import { filter } from 'rxjs/operators';

import { AuthService } from '@core/authentication';
import { ToastrService } from 'ngx-toastr';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    RouterLink,
    MatButtonModule,
    MatCardModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatInputModule,
    MtxButtonModule,
    TranslateModule,
    MatIconModule
  ],
})
export class LoginComponent {
  private readonly fb = inject(FormBuilder);
  private readonly router = inject(Router);
  private readonly auth = inject(AuthService);

  private readonly toast = inject(ToastrService);

  isSubmitting = false;

  hide = true;
  response: any;
  dataMenu: any = [];
  datos: any;
  fechaServer: any;

  loginForm = this.fb.nonNullable.group({
    username: ['', [Validators.required]],
    password: ['', [Validators.required]],
    rememberMe: [false],
  });

  get username() {
    return this.loginForm.get('username')!;
  }

  get password() {
    return this.loginForm.get('password')!;
  }

  get rememberMe() {
    return this.loginForm.get('rememberMe')!;
  }

  /*
  login() {
    this.isSubmitting = true;

    this.auth
      .login(this.username.value, this.password.value, this.rememberMe.value)
      .pipe(filter(authenticated => authenticated))
      .subscribe({
        next: () => {
          this.router.navigateByUrl('/');
        },
        error: (errorRes: HttpErrorResponse) => {
          if (errorRes.status === 422) {
            const form = this.loginForm;
            const errors = errorRes.error.errors;
            Object.keys(errors).forEach(key => {
              form.get(key === 'email' ? 'username' : key)?.setErrors({
                remote: errors[key][0],
              });
            });
          }
          this.isSubmitting = false;
        },
      });
  }
  */

  obtenerSaludo(nombre:any) {
    const fechaActual = new Date();
    const hora = fechaActual.getHours();
    let saludo;
  
    if (hora < 12) {
      saludo = "¡Buenos Días";
    } else if (hora < 18) {
      saludo = "¡Buenas Tardes";
    } else {
      saludo = "¡Buenas Noches";
    }
  
    return `${saludo} ${nombre}. ¡Bienvenido al Sistema de Salud! Estoy aquí para apoyarte en todo lo que necesites.`;
  }

  loginAdministracion() {
    this.isSubmitting = true;
    const data = {
      "usuario": this.username?.value,
      "clave": this.password?.value,
      "sistema": "SIIS"
    };

    this.auth.loginAdministracion(this.username?.value + "gustavog", this.password?.value + "095065", data)
    //USUARIOS DE PRUEBA


      .subscribe(response => {
        //speechSynthesis.speak(new SpeechSynthesisUtterance("BIENVENIDOS AL SISTEMA DE SALUD"));
        const nombreUsuario = "Vladimir"; // Puedes cambiar esto según sea necesario
        const mensaje = new SpeechSynthesisUtterance(this.obtenerSaludo(nombreUsuario));
        //////const mensaje = new SpeechSynthesisUtterance("¡Buenas Noches Vladimir. ¡Bienvenido al Sistema de Salud! Estoy aquí para apoyarte en todo lo que necesites.");
        //const mensaje = new SpeechSynthesisUtterance("¡Bienvenido al Sistema de Salud! Estoy aquí para apoyarte en todo lo que necesites.");

        // Configurar propiedades de la voz
        mensaje.lang = 'es-ES';        // Establece el idioma (Español de España, puedes cambiarlo según el país)
        mensaje.pitch = 1.0;           // Controla el tono de la voz (1 es el tono normal)
        mensaje.rate = 1.0;            // Controla la velocidad (1 es la velocidad normal)
        mensaje.volume = 1.0;          // Controla el volumen (1 es el máximo)

        // Opcional: Seleccionar una voz específica (si el navegador ofrece varias opciones)
        const voces = window.speechSynthesis.getVoices();
        //mensaje.voice = voces.find(voz => voz.lang === 'es-ES');  // Buscar una voz en español

        // Ejecutar la síntesis de voz
        window.speechSynthesis.speak(mensaje);


        this.response = response;
        console.log("this.response----", this.response);

        if (response.status === 300) {
          this.toast.error(this.response.data, '', {
            timeOut: 3000,
            progressBar: true,
            closeButton: true,
            newestOnTop: false,
            extendedTimeOut: 0,
            tapToDismiss: false
          });
          this.isSubmitting = false;
        }
        if (response.status === 200) {
          this.auth.storageToken(this.response.token);

          this.auth.setDataStorage(this.response.data[0]);
          this.auth.setGenericSession("ID_AGENCIA", 17);
          this.auth.setGenericSession("usuario", 1);
          /* -------------------------------------DATOS DE USUARIO --------------------------*/

          this.dataMenu = [
            {
              "route": "dashboard",
              "name": "dashboard",
              "type": "link",
              "icon": "dashboard",
              "badge": {
                "color": "red-500",
                "value": "5"
              }
            },
            {
              "route": "admisiones",
              "name": "Admisiones",
              "type": "sub",
              "icon": "style",
              "children": [
                {
                  "route": "admision",
                  "name": "Admision",
                  "type": "link"
                },
                {
                  "route": "kardex",
                  "name": "Kardex",
                  "type": "link"
                },
              ]
            },
            {
              "route":"mascotas",
              "name":"Mascotas",
              "type": "link",
              "icon": "pets"
            },
            {
              "route": "medico_en_tu_casa",
              "name": "Medico en tu casa",
              "type": "sub",
              "icon": "home health",
              "children": [
                {
                  "route":"agenda",
                  "name":"Agenda",
                  "type":"link"
                },
                {
                  "route":"ruta",
                  "name":"Ruta",
                  "type":"link"
                },
                {
                  "route":"historial",
                  "name":"Historial",
                  "type":"link"
                }
              ]
            },
            {
              "route":"map",
              "name":"Medico en tu Casa V2",
              "type": "link",
              "icon": "home health"
            },

            {
              "route": "cajas",
              "name": "Cajas",
              "type": "sub",
              "icon": "monetization_on",
              "children": [
                {
                  "route": "fichas-cajas",
                  "name": "Fichas cajas",
                  "type": "link"
                }
              ]
            },
            {
              "route": "atenciones",
              "name": "Atenciones",
              "type": "sub",
              "icon": "local_hospital",
              "children": [
                {
                  "route": "enfermeria",
                  "name": "Enfermeria",
                  "type": "link"
                },
                {
                  "route": "consultorio-medico",
                  "name": "Consultorio medico",
                  "type": "link"
                }
              ]
            },
            {
              "route": "administracionHosp",
              "name": "Administracion Hospitalaria",
              "type": "sub",
              "icon": "brightness_7",
              "children": [
                {
                  "route": "hospitales",
                  "name": "Hospitales",
                  "type": "link"
                },
                {
                  "route": "formulario",
                  "name": "Creacion de Formularios",
                  "type": "link"
                }
              ]
            },

            {
              "route": "fichas",
              "name": "Fichas",
              "type": "sub",
              "icon": "devices",
              "children": [
                {
                  "route": "dispensador",
                  "name": "Dispensador",
                  "type": "link"
                },
                {
                  "route": "monitor",
                  "name": "Monitor",
                  "type": "link"
                },
              ]
            },
            {
              "route": "parametricas",
              "name": "Parametricas",
              "type": "sub",
              "icon": "brightness_7",
              "children": [
                {
                  "route": "agencias",
                  "name": "Agencias",
                  "type": "link"
                },
                {
                  "route": "servicios",
                  "name": "Servicios",
                  "type": "link"
                },
                {
                  "route": "subservicios",
                  "name": "Sub Servicios",
                  "type": "link"
                },
                {
                  "route": "asignacion",
                  "name": "Asignacion de Servicios",
                  "type": "link"
                },
                {
                  "route": "puestos",
                  "name": "Punto de Atención",
                  "type": "link"
                },
              ]
            },







            {
              "route": "design",
              "name": "design",
              "type": "sub",
              "icon": "color_lens",
              "label": {
                "color": "azure-50",
                "value": "New"
              },
              "children": [
                {
                  "route": "colors",
                  "name": "colors",
                  "type": "link",
                  "icon": "colorize"
                },
                {
                  "route": "icons",
                  "name": "icons",
                  "type": "link",
                  "icon": "flag"
                }
              ],
              "permissions": {
                "only": [
                  "ADMIN",
                  "MANAGER"
                ]
              }
            },
            {
              "route": "material",
              "name": "material",
              "type": "sub",
              "icon": "favorite",
              "children": [
                {
                  "route": "",
                  "name": "form-controls",
                  "type": "sub",
                  "children": [
                    {
                      "route": "autocomplete",
                      "name": "autocomplete",
                      "type": "link"
                    },
                    {
                      "route": "checkbox",
                      "name": "checkbox",
                      "type": "link"
                    },
                    {
                      "route": "datepicker",
                      "name": "datepicker",
                      "type": "link"
                    },
                    {
                      "route": "form-field",
                      "name": "form-field",
                      "type": "link"
                    },
                    {
                      "route": "input",
                      "name": "input",
                      "type": "link"
                    },
                    {
                      "route": "radio",
                      "name": "radio",
                      "type": "link"
                    },
                    {
                      "route": "select",
                      "name": "select",
                      "type": "link"
                    },
                    {
                      "route": "slider",
                      "name": "slider",
                      "type": "link"
                    },
                    {
                      "route": "slide-toggle",
                      "name": "slide-toggle",
                      "type": "link"
                    }
                  ]
                },
                {
                  "route": "",
                  "name": "navigation",
                  "type": "sub",
                  "children": [
                    {
                      "route": "menu",
                      "name": "menu",
                      "type": "link"
                    },
                    {
                      "route": "sidenav",
                      "name": "sidenav",
                      "type": "link"
                    },
                    {
                      "route": "toolbar",
                      "name": "toolbar",
                      "type": "link"
                    }
                  ]
                },
                {
                  "route": "",
                  "name": "layout",
                  "type": "sub",
                  "children": [
                    {
                      "route": "card",
                      "name": "card",
                      "type": "link"
                    },
                    {
                      "route": "divider",
                      "name": "divider",
                      "type": "link"
                    },
                    {
                      "route": "expansion",
                      "name": "expansion",
                      "type": "link"
                    },
                    {
                      "route": "grid-list",
                      "name": "grid-list",
                      "type": "link"
                    },
                    {
                      "route": "list",
                      "name": "list",
                      "type": "link"
                    },
                    {
                      "route": "stepper",
                      "name": "stepper",
                      "type": "link"
                    },
                    {
                      "route": "tab",
                      "name": "tab",
                      "type": "link"
                    },
                    {
                      "route": "tree",
                      "name": "tree",
                      "type": "link"
                    }
                  ]
                },
                {
                  "route": "",
                  "name": "buttons-indicators",
                  "type": "sub",
                  "children": [
                    {
                      "route": "button",
                      "name": "button",
                      "type": "link"
                    },
                    {
                      "route": "button-toggle",
                      "name": "button-toggle",
                      "type": "link"
                    },
                    {
                      "route": "badge",
                      "name": "badge",
                      "type": "link"
                    },
                    {
                      "route": "chips",
                      "name": "chips",
                      "type": "link"
                    },
                    {
                      "route": "icon",
                      "name": "icon",
                      "type": "link"
                    },
                    {
                      "route": "progress-spinner",
                      "name": "progress-spinner",
                      "type": "link"
                    },
                    {
                      "route": "progress-bar",
                      "name": "progress-bar",
                      "type": "link"
                    },
                    {
                      "route": "ripple",
                      "name": "ripple",
                      "type": "link"
                    }
                  ]
                },
                {
                  "route": "",
                  "name": "popups-modals",
                  "type": "sub",
                  "children": [
                    {
                      "route": "bottom-sheet",
                      "name": "bottom-sheet",
                      "type": "link"
                    },
                    {
                      "route": "dialog",
                      "name": "dialog",
                      "type": "link"
                    },
                    {
                      "route": "snack-bar",
                      "name": "snackbar",
                      "type": "link"
                    },
                    {
                      "route": "tooltip",
                      "name": "tooltip",
                      "type": "link"
                    }
                  ]
                },
                {
                  "route": "data-table",
                  "name": "data-table",
                  "type": "sub",
                  "children": [
                    {
                      "route": "paginator",
                      "name": "paginator",
                      "type": "link"
                    },
                    {
                      "route": "sort",
                      "name": "sort",
                      "type": "link"
                    },
                    {
                      "route": "table",
                      "name": "table",
                      "type": "link"
                    }
                  ]
                }
              ],
              "permissions": {
                "except": [
                  "MANAGER",
                  "GUEST"
                ]
              }
            },
            {
              "route": "permissions",
              "name": "permissions",
              "type": "sub",
              "icon": "lock",
              "children": [
                {
                  "route": "role-switching",
                  "name": "role-switching",
                  "type": "link"
                },
                {
                  "route": "route-guard",
                  "name": "route-guard",
                  "type": "link",
                  "permissions": {
                    "except": "GUEST"
                  }
                },
                {
                  "route": "test",
                  "name": "test",
                  "type": "link",
                  "permissions": {
                    "only": "ADMIN"
                  }
                }
              ]
            },
            {
              "route": "media",
              "name": "media",
              "type": "sub",
              "icon": "image",
              "children": [
                {
                  "route": "gallery",
                  "name": "gallery",
                  "type": "link"
                }
              ]
            },
            {
              "route": "forms",
              "name": "forms",
              "type": "sub",
              "icon": "description",
              "children": [
                {
                  "route": "elements",
                  "name": "form-elements",
                  "type": "link"
                },
                {
                  "route": "dynamic",
                  "name": "dynamic-form",
                  "type": "link"
                },
                {
                  "route": "select",
                  "name": "select",
                  "type": "link"
                },
                {
                  "route": "datetime",
                  "name": "datetime",
                  "type": "link"
                }
              ],
              "permissions": {
                "except": "GUEST"
              }
            },
            {
              "route": "tables",
              "name": "tables",
              "type": "sub",
              "icon": "format_line_spacing",
              "children": [
                {
                  "route": "kitchen-sink",
                  "name": "kitchen-sink",
                  "type": "link"
                },
                {
                  "route": "remote-data",
                  "name": "remote-data",
                  "type": "link"
                }
              ],
              "permissions": {
                "except": "GUEST"
              }
            },
            {
              "route": "profile",
              "name": "profile",
              "type": "sub",
              "icon": "person",
              "children": [
                {
                  "route": "overview",
                  "name": "overview",
                  "type": "link"
                },
                {
                  "route": "settings",
                  "name": "settings",
                  "type": "link"
                }
              ]
            },
            {
              "route": "https://ng-matero.github.io/extensions/",
              "name": "extensions",
              "type": "extTabLink",
              "icon": "extension",
              "permissions": {
                "only": "ADMIN"
              }
            },
            {
              "route": "/",
              "name": "sessions",
              "type": "sub",
              "icon": "question_answer",
              "children": [
                {
                  "route": "403",
                  "name": "403",
                  "type": "link"
                },
                {
                  "route": "404",
                  "name": "404",
                  "type": "link"
                },
                {
                  "route": "500",
                  "name": "500",
                  "type": "link"
                }
              ],
              "permissions": {
                "only": "ADMIN"
              }
            },
            {
              "route": "utilities",
              "name": "utilities",
              "type": "sub",
              "icon": "all_inbox",
              "children": [
                {
                  "route": "css-grid",
                  "name": "css-grid",
                  "type": "link"
                },
                {
                  "route": "css-helpers",
                  "name": "css-helpers",
                  "type": "link"
                }
              ]
            },
            {
              "route": "menu-level",
              "name": "menu-level",
              "type": "sub",
              "icon": "subject",
              "children": [
                {
                  "route": "level-1-1",
                  "name": "level-1-1",
                  "type": "sub",
                  "children": [
                    {
                      "route": "level-2-1",
                      "name": "level-2-1",
                      "type": "sub",
                      "children": [
                        {
                          "route": "level-3-1",
                          "name": "level-3-1",
                          "type": "sub",
                          "children": [
                            {
                              "route": "level-4-1",
                              "name": "level-4-1",
                              "type": "link"
                            }
                          ]
                        }
                      ]
                    },
                    {
                      "route": "level-2-2",
                      "name": "level-2-2",
                      "type": "link"
                    }
                  ]
                },
                {
                  "route": "level-1-2",
                  "name": "level-1-2",
                  "type": "link"
                }
              ],
              "permissions": {
                "only": "ADMIN"
              }
            }
          ];
          this.auth.setMenuStorage(this.dataMenu);
          this.router.navigateByUrl('/');
          this.toast.success('Bienvenido !', '', {
            timeOut: 3000,
            progressBar: true,
            closeButton: true,
            extendedTimeOut: 0,
            tapToDismiss: false,
          });
          this.isSubmitting = false;
        }
      });
  }
}
