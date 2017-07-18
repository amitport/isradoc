import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import { Doctor } from './doctor';
import { doctors } from './mock-data';

@Injectable()
export class DoctorsService {

  find(query: string): Observable<Doctor[]> {
    return Observable.of(doctors.filter((doctor) =>
      [doctor.listName, doctor.tagline]
        .some(field => field != null && field.includes(query))
    ));
  }

  findBySlug(slug): Observable<Doctor> {
    return Observable.of(doctors.find((doctor) => doctor.slug === slug));
  }

}
