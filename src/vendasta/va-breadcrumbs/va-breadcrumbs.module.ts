import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';

import {VaBreadcrumbsComponent} from './va-breadcrumbs.component';

@NgModule({
    declarations: [VaBreadcrumbsComponent],
    imports: [
        CommonModule,
        RouterModule
     ],
    exports: [VaBreadcrumbsComponent]
  })
export class VaBreadcrumbsModule { }
