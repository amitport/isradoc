import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LoadingIndicator } from '../loading-indicator.service';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/delay';
import 'rxjs/add/observable/of';
import { Doctor } from 'app/models/doctor';

@Component({
  selector: 'id-doctor',
  templateUrl: './doctor.component.html',
  styleUrls: ['./doctor.component.scss']
})
export class DoctorComponent implements OnInit {
  doctor: Doctor;
  doctorId: string;

  constructor(private route: ActivatedRoute,
              private loadingIndicator: LoadingIndicator) {
  }

  ngOnInit() {
    this.route.data
      .subscribe(({doctor}: { doctor: Doctor }) => {
        this.doctor = doctor;
      });

    setTimeout(() => {

      this.loadingIndicator.addProcess(Observable.of(true).delay(500));
    }, 3000)
  }
}
