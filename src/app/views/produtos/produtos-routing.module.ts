import { AuthGuard } from './../../guards/auth.guard';

import { NovoProdutoComponent } from './novo-produto/novo-produto.component';
import { EditarProdutoComponent } from './editar-produto/editar-produto.component';
import { DetalhesProdutoComponent } from './detalhes-produto/detalhes-produto.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProdutosComponent } from './produtos/produtos.component';


const routes: Routes = [
  { path: '', component: ProdutosComponent },

  { path: 'produto/detalhe/:id', component: DetalhesProdutoComponent,
    canActivate:[AuthGuard] },

  { path: 'produto/:id', component: EditarProdutoComponent },

  { path: 'novo', component: NovoProdutoComponent },

  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProdutosRoutingModule { }
