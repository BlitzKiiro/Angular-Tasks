import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EventsService {
  private subject = new Subject();

  publish(eventName: string, payload: any) {
    this.subject.next({ eventName, payload });
  }

  subscribe(eventName: string, callback: (payload: any) => void) {
    this.subject.subscribe((nexObj: any) => {
      if (nexObj.eventName === eventName) {
        callback(nexObj.payload);
      }
    });
  }
  unsubscribe() {
    this.subject.unsubscribe();
  }
}
