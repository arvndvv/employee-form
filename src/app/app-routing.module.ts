import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DetailsFormComponent } from 'src/app/components/details-form/details-form.component';
import { DetailsTableComponent } from 'src/app/components/details-table/details-table.component';
import { DetailsPresentGuard } from 'src/app/guards/details-present.guard';
import { BASIC_ROUTES } from 'src/app/routes/routes';

const routes: Routes = [
  {
    path: "",
    redirectTo: BASIC_ROUTES.table,
    pathMatch: 'full'
  },
  {
    path: BASIC_ROUTES.table,
    canActivate: [DetailsPresentGuard],
    component: DetailsTableComponent
  },
  {
    path: BASIC_ROUTES.form,
    component: DetailsFormComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
