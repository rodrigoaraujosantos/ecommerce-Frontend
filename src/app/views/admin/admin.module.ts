import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin/admin.component';
import { DashboardAdminComponent } from './dashboard-admin/dashboard-admin.component';
import { RelacaoDeUsuariosComponent } from './relacao-de-usuarios/relacao-de-usuarios.component';
import { ComponentesModule } from "../../componentes/componentes.module";
import {MatToolbarModule} from '@angular/material/toolbar';
import { MaterialModule } from 'src/app/shared/material.module';
import { PedidosComponent } from './pedidos/pedidos.component';
import { EditarUsuarioComponent } from './editar-usuario/editar-usuario.component';
import { RelacaoProdutosComponent } from './relacao-produtos/relacao-produtos.component';



@NgModule({
    declarations: [
        AdminComponent,
        DashboardAdminComponent,
        RelacaoDeUsuariosComponent,
        PedidosComponent,
        EditarUsuarioComponent,
        RelacaoProdutosComponent,


       

    ],
    imports: [
        CommonModule,
        AdminRoutingModule,
        ComponentesModule,
        MatToolbarModule,
        MaterialModule,
        FormsModule
    ]
})
export class AdminModule { }
