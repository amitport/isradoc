import { Component, Inject, OnInit } from '@angular/core';
import { Doctor } from './models/doctor';
import { DOCTOR_SERVICE, DoctorService } from './store/doctor.service';

interface AppState {
  counter: number;
}

@Component({
  selector: 'id-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  x: any;
  doctors: Doctor[];

  constructor(@Inject(DOCTOR_SERVICE) private doctorService: DoctorService) {
    this.x = doctorService;
  }

  ngOnInit() {
    this.getDoctors();
  }

  getDoctors() {
    this.doctorService.find()
      .subscribe(
        doctors => this.doctors = doctors
      );
  }
}
