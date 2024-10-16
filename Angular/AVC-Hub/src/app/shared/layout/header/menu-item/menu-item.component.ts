import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { IMenu, IMenuItem } from '../../../../../core/interfaces/menu.interface';

@Component({
  selector: 'app-menu-item',
  template: `
    <mat-list dense>
      <ng-container *ngFor="let item of menu">
        <!-- If the item doesn't have children show it as list item-->
        <ng-container *ngIf="!item.subMenu"  >
          <mat-list-item
            *ngIf="item.title"
            [routerLink]="item.link"
            routerLinkActive="active"
            [routerLinkActiveOptions]="{ exact: true }"
            
          >
            <mat-icon style="primary" mat-list-icon>
              {{ item.icon }}
            </mat-icon>
            <span mat-line class="list-item">{{ item.title }}</span>
          </mat-list-item>
        </ng-container>

        <!-- If the item has subMenu show it as accordion-->
        <ng-container *ngIf="!!item.subMenu">
          
          
          <mat-expansion-panel >
            <mat-expansion-panel-header  (click)="toggleExpansion(item)">
              <mat-list-item >
              <mat-panel-title >
                <mat-icon  mat-list-icon>
                  {{ item.icon }}
                </mat-icon>
                <span mat-line class="list-item">{{ item.title }}</span>
              </mat-panel-title>
            </mat-list-item>
            </mat-expansion-panel-header>
                <app-menu-item [menu]="item.subMenu"></app-menu-item>
            </mat-expansion-panel>
        </ng-container>
      </ng-container>
    </mat-list>
  `,
  styleUrls: ['./menu-item.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MenuItemComponent {
  @Input() menu: IMenu = [];
  toggleExpansion(item: IMenuItem) {
    console.log({item})
    // Cierra todos los otros submenús en el mismo nivel
    this.menu.forEach(i => {
      if (i !== item) {
        i.expanded = false;
      }
    });
    item.expanded = !item.expanded; // Cambia el estado del panel seleccionado
  }
}