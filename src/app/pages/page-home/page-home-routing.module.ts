import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PgHomeComponent } from './pg-home/pg-home.component';

const routes: Routes = [
  { path: '', component: PgHomeComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PageHomeRoutingModule { }
