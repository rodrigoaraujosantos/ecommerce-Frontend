import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PerfilRoutingModule } from './perfil-routing.module';
import { PerfilComponent } from './perfil/perfil.component';
import { MaterialModule } from 'src/app/shared/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatTabsModule}  from '@angular/material/tabs';
import { CarrinhoComponent } from './carrinho/carrinho.component';
import { MinhasComprasComponent } from './minhas-compras/minhas-compras.component';
import { ComponentesModule } from 'src/app/componentes/componentes.module';
import { MatIconModule } from '@angular/material/icon';






@NgModule({
  declarations: [
    PerfilComponent,
    CarrinhoComponent,
    MinhasComprasComponent
  ],
  imports: [
    CommonModule,
    PerfilRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
    MatTabsModule,
    ComponentesModule,
    MatIconModule
    
    
    

  ]

})
export class PerfilModule { }
