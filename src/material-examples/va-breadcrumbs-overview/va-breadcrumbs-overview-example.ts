import {Component} from '@angular/core';

/**
 * @title Basic icons
 */
@Component({
  selector: 'va-breadcrumbs-overview-example',
  templateUrl: 'va-breadcrumbs-overview-example.html',
  styleUrls: ['va-breadcrumbs-overview-example.css'],
})
export class VaBreadcrumbsOverviewExample {
  breadcrumbs = [
    {url: '/', text: 'Vendasta Material'},
    {text: 'Vendasta Breadcrumbs Component Docs'}
  ];
}
