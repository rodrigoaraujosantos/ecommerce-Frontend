import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProdutosRoutingModule } from './produtos-routing.module';
import { ProdutosComponent } from './produtos/produtos.component';
import { EditarProdutoComponent } from './editar-produto/editar-produto.component';
import { NovoProdutoComponent } from './novo-produto/novo-produto.component';
import { DetalhesProdutoComponent } from './detalhes-produto/detalhes-produto.component';
import { MaterialModule } from 'src/app/shared/material.module';
import { ProdutoService } from 'src/app/services/produto.service';
import {  FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ComponentesModule } from 'src/app/componentes/componentes.module';




@NgModule({
  declarations: [
    ProdutosComponent,
    DetalhesProdutoComponent,
    EditarProdutoComponent,
    NovoProdutoComponent,
    
  ],
  imports: [
    CommonModule,
    ProdutosRoutingModule,
    MaterialModule,
    FormsModule,
    ComponentesModule,
    ReactiveFormsModule
  ],

    providers: [ProdutoService],
    bootstrap: [ProdutosComponent]
 
})
export class ProdutosModule { }