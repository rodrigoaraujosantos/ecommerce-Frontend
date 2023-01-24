
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CarrinhoComponent } from './carrinho/carrinho.component';
import { MinhasComprasComponent } from './minhas-compras/minhas-compras.component';
import { PerfilComponent } from './perfil/perfil.component';


const routes: Routes = [
  { path: '', component: PerfilComponent },

  { path: 'compras/minhas-compras', component: MinhasComprasComponent },

  { path: 'compras/carrinho', component: CarrinhoComponent }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PerfilRoutingModule { }
