import { Component, Input, OnInit } from '@angular/core';
import { SignalRService } from 'src/app/Service/signal-r.service';

@Component({
  selector: 'app-chat-box',
  templateUrl: './chat-box.component.html',
  styleUrls: ['./chat-box.component.css'],
})
export class ChatBoxComponent implements OnInit {
  message: string = '';
  chatMessages: any = [];
  @Input() username: any;
  constructor(private signalRService: SignalRService) {}

  ngOnInit(): void {
    // this.signalRService.startConnection();
    // this.signalRService.addTransferChatDataListener();
    // this.signalRService.getMessageObject().subscribe((data: any[]) => {
    //   this.chatMessages = data;
    //   console.log('this.chatMessages: ', this.chatMessages);
    // });
  }

  onChnage(event: any) {
    // console.log('event: ', event.target.value);
    this.message = event.target.value;
  }

  submit() {
    // this.signalRService.sendMessage(this.message, this.username);
    this.message = '';
  }
}
