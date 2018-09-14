import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';

import {VaBreadcrumbsComponent} from './breadcrumbs.component';

@NgModule({
    declarations: [VaBreadcrumbsComponent],
    imports: [
        CommonModule,
        RouterModule
     ],
    exports: [VaBreadcrumbsComponent]
  })
export class VaBreadcrumbsModule { }
