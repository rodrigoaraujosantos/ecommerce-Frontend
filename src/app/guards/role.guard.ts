import { TokenDecodificado } from './../models/token-decodificado';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateChild, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import  {  JwtHelperService  }  from  "@auth0/angular-jwt"
import { NotificacaoService } from 'src/app/services/notificacao.service'

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivateChild {
  constructor(
    private router:Router,
    private notifyService: NotificacaoService,
    ){}


  canActivateChild(
    childRoute: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      const jwtService = new JwtHelperService();
      const tokenLogado:string = localStorage.getItem("token") as string;
      const decodedToken:TokenDecodificado | any  = jwtService.decodeToken(tokenLogado);
      if(decodedToken.perfil == "ROLE_EMPREENDEDOR" || decodedToken.perfil == "ROLE_ADMIN"){
        return true
      }else{
        this.notifyService.showWarning("Não autorizado!");
        this.router.navigate(["/home"])
        return false
      }
      
      ;
  }
  
}