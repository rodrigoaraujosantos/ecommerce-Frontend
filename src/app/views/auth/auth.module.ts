import { MaterialModule } from './../../shared/material.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthRoutingModule } from './auth-routing.module';
import { AuthComponent } from './auth/auth.component';
import { CadastroAdminComponent } from './cadastro-admin/cadastro-admin.component';
import { CadastroComponent } from './cadastro/cadastro.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ComponentesModule } from 'src/app/componentes/componentes.module';

@NgModule({
  declarations: [
    AuthComponent, 
    CadastroComponent, 
    CadastroAdminComponent],

  imports: [
    CommonModule,
    AuthRoutingModule,
    ReactiveFormsModule,
    MaterialModule,
    ComponentesModule,
  ],

})

export class AuthModule {}
