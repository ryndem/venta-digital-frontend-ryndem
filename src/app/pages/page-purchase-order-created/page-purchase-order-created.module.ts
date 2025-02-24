import { NgModule } from '@angular/core';
import { PgPurchaseOrderCreatedComponent } from './pg-purchase-order-created/pg-purchase-order-created.component';
import { PagePurchaseOrderCreatedRoutingModule } from './page-purchase-order-created-routing.module';
import { AppCommonsModule } from 'app/module-app-commons/app-commons.module';
import { CommonModule } from '@angular/common';
import { OrderCommonsModule } from 'app/module-order-commons/order-commons.module';


@NgModule({
  declarations: [
    PgPurchaseOrderCreatedComponent,
  ],
  imports: [
    PagePurchaseOrderCreatedRoutingModule,
    OrderCommonsModule,
    AppCommonsModule,
    CommonModule
  ]
})

export class PagePurchaseOrderCreatedModule { }
