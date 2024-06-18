import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable, Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class LoadingService {
  loading$: Subject<boolean> = new BehaviorSubject(false);

  constructor() {
  }

  createLoadingEvent() {
    this.loading$.next(true);
  }

  stopLoadingEvent() {
    this.loading$.next(false);
  }

  getLoadingObservable() {
    return this.loading$.asObservable();
  }
}
