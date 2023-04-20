import { Injectable } from '@angular/core';
import { HubConnection, HubConnectionBuilder } from '@microsoft/signalr';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SignalRService {
  private hubConnection: HubConnection | any;
  private receivedMessageObject: BehaviorSubject<any> = new BehaviorSubject([]);

  constructor() {}

  public startConnection = () => {
    this.hubConnection = new HubConnectionBuilder()
      .withUrl('<your SignalR server URL>')
      .build();

    this.hubConnection
      .start()
      .then(() => console.log('Connection started'))
      .catch((err:any) => console.log('Error while starting connection: ' + err));
  };

  public addTransferChatDataListener = () => {
    this.hubConnection.on('transferchatdata', (data:any) => {
      this.receivedMessageObject.next(data);
    });
  };

  public sendMessage = (message: string, user: string) => {
    this.hubConnection.invoke('sendToAll', user, message);
  };

  public getMessageObject(): BehaviorSubject<any> {
    return this.receivedMessageObject;
  }
}
