import {Component} from '@angular/core';
import {Breadcrumbs} from '../../vendasta/va-breadcrumbs';

/**
 * @title Basic icons
 */
@Component({
  selector: 'va-breadcrumbs-overview-example',
  templateUrl: 'va-breadcrumbs-overview-example.html',
  styleUrls: ['va-breadcrumbs-overview-example.css'],
})
export class VaBreadcrumbsOverviewExample {
  breadcrumbs: Breadcrumbs[] = [
    {url: '/', text: 'Vendasta Material'},
    {text: 'Vendasta Breadcrumbs Component Docs'}
  ];
}
