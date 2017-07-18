import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Doctor } from '../store/doctor';
import { DoctorsService } from '../store/doctors.service';

@Injectable()
export class DoctorResolver implements Resolve<Doctor> {

  constructor(private _doctorsService: DoctorsService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this._doctorsService.findBySlug(route.paramMap.get('doctorSlug'));
  }
}
