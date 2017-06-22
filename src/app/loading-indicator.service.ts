import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import 'rxjs/add/operator/finally';

@Injectable()
export class LoadingIndicator extends BehaviorSubject<boolean> {
  processCount = 0;

  constructor() {
    super(false);
  }

  addProcess(process: Observable<any>) {
    if (this.getValue() !== true) {
      this.next(true);
    }
    this.processCount++;
    process.finally(() => {
      this.processCount--;
      if (this.processCount === 0) {
        this.next(false);
      }
    }).subscribe();
  }
}
