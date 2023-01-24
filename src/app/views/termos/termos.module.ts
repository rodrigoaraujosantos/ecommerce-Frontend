import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TermosRoutingModule } from './termos-routing.module';
import { TermosComponent } from './termos/termos.component';
import {MatRadioModule} from '@angular/material/radio';
import { ComponentesModule } from 'src/app/componentes/componentes.module';


@NgModule({
  declarations: [
    TermosComponent
  ],
  imports: [
    CommonModule,
    TermosRoutingModule,
    MatRadioModule,
    ComponentesModule
  ]
})
export class TermosModule { }
