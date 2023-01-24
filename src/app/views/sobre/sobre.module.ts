import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SobreRoutingModule } from './sobre-routing.module';
import { SobreComponent } from './sobre.component';
import { ComponentesModule } from "../../componentes/componentes.module";
import {MatCardModule} from '@angular/material/card';

@NgModule({
    declarations: [
        SobreComponent
    ],
    imports: [
        CommonModule,
        SobreRoutingModule,
        ComponentesModule,
        MatCardModule
    ]
})
export class SobreModule { }
