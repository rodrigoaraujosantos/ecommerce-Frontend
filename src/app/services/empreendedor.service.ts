import { catchError } from 'rxjs/operators';
import { API_CONFIG } from './../config/config';
import { Observable, EMPTY } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Empreendedor } from '../models/empreendedor';
import { NotificacaoService } from './notificacao.service';
import { Usuario } from '../models/usuario';

@Injectable({
  providedIn: 'root'
})
export class EmpreendedorService {


  constructor(
    private http:HttpClient,
    private   notifyService: NotificacaoService
    
    ) { }

  public novoEmpreendedor(empreendedor:Usuario):Observable<Empreendedor>{
    return this.http.post<Empreendedor>(`${API_CONFIG.baseUrl}/auth/newEmpreendedor`,empreendedor).pipe(
      catchError(
        (error)=>{
          console.error(error)
          this.notifyService.showWarning("Erro ao cadastrar novo Empreendedor.");
          return EMPTY
        }
      )
    )

  }
  public empreendedorPorId(idEmpreendedor:number|undefined):Observable<Usuario>{
    return this.http.get<Usuario>(`${API_CONFIG.baseUrl}/empreendedor/${idEmpreendedor}`).pipe(
      catchError(
        (error)=>{
          console.error(error)
          this.notifyService.showWarning("Erro buscar Empreendedor.");
          return EMPTY
        }
      )
    )

  }

  public findAllEmpreendedor(): Observable<Empreendedor[]>{
    return this.http.get<Empreendedor[]>(`${API_CONFIG.baseUrl}/empreendedor`).pipe(
      catchError(error => {
        this.notifyService.showWarning("Erro ao buscar dados do empreendedor");
        console.error(error);
        return EMPTY;
      })
    );
  }
}
