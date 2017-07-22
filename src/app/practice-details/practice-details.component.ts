import { Component, Input } from '@angular/core';
import { Practice } from '../store/doctor';

@Component({
  selector: 'app-practice-details',
  templateUrl: './practice-details.component.html',
  styleUrls: ['./practice-details.component.scss']
})
export class PracticeDetailsComponent {

  @Input() practice: Practice;

  constructor() {
  }

}
