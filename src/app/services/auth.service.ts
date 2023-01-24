import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, EMPTY } from 'rxjs';
import { Credenciais } from '../models/credenciais';
import { catchError, tap } from 'rxjs/operators';
import { Token } from '../models/token';
import { API_CONFIG } from '../config/config';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AtualizarSenha } from '../models/atualizar-senha';
import { NotificacaoService } from './notificacao.service';



@Injectable({
  providedIn: 'root'
})
export class AuthService {

private jwt:JwtHelperService = new JwtHelperService();
  constructor(
    private http:HttpClient,
    private notifyService: NotificacaoService
   
   ) { }

  public authenticate(credenciais: Credenciais): Observable<Token> {
      return this.http.post<Token>(`${API_CONFIG.baseUrl}/auth/login`, credenciais).pipe(
        tap(token =>{
          localStorage.setItem("token", token.accessToken);
        }),
        catchError(error =>{
          this.notifyService.showWarning(error.error.message);
          console.error(error);
          return EMPTY;
        })
      );
  }
  public isAuthenticate(): boolean{
    let flag:boolean = false;
    const token = localStorage.getItem("token");
    if(token){
    flag = !this.jwt.isTokenExpired(token);
    }
    return flag;
  }

  public updateSenha(atualizarSenha:AtualizarSenha, id:number): Observable<any>{
      return this.http.put<any>(`${API_CONFIG.baseUrl}/usuario/novaSenha/${id}`, atualizarSenha).pipe(
        catchError(error =>{
          console.error(error);
          this.notifyService.showError("Erro ao editar senha");
          return EMPTY;
        })
      );   
  }
}
