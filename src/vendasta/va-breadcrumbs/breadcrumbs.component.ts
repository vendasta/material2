import {Component, Input} from '@angular/core';
import {Breadcrumbs} from './breadcrumbs';

@Component({
    selector: 'va-breadcrumbs',
    styleUrls: ['./breadcrumbs.component.scss'],
    template: `
    <ul>
        <li [ngClass]="{'parent': breadcrumb.url}" *ngFor="let breadcrumb of breadcrumbs">
            <a *ngIf="breadcrumb.url" [routerLink]="breadcrumb.url">
                <span class="left-arrow">&lsaquo;</span>
                {{ breadcrumb.text }}
            </a>
            <span *ngIf="!breadcrumb.url">
                {{ breadcrumb.text }}
            </span>
            <span class="right-arrow">&rsaquo;</span>
        </li>
    </ul>
    `
})
export class VaBreadcrumbsComponent {
    @Input() breadcrumbs: Breadcrumbs[];
}
