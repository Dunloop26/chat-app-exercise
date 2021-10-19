import { Message } from '@angular/compiler/src/i18n/i18n_ast';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { io } from 'socket.io-client';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SocketioService {

  socket = io(environment.socket_endpoint);

  private subject? : BehaviorSubject<Message>;

  constructor() {

    this.socket.on('connect', () => {
      console.log('Socket connected');
    })

    this.socket.on('message', (msg: Message) => {
      console.log('Message on -> ', msg);
      this.subject?.next(msg);
    })

   }

   get messages$() : Observable<Message> | undefined {
     return this.subject?.asObservable();
   }

   sendMessage(msg : Message) {
     this.socket.emit('message', msg);
   }
}
