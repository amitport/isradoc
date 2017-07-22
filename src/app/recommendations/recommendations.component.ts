import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Recommendation } from '../store/doctor';

@Component({
  selector: 'app-recommendations',
  template: `
    <ng-container [ngSwitch]="recommendations?.length > 0">
      <div *ngSwitchCase="false">
        היה  הראשון להמליץ
      </div>
      <ul *ngSwitchCase="true">
        <li *ngFor="let recommendation of recommendations">
          {{recommendation.text}}
        </li>
      </ul>
    </ng-container>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RecommendationsComponent {

  @Input() recommendations: Recommendation[];

  constructor() {
  }

}
