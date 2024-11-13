import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { AuthService } from '@core/authentication';
import { LoginComponent } from './login.component';
import { of, throwError } from 'rxjs';

describe('(1) TEST del componente "LoginComponent"', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let authServiceSpy: jasmine.SpyObj<AuthService>;
  let toastrServiceSpy: jasmine.SpyObj<ToastrService>;

  beforeEach(async () => {
    const authSpy = jasmine.createSpyObj('AuthService', ['loginAdministracion', 'storageToken', 'setDataStorage', 'setGenericSession', 'setMenuStorage']);
    const toastrSpy = jasmine.createSpyObj('ToastrService', ['error', 'success']);

    await TestBed.configureTestingModule({
      imports: [ // Aquí estamos importando el componente standalone
        LoginComponent,
        HttpClientTestingModule,
        ReactiveFormsModule,
        FormsModule,
        BrowserAnimationsModule,
        MatButtonModule,
        MatCardModule,
        MatFormFieldModule,
        MatInputModule,
        ToastrModule.forRoot(),
      ],
      providers: [
        { provide: AuthService, useValue: authSpy },
        { provide: ToastrService, useValue: toastrSpy }
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    authServiceSpy = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;
    toastrServiceSpy = TestBed.inject(ToastrService) as jasmine.SpyObj<ToastrService>;

    fixture.detectChanges();
  });

  // Verificar si el componente existe
  it('Debe crear el LoginComponent', () => {
    expect(component).toBeTruthy();
  });

  // Verificar si el formulario es inválido cuando los campos están vacíos
  it('Debe retornar formulario inválido cuando los campos están vacíos', () => {
    component.loginForm.controls['username'].setValue('');
    component.loginForm.controls['password'].setValue('');
    expect(component.loginForm.invalid).toBeTrue();
    //expect(component.loginForm.invalid).toBeFalse();
  });

  // Verificar si el formulario es válido cuando los campos están completos
  it('Debe retornar formulario válido cuando los campos están completos', () => {
    component.loginForm.controls['username'].setValue('user_test');
    component.loginForm.controls['password'].setValue('123456');
    expect(component.loginForm.valid).toBeTrue();
  });

  // Probar la función obtenerSaludo
  it('Debe retornar un saludo basado en la hora actual', () => {
    const saludo = component.obtenerSaludo('Vladimir');
    expect(saludo).toContain('Vladimir');
    expect(saludo).toContain('¡Bienvenido al Sistema de Salud!');
  });

  // Simulación de éxito en la autenticación
  it('Debe mostrar un mensaje de éxito en autenticación exitosa', () => {
    authServiceSpy.loginAdministracion.and.returnValue(of({ status: 200, data: [{}], token: 'fake-token' }));
    
    component.loginForm.controls['username'].setValue('user_test');
    component.loginForm.controls['password'].setValue('123456');
    component.loginAdministracion();
    
    expect(authServiceSpy.storageToken).toHaveBeenCalledWith('fake-token');
    expect(toastrServiceSpy.success).toHaveBeenCalledWith('Bienvenido !', '', jasmine.any(Object));
  });
/*
  // Simulación de error en la autenticación
  it('Debe mostrar un mensaje de error en autenticación fallida', () => {
    authServiceSpy.loginAdministracion.and.returnValue(throwError({ status: 300, data: 'Credenciales incorrectas' }));
    
    component.loginForm.controls['username'].setValue('user_test');
    component.loginForm.controls['password'].setValue('wrong_password');
    component.loginAdministracion();
    
    expect(toastrServiceSpy.error).toHaveBeenCalledWith('Credenciales incorrectas', '', jasmine.any(Object));
    expect(component.isSubmitting).toBeFalse();
  });*/
});
