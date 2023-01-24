import { EditarUsuarioComponent } from './editar-usuario/editar-usuario.component';
import { RelacaoDeUsuariosComponent } from './relacao-de-usuarios/relacao-de-usuarios.component';
import { DashboardAdminComponent } from './dashboard-admin/dashboard-admin.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin/admin.component';
import { PedidosComponent } from './pedidos/pedidos.component';
import { RelacaoProdutosComponent } from './relacao-produtos/relacao-produtos.component';
import { NovoProdutoComponent } from '../produtos/novo-produto/novo-produto.component';
import { EditarProdutoComponent } from '../produtos/editar-produto/editar-produto.component';


const routes: Routes = [
{ path: '', component: AdminComponent },

{ path: 'dashboard-adm', component: DashboardAdminComponent },

{ path: 'usuario', component: RelacaoDeUsuariosComponent },

{ path: 'pedidos', component: PedidosComponent},

{ path: 'usuario/edit/:id', component: EditarUsuarioComponent },

{ path: 'produtos', component: RelacaoProdutosComponent},

{ path: 'produtos/novo', component: NovoProdutoComponent },

{ path: 'produto/:id', component: EditarProdutoComponent }



];

@NgModule({
imports: [RouterModule.forChild(routes)],
exports: [RouterModule]
})
export class AdminRoutingModule { }
