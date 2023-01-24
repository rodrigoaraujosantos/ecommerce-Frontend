import { CadastroAdminComponent } from './cadastro-admin/cadastro-admin.component';
import { CadastroComponent } from './cadastro/cadastro.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './auth/auth.component';


const routes: Routes = [
{ path: '', component: AuthComponent },

{ path: 'cadastro', component: CadastroComponent },

{ path: 'novoAdmin', component: CadastroAdminComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
