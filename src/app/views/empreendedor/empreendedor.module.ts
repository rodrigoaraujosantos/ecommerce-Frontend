import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmpreendedorRoutingModule } from './empreendedor-routing.module';
import { EmpreendedorComponent } from './empreenderdor/empreendedor.component';
import { DashboardEmpreenComponent } from './dashboard-empreen/dashboard-empreen.component';
import { NgChartsModule } from 'ng2-charts';

import { MaterialModule } from 'src/app/shared/material.module';
import { ComponentesModule } from 'src/app/componentes/componentes.module';
import { ProdutosEmpreendedorComponent } from './produtos-empreendedor/produtos-empreendedor.component';
import { PedidosEmpreendedorComponent } from './pedidos-empreendedor/pedidos-empreendedor.component';
import { FormsModule } from '@angular/forms';



@NgModule({
    declarations: [
        EmpreendedorComponent,
        DashboardEmpreenComponent,
        ProdutosEmpreendedorComponent,
        PedidosEmpreendedorComponent
    ],
    imports: [
        CommonModule,
        EmpreendedorRoutingModule,
        NgChartsModule,
        ComponentesModule,
        MaterialModule,
        FormsModule
    ]
})
export class EmpreendedorModule { }
