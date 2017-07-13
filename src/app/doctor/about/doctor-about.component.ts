import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Doctor } from '../../models/doctor';

@Component({
  selector: 'app-doctor-about',
  templateUrl: './doctor-about.component.html',
  styleUrls: ['./doctor-about.component.scss']
})
export class DoctorAboutComponent implements OnInit {
  doctor: Doctor;

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.parent.data
      .subscribe(({doctor}: { doctor: Doctor }) => {
        this.doctor = doctor;
      });
  }

}
