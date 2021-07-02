import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { io } from 'socket.io-client';

@Injectable({
  providedIn: 'root'
})
export class SocketServiceService {

  private url = 'http://localhost:3000';
  private socket;

  constructor() { }

  connect(): Subject<MessageEvent> {

      this.socket = io(this.url, { transports: ['websocket'] });

      let observer = {
          next: (data: any) => {
             this.socket.emit('messageChat', JSON.stringify(data))
          }
      }

      let observable = new Observable(observer => {
          this.socket.on('messageChat', (data: any) => {
              observer.next(data);
          })
          return () => { this.socket.disconnect(); }
      })

      return Subject.create(observer, observable);
  }

}
