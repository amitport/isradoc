import { Component, Input, OnInit } from '@angular/core';
import { Doctor } from '../store/doctor';

@Component({
  selector: 'app-doctor-list',
  templateUrl: './doctor-list.component.html',
  styleUrls: ['./doctor-list.component.scss']
})
export class DoctorListComponent {
  @Input() doctors: Doctor[];
}
