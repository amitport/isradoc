import { Component, Inject, OnInit } from '@angular/core';
import { DOCTOR_SERVICE, DoctorService } from '../store/doctor.service';
import { Doctor, Speciality } from '../models/doctor';
import { specialities } from '../models/specialities';
import { FormControl, FormGroup } from '@angular/forms';

import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';

import { Observable } from 'rxjs/Observable';

function validateSpeciality(c: FormControl) {
  if (!c.value) {
    return null;
  }

  return specialities.includes(c.value) ? null : {
    isSpeciality: {
      valid: false
    }
  };
}

@Component({
  selector: 'app-doctor-browser',
  templateUrl: './doctor-browser.component.html',
  styleUrls: ['./doctor-browser.component.scss']
})
export class DoctorBrowserComponent implements OnInit {
  readonly specialities = specialities;
  // readonly specialityCtrl = new FormControl();
  readonly doctorQueryForm = new FormGroup({
    speciality: new FormControl('', validateSpeciality)
  });

  readonly filteredSpecialities: Observable<Speciality[]>;

  doctors: Doctor[];

  query = {speciality: null};

  constructor(@Inject(DOCTOR_SERVICE) private doctorService: DoctorService) {
    this.doctorQueryForm.valueChanges
      .debounceTime(300)
      .distinctUntilChanged((a, b) => a.speciality === b.speciality)
      .subscribe(x => {
        // todo update query
        console.log(x)
      });
    this.filteredSpecialities = this.createFilteredOptionsSubject(this.doctorQueryForm.get('speciality'), this.specialities);
  }

  onBlur() {
    console.log(this.doctorQueryForm.get('speciality').hasError('isSpeciality'))
  }

  createFilteredOptionsSubject(formControl, options) {
    return formControl.valueChanges
      .startWith(null)
      .map((val: string) => val ? options.filter(option => option.name.search(val) !== -1) : options);
  }

  displayFn(speciality: any): string {
    return speciality ? speciality.name : speciality;
  }

  ngOnInit() {
    this.getDoctors();
  }

  getDoctors() {
    this.doctorService.find()
      .subscribe(
        doctors => {
          this.doctors = doctors
        }
      );
  }

  // doctors: FirebaseListObservable<any[]>;
  //
  // constructor(db: AngularFireDatabase,
  //             loadingIndicator: LoadingIndicator) {
  //   this.doctors = db.list('/doctors');
  //
  //   loadingIndicator.addProcess(this.doctors.first());
  // }
  //
  // ngOnInit() {
  // }

}
