import { Component, Input } from '@angular/core';
import { Doctor } from '../store/doctor';
import { animate, state, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-doctor-card',
  templateUrl: './doctor-card.component.html',
  styleUrls: ['./doctor-card.component.scss'],
  animations: [
    trigger(
      'fadeIn',
      [
        transition(
          ':enter', [
            style({opacity: 0}),
            animate('500ms', style({opacity: 1}))
          ]
        )
      ]
    )
  ]
})
export class DoctorCardComponent {
  @Input() doctor: Doctor;
  @Input() isListItem: boolean;
}
