import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FaqRoutingModule } from './faq-routing.module';
import { FaqComponent } from './faq/faq.component';
import {MatExpansionModule} from '@angular/material/expansion';
import { ComponentesModule } from 'src/app/componentes/componentes.module';



@NgModule({
  declarations: [
    FaqComponent
  ],
  imports: [
    CommonModule,
    FaqRoutingModule,
    MatExpansionModule,
    ComponentesModule
  ]
})
export class FaqModule { }

