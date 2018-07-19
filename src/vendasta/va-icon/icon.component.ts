import {Component, Input} from '@angular/core';

export interface IconDescriptor {
  iconUrl: string;
  name: string;
  diameter?: number;
}

@Component({
  selector: 'va-icon',
  template: `

<div class='va-icon-container' [style.background-color]="iconUrl ? '' : getIconColorForName()" [ngStyle]="getIconSize()">
    <img class="icon-size" *ngIf="iconUrl" [src]="iconUrl">
    <span *ngIf="iconName && !iconUrl">
        {{ getAbbreviationForName() }}
    </span>
    <div *ngIf="!iconUrl && !iconName" class="stencil-icon shimmer"></div>
</div>
`,
  styleUrls: ['./icon.component.scss']
})
export class IconComponent {
  @Input() iconUrl: string;
  // tslint:disable-next-line
  @Input('name') iconName: string; // it seems like the angular template is not recognizing the variable 'name'
  @Input() diameter = 60;

  private getAbbreviationForName(): string {
    const defaultAbbreviation = 'U';  // untitled
    if (this.iconName) {
      // example input "Partner Central"
      // example output "PC"

      // example input "Partner"
      // example output "P"
      const names = this.iconName.split(' ');
      return names.length > 1 ? names[0][0] + names[1][0] : names[0][0];
    }
    return defaultAbbreviation;
  }

  getIconColorForName(): string {
    // determine an icon color for a product with no icon by using the product name
    const COLOR_CODES = [
      '#EF5350', '#42A5F5', '#66BB6A', '#FFA726', '#AB47BC', '#FFCA28', '#EC407A', '#26C6DA',
      '#FF7B57'
    ];
    let nameSum = 0;
    const defaultColor = '#808080';
    if (!this.iconName) {
      return defaultColor;
    }
    for (let i = 0; i < this.iconName.length; i++) {
      nameSum += this.iconName[i].charCodeAt(0);
    }
    const index = nameSum % COLOR_CODES.length;

    return COLOR_CODES[index];
  }

  getIconSize(): any {
    return {'font-size': this.diameter + 'px'};
  }
}
