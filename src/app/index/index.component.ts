import { Component } from '@angular/core';
import { Doctor } from '../store/doctor';
import { DoctorsService } from '../store/doctors.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent {
  queryDone: boolean;
  query: string;
  doctors: Doctor[] = [];

  constructor(route: ActivatedRoute,
              private _router: Router,
              private _doctorsService: DoctorsService) {
    const query = route.snapshot.queryParamMap.get('query');
    if (query) {
      this.query = query;
      this.updateDoctors();
    }
  }

  onSubmit() {
    this.query = this.query.trim();
    this._router.navigate([], {
      queryParams: {query: this.query},
    });

    this.updateDoctors();
  }

  updateDoctors() {
    this.queryDone = false;
    if (this.query) {
      this._doctorsService.find(this.query).subscribe((doctors) => {
        this.queryDone = true;
        this.doctors = doctors;
      });
    }
  }

}
