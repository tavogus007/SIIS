import { EventEmitter, Injectable, Output } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { environment } from '@env/environment';

@Injectable({
  providedIn: 'root'
})
export class SocketIoService extends Socket {

  @Output() outEven: EventEmitter<any> = new EventEmitter();
  @Output() callbackCM: EventEmitter<any> = new EventEmitter();
  @Output() callbackFI: EventEmitter<any> = new EventEmitter();
  @Output() callbackFIM: EventEmitter<any> = new EventEmitter();

  constructor() {
    super({
      url: environment.URL_API_SOCKET,
      options: {
        query: {
          nameRoom: 'CLIENTE'
        },
      }
    })
    this.listen();
  }

  listen = () => {
    this.ioSocket.on('evento', (res: any) => this.outEven.emit(res));
    this.ioSocket.on('event', (res: any) => this.callbackCM.emit(res));

    this.ioSocket.on('tolist', (res: any) => this.callbackFI.emit(res));
    this.ioSocket.on('callmonitor', (res: any) => this.callbackFIM.emit(res));
    
  }

  llamarFichas (data:any) {
    this.ioSocket.emit('call', data);
  }

  desconectarSocket(): void {
    this.ioSocket.disconnect();
  }
}
