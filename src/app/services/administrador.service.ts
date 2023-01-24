import { Usuario } from './../models/usuario';

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Administrador } from '../models/administrador';
import { Observable, EMPTY, catchError } from 'rxjs';
import { API_CONFIG } from 'src/app/config/config';
import { EmailValidator } from '@angular/forms';
import { AtualizarSenha } from '../models/atualizar-senha';
import { NotificacaoService } from 'src/app/services/notificacao.service'

@Injectable({
  providedIn: 'root'
})
 
  
export class AdministradorService {
  
 


  constructor(
    private http: HttpClient, 
    private  notifyService: NotificacaoService
    
    ) {
   
   }

  

  public newAdmin(admin:Usuario):Observable<Administrador>{
    return this.http.post<Administrador>(`${API_CONFIG.baseUrl}/administrador`,admin).pipe(
      catchError( 
        (erro)=>{
        console.error(erro)
        this.notifyService.showWarning("Erro ao cadastrar novo admin!");
        return EMPTY
        
  })
  );  
  }

  
   
  }
   
  