import { Component, OnInit, AfterViewInit, inject } from '@angular/core';
import { PreloaderService, SettingsService } from '@core';
import { RouterOutlet } from '@angular/router';
import { NgxSpinnerModule } from 'ngx-spinner';
import { SwPush } from '@angular/service-worker';
import { ServiciosService } from './routes/servicios/servicios.service';

@Component({
  selector: 'app-root',
  template: `<router-outlet />
  <ngx-spinner bdColor = "rgba(0, 0, 0, 0.8)" size = "default" color = "#fff" type = "square-jelly-box" [fullScreen] = "false" template = "<div> <img src='../../../images/iconos/salud-unscreen.gif'> </div>"><p style="color: white" > Loading... </p></ngx-spinner>
  `,
  standalone: true,
  imports: [
    RouterOutlet,
    NgxSpinnerModule
  ],
})
export class AppComponent implements OnInit, AfterViewInit {
  private readonly preloader = inject(PreloaderService);
  private readonly settings = inject(SettingsService);

  readonly VAPID_PUBLIC_KEY = 'BIhRhdVLw92el-LnEkmnfigN-HDiUfog5jx67qQu_iu4aiglpO57-tBd5ZNugumzlzXaklHTO0m42mvT1fKE1Kc';

  constructor(
    private swPush: SwPush,
    private http: ServiciosService) {
    this.notificacion();
  }

  ngOnInit() {
    this.settings.setDirection();
    this.settings.setTheme();
  }

  ngAfterViewInit() {
    this.preloader.hide();
  }

  notificacion() {
    //this.swPush.requestSubscription(options: { serverPublickey: this.VAPID_PUBLIC_KEY }).then()



    ////////////////////////////////////DESCOMENTAR//////////////////////////////////////
    /*
      if ('serviceWorker' in navigator && this.swPush.isEnabled) {
        this.swPush.requestSubscription({
          serverPublicKey: this.VAPID_PUBLIC_KEY
        }).then(subscription => {
          console.log("Suscripción exitosa:", subscription);
        }).catch(err => {
          console.error("No se pudo suscribir a las notificaciones", err);
        });
      } else {
        console.error("Service workers are disabled or not supported by this browser");
      }
    */
    ////////////////////////////////////DESCOMENTAR//////////////////////////////////////

    /*if ('serviceWorker' in navigator && this.swPush.isEnabled) {
      this.swPush.requestSubscription({
        serverPublicKey: this.VAPID_PUBLIC_KEY
      }).then(subscription => {
        console.log("Suscripción exitosa:", subscription);
      }).catch(err => {
        console.error("No se pudo suscribir a las notificaciones", err);
      });
    } else {
      console.error("Service workers are disabled or not supported by this browser");
      alert("Tu navegador no soporta service workers o están deshabilitados. Para utilizar todas las funciones, prueba con un navegador compatible como Chrome o Firefox.");
    }*/
    


    
    /*this.swPush.requestSubscription({
      serverPublicKey: this.VAPID_PUBLIC_KEY
    })
      .then(sub => this.http.addPushSubscriber(sub).subscribe())
      .catch(err => console.error("Could not subscribe to notifications", err));*/
  }
}
