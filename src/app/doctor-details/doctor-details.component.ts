import { Component, Input } from '@angular/core';
import { Doctor } from '../store/doctor';

@Component({
  selector: 'app-doctor-details',
  templateUrl: './doctor-details.component.html',
  styleUrls: ['./doctor-details.component.scss']
})
export class DoctorDetailsComponent {
  @Input() doctor: Doctor;

  constructor() { }
}
