import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Doctor } from '../store/doctor';

@Component({
  selector: 'app-doctor',
  templateUrl: './doctor.component.html',
  styleUrls: ['./doctor.component.scss']
})
export class DoctorComponent implements OnInit {
  doctor: Doctor;

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.doctor = this.route.snapshot.data.doctor;
  }
}
