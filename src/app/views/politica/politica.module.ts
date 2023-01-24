import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PoliticaRoutingModule } from './politica-routing.module';
import { PoliticaComponent } from './politica.component';
import { ComponentesModule } from "../../componentes/componentes.module";


@NgModule({
    declarations: [
        PoliticaComponent
    ],
    imports: [
        CommonModule,
        PoliticaRoutingModule,
        ComponentesModule
    ]
})
export class PoliticaModule { }
