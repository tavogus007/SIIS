import { Component } from '@angular/core';
import { SocketIoService } from 'app/routes/socket/socket-io.service';

@Component({
  selector: 'app-page-monitor',
  standalone: true,
  imports: [],
  templateUrl: './page-monitor.component.html',
  styleUrl: './page-monitor.component.scss'
})
export class PageMonitorComponent {

  audio: any;
  constructor(
    private socketWebService: SocketIoService
  ) {
    socketWebService.callbackFIM.subscribe(res => {
      console.log(res);
      
      if (res) {
        this.llamarFichaMonitor(res);
      }
    })

  }

  ngOnInit(): void {
    
    this.audio = new Audio('audio/ding.mp3');
    this.llamarFichaMonitor("data");
  }

  llamarFichaMonitor(data: any) {
    this.audio.loop = true;
    this.audio.play();
    setTimeout(() => {
      this.audio.pause();
      this.audio.currentTime = 0;
      speechSynthesis.speak(new SpeechSynthesisUtterance("FICHA  FAVOR PASAR POR  "));
    }, 2000);
    speechSynthesis.speak(new SpeechSynthesisUtterance("FICHA  FAVOR PASAR POR  "));    
  }

}
