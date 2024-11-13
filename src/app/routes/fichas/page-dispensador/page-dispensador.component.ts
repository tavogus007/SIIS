import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { SocketIoService } from 'app/routes/socket/socket-io.service';

@Component({
  selector: 'app-page-dispensador',
  standalone: true,
  imports: [MatButtonModule, MatDividerModule, MatIconModule],
  templateUrl: './page-dispensador.component.html',
  styleUrl: './page-dispensador.component.scss'
})
export class PageDispensadorComponent {

  constructor(
    private socketWebService: SocketIoService
  ) {
    socketWebService.callbackFI.subscribe(res => {
      console.log("--00--->", res);
      
    })
  }

  funcionLlamar(){
    this.socketWebService.llamarFichas('data');
  }

  ngOnDestroy(): void {
    this.socketWebService.desconectarSocket();
    console.log('Desconectado del WebSocket');
  }

}
