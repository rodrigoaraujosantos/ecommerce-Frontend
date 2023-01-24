import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClienteRoutingModule } from './cliente-routing.module';
import { ClienteComponent } from './cliente/cliente.component';
import { ComponentesModule } from "../../componentes/componentes.module";

import { MaterialModule } from 'src/app/shared/material.module';



@NgModule({
    declarations: [
        ClienteComponent,
    ],
    imports: [
        CommonModule,
        ClienteRoutingModule,
        ComponentesModule,
        MaterialModule
    ]
})
export class ClienteModule { }
