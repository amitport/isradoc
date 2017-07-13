import { Component } from '@angular/core';
import { MdSnackBar } from '@angular/material';
import { Router } from '@angular/router';
import { LoadingIndicator } from '../loading-indicator.service';
import { Observable } from 'rxjs/Observable';

import { fade } from '../animations';

@Component({
  selector: 'app-page',
  animations: [fade],
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.scss']
})
export class PageComponent {
  isLoading: Observable<boolean>;
  loading: boolean;

  constructor(private snackBar: MdSnackBar,
              private router: Router,
              public loadingIndicator: LoadingIndicator) {
  }

  signOut() {
    this.snackBar.open('not implemented', null, {duration: 2000});
  }
}
