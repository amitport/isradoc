import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Recommendation } from '../store/doctor';

@Component({
  selector: 'app-recommendations',
  template: `
    <div class="details-toolbar">
      המלצות
    </div>
    <div style="margin: 16px 8px;" fxLayout="column" class="details-content mat-h3" >
        <ul *ngIf="recommendations?.length > 0">
          <li *ngFor="let recommendation of recommendations">
            {{recommendation.text}}
          </li>
        </ul>
      <div fxLayout="row" fxLayoutAlign="start center">
        <div *ngIf="recommendations?.length === 0">
          לא נמצאו המלצות
        </div>
        <div fxFlex></div>
        <button md-raised-button color="warn">
          <md-icon>add</md-icon>
          הוספת המלצה
        </button>
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RecommendationsComponent {

  @Input() recommendations: Recommendation[];

  constructor() {
  }

}
