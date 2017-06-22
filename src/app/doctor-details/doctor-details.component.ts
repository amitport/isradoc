import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LoadingIndicator } from '../loading-indicator.service';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/delay';
import 'rxjs/add/observable/of';

@Component({
  selector: 'id-doctor-details',
  templateUrl: './doctor-details.component.html',
  styleUrls: ['./doctor-details.component.scss']
})
export class DoctorDetailsComponent implements OnInit {
  doctorId: string;

  constructor(private route: ActivatedRoute,
              private loadingIndicator: LoadingIndicator) {
  }

  ngOnInit() {
    this.doctorId = this.route.snapshot.params.doctorId;
    setTimeout(() => {

    this.loadingIndicator.addProcess(Observable.of(true).delay(4000));
    }, 3000)
  }
}
