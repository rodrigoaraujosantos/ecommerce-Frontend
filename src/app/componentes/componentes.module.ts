import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { FooterComponent } from './footer/footer.component';
import { MaterialModule } from '../shared/material.module';
import { Router, RouterModule } from '@angular/router';
import { DetailsAdminComponent } from './details-admin/details-admin.component';

import { GraficoBarraComponent } from './dashboard/grafico-barra/grafico-barra.component';
import { GraficoPizzaComponent } from './dashboard/grafico-pizza/grafico-pizza.component';
import { NgChartsModule } from 'ng2-charts';





@NgModule({
  declarations: [
    NavBarComponent,
    FooterComponent,
    DetailsAdminComponent,
    GraficoBarraComponent,
    GraficoPizzaComponent,
  
    
  ],
  imports: [
    CommonModule,
   MaterialModule,
    RouterModule,
    NgChartsModule
    
  ],
  exports:[NavBarComponent,FooterComponent,GraficoBarraComponent,
    GraficoPizzaComponent]
})
export class ComponentesModule { }
