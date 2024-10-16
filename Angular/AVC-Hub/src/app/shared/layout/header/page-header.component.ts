import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-page-header',
  template: `
    <div class="feature-header justify-content-between align-items-center">
      <div class="start">
        <div class="title">
          <mat-icon *ngIf="icon" class="feature-icon">
            {{ icon }}
          </mat-icon>
          <ng-content select="h2"></ng-content>
          <ng-content select="p"></ng-content>
        </div>

      </div>

      <ng-content select=".action"></ng-content>
    </div>
  `,
  styles: [
    `
      .feature-header {
        background: white;
        padding: 15px 20px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 20px;

        position: sticky;
        top: 0;
        z-index: 9999;

        margin-bottom: 15px;
      }

      .title {
        display: flex;
        align-items: center;
        gap: 15px;
        height: 30px;
      }

      .feature-header > .start {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 10px;
      }
      .h2 {
        font-size: larger !important;
        margin:0px;
        padding:0px;
      }

      .feature-icon {
        font-size: 25px;
        width: 25px;
        height: auto;
      }
    `
  ]
})
export class PageHeaderComponent {
  @Input() icon?: string;
  info(i: any){
    
  }
}
