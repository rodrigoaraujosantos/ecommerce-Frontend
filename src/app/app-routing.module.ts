import { HomeComponent } from './views/home/home/home.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { RoleGuard } from './guards/role.guard';
import { AdminGuard } from './guards/admin.guard';



const routes: Routes = [

{ path: 'auth', loadChildren: () => import('./views/auth/auth.module').then(m => m.AuthModule),

},

{ path: 'administrador', loadChildren: () => import('./views/admin/admin.module').then(m => m.AdminModule),
canActivateChild: [AdminGuard]
},

{ path: 'empreendedor', loadChildren: () => import('./views/empreendedor/empreendedor.module').then(m => m.EmpreendedorModule),
canActivateChild: [RoleGuard]
},

{ path: 'cliente', loadChildren: () => import('./views/cliente/cliente.module').then(m => m.ClienteModule)
},

{ path: 'marketplace', loadChildren: () => import('./views/produtos/produtos.module').then(m => m.ProdutosModule) },

{ path: 'faq', loadChildren: () => import('./views/faq/faq.module').then(m => m.FaqModule)
},

{ path: 'termos', loadChildren: () => import('./views/termos/termos.module').then(m => m.TermosModule), 
    
},

{ path: '', loadChildren: () => import('./views/home/home.module').then(m => m.HomeModule),

},

{ path: 'conta', loadChildren: () => import('./views/perfil/perfil.module').then(m => m.PerfilModule),
canActivate: [ AuthGuard]
},

{ path: 'sobre', loadChildren: () => import('./views/sobre/sobre.module').then(m => m.SobreModule) },

{ path: 'politica', loadChildren: () => import('./views/politica/politica.module').then(m => m.PoliticaModule) },







];

@NgModule({
imports: [RouterModule.forRoot(routes)],
exports: [RouterModule]
})
export class AppRoutingModule { }
