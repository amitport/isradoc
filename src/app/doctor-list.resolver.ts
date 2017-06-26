import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, Resolve } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/delay';

@Injectable()
export class DoctorListResolver implements Resolve<{}> {
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<{}> | Promise<{}> | {} {
    return Observable.of({test: true}).delay(5000);
  }
}
