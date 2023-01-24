import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PoliticaComponent } from './politica.component';

const routes: Routes = [{ path: '', component: PoliticaComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PoliticaRoutingModule { }
