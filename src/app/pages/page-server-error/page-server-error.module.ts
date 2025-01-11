import { NgModule } from '@angular/core';
import { PageServerErrorRoutingModule } from './page-server-error-routing.module';
import { PgServerErrorComponent } from './pg-server-error/pg-server-error.component';


@NgModule({
  declarations: [
    PgServerErrorComponent,
  ],
  imports: [
    PageServerErrorRoutingModule
  ],
  exports: [ 
  ]
})
export class PageServerErrorModule { }
