import { Injectable, InjectionToken } from '@angular/core';
import { Doctor } from '../models/doctor';
import { Observable } from 'rxjs/Observable';

export interface DoctorService {
  find(): Observable<Doctor[]>;
}

export const DOCTOR_SERVICE = new InjectionToken<DoctorService>('DoctorService');

const doctors: Doctor[] = [
  new Doctor({
    slug: 'אני-כאן',
    title: 'דוקטור',
    firstName: 'אני',
    lastName: 'כאן',
    tagline: 'מאוד מוצלח',
    portraitPhotoUrl: 'https://randomuser.me/api/portraits/med/men/83.jpg',
    primaryPhoneNumber: '123'
  }),
  new Doctor({
    slug: 'אני-שם',
    title: 'דוקטור',
    firstName: 'אני',
    lastName: 'שם',
    tagline: 'פחות מוצלח',
    portraitPhotoUrl: 'https://randomuser.me/api/portraits/med/men/80.jpg',
    primaryPhoneNumber: '1234'
  }),
  new Doctor({
    slug: 'אני-12',
    title: 'פרופסור',
    firstName: 'אני',
    lastName: 'כאן',
    tagline: 'מאוד מוצלח',
    portraitPhotoUrl: 'https://randomuser.me/api/portraits/med/women/53.jpg',
    primaryPhoneNumber: '123'
  }),
  new Doctor({
    slug: 'אני-שם-2',
    title: 'דוקטור',
    firstName: 'אני',
    lastName: 'שם',
    tagline: 'פחות מוצלח',
    portraitPhotoUrl: 'https://randomuser.me/api/portraits/med/women/29.jpg',
    primaryPhoneNumber: '1234'
  }),
  new Doctor({
    slug: 'אני-כאן-3',
    title: 'דוקטור',
    firstName: 'אני',
    lastName: 'כאן',
    tagline: 'מאוד מוצלח',
    portraitPhotoUrl: 'https://randomuser.me/api/portraits/med/men/28.jpg',
    primaryPhoneNumber: '123'
  }),
  new Doctor({
    slug: 'אני-שם-4',
    title: 'דוקטור',
    firstName: 'אני',
    lastName: 'שם',
    tagline: 'פחות מוצלח',
    portraitPhotoUrl: 'https://randomuser.me/api/portraits/med/women/27.jpg',
    primaryPhoneNumber: '1234'
  }),
  new Doctor({
    slug: 'אני-כאן-5',
    title: 'דוקטור',
    firstName: 'אני',
    lastName: 'כאן',
    tagline: 'מאוד מוצלח',
    portraitPhotoUrl: 'https://randomuser.me/api/portraits/med/men/26.jpg',
    primaryPhoneNumber: '123'
  }),
  new Doctor({
    slug: 'אני-שם-6',
    title: 'דוקטור',
    firstName: 'אני',
    lastName: 'שם',
    tagline: 'פחות מוצלח',
    portraitPhotoUrl: 'https://randomuser.me/api/portraits/med/men/25.jpg',
    primaryPhoneNumber: '1234'
  }),
  new Doctor({
    slug: 'אני-כאן-7',
    title: 'דוקטור',
    firstName: 'אני',
    lastName: 'כאן',
    tagline: 'מאוד מוצלח',
    portraitPhotoUrl: 'https://randomuser.me/api/portraits/med/women/24.jpg',
    primaryPhoneNumber: '123'
  }),
  new Doctor({
    slug: 'אני-שם-8',
    title: 'דוקטור',
    firstName: 'אני',
    lastName: 'שם',
    tagline: 'פחות מוצלח',
    portraitPhotoUrl: 'https://randomuser.me/api/portraits/med/men/89.jpg',
    primaryPhoneNumber: '1234'
  }),
  new Doctor({
    slug: 'אני-כאן-9',
    title: 'דוקטור',
    firstName: 'אני',
    lastName: 'כאן',
    tagline: 'מאוד מוצלח',
    portraitPhotoUrl: 'https://randomuser.me/api/portraits/med/men/68.jpg',
    primaryPhoneNumber: '123'
  }),
  new Doctor({
    slug: 'אני-שם-10',
    title: 'דוקטור',
    firstName: 'אני',
    lastName: 'שם',
    tagline: 'פחות מוצלח',
    portraitPhotoUrl: 'https://randomuser.me/api/portraits/med/women/67.jpg',
    primaryPhoneNumber: '1234'
  }),
  new Doctor({
    slug: 'אני-כאן-11',
    title: 'דוקטור',
    firstName: 'אני',
    lastName: 'כאן',
    tagline: 'מאוד מוצלח',
    portraitPhotoUrl: 'https://randomuser.me/api/portraits/med/women/24.jpg',
    primaryPhoneNumber: '123'
  }),
  new Doctor({
    slug: 'אני-שם-12',
    title: 'דוקטור',
    firstName: 'אני',
    lastName: 'שם',
    tagline: 'פחות מוצלח',
    portraitPhotoUrl: 'https://randomuser.me/api/portraits/med/men/18.jpg',
    primaryPhoneNumber: '1234'
  }),
];

@Injectable()
export class InMemoryDoctorsService implements DoctorService {

  constructor() {
  }

  find() {
    return Observable.of(doctors);
  }
}
