import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private data: any[] = [];
  private Id: any;
  private scrollPosition: number = 0;
  private activeCardId: string = '';
  
  setData(data: any[]) {
    this.data = data;
  }

  getData() {
    return this.data;
  }

  setScrollPosition(position: number) {
    this.scrollPosition = position;
  }

  getScrollPosition() {
    return this.scrollPosition;
  }

  setActiveCardId(cardId: string) {
    this.activeCardId = cardId;
  }

  getActiveCardId() {
    return this.activeCardId;
  }
  setID(Id: any) {
    this.Id = Id;
  }

  getID() {
    return this.Id;
  }
}
