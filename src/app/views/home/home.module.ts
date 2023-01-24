import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home/home.component';
import { ComponentesModule } from "../../componentes/componentes.module";
import { MaterialModule } from 'src/app/shared/material.module';
import { CardComponent } from './home/card/card.component';



@NgModule({
    declarations: [
        HomeComponent,
        CardComponent
    ],
    imports: [
        CommonModule,
        HomeRoutingModule,
        ComponentesModule,
        MaterialModule
    ]
})
export class HomeModule { }
