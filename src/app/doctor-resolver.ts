import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { Doctor } from 'app/models/doctor';
import { Observable } from 'rxjs/Observable';
import { AngularFireDatabase } from 'angularfire2/database';
import 'rxjs/add/operator/first';

@Injectable()
export class DoctorResolver implements Resolve<Doctor> {
  constructor(private db: AngularFireDatabase) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Doctor | Observable<Doctor> | Promise<Doctor> {
    const doctorId = route.params['doctorId'];

    return this.db.object(`/doctors/${doctorId}`).first();
  }
}
