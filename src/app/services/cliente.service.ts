import { Usuario } from 'src/app/models/usuario';
import { catchError } from 'rxjs/operators';
import { API_CONFIG } from './../config/config';
import { Cliente } from './../models/cliente';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EMPTY, Observable } from 'rxjs';
import { NotificacaoService } from './notificacao.service';


@Injectable({
  providedIn: 'root'
})
export class ClienteService {
  

  constructor(
    private http: HttpClient,
    private notifyService: NotificacaoService) {
   }
   public criarNovoCliente(cliente:Usuario):Observable<Cliente>{
   return this.http.post<Cliente>(`${API_CONFIG.baseUrl}/auth/newCliente`, cliente).pipe(
    catchError((erro)=>{
      console.error(erro)
      this.notifyService.showWarning("Erro cria novo cliente.");
      return EMPTY
    })   )}
  

  
}
