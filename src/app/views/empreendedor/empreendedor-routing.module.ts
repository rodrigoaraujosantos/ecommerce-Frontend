import { ProdutosEmpreendedorComponent } from './produtos-empreendedor/produtos-empreendedor.component';
import { DashboardEmpreenComponent } from './dashboard-empreen/dashboard-empreen.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmpreendedorComponent } from './empreenderdor/empreendedor.component';
import { PedidosEmpreendedorComponent } from './pedidos-empreendedor/pedidos-empreendedor.component';


const routes: Routes = [
  { path: '', component: EmpreendedorComponent },

  // { path: 'dashboard-Empreendedor', component: DashboardEmpreenComponent },
  
  { path: 'produto-Empreendedor', component: ProdutosEmpreendedorComponent },

  { path: 'pedidos-Empreendedor', component: PedidosEmpreendedorComponent }
  

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmpreendedorRoutingModule { }
