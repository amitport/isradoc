import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { LoadingIndicator } from '../loading-indicator.service';

@Component({
  selector: 'id-doctor-browser',
  templateUrl: './doctor-browser.component.html',
  styleUrls: ['./doctor-browser.component.scss']
})
export class DoctorBrowserComponent implements OnInit {
  doctors: FirebaseListObservable<any[]>;

  constructor(db: AngularFireDatabase,
              loadingIndicator: LoadingIndicator) {
    this.doctors = db.list('/doctors');

    loadingIndicator.addProcess(this.doctors.first());
  }

  ngOnInit() {
  }

}
