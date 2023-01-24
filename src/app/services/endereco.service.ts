import { catchError } from 'rxjs/operators';
import { API_CONFIG } from './../config/config';
import { Observable, EMPTY } from 'rxjs';
import { Endereco } from './../models/endereco';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NotificacaoService } from './notificacao.service';

@Injectable({
  providedIn: 'root'
})
export class EnderecoService {

  constructor(
    private Http:HttpClient,
    private notifyService: NotificacaoService
    ) { }

  public novoEndereco(endereco:Endereco):Observable<Endereco>{
    return this.Http.post<Endereco>(`${API_CONFIG.baseUrl}/auth/newEndereco`,endereco).pipe(
      catchError((erro)=>{
        console.error(erro)
        this.notifyService.showWarning("Endereço não cadastrado.");
        return EMPTY
      })
    )
  }
  public findById(idEndereco: string):Observable<Endereco>{
    return this.Http.get<Endereco>(`${API_CONFIG.baseUrl}/endereco/${idEndereco}`).pipe(
      catchError(error =>{
        this.notifyService.showWarning("Error ao buscar endereço");
        console.error(error);
        return EMPTY;
      })
    ); 
  }
  public updateEdereco(endereco: Endereco): Observable<Endereco>{
    return this.Http.put<Endereco>(`${API_CONFIG.baseUrl}/endereco/${endereco.idEndereco}`, endereco).pipe(
      catchError(error => {
        this.notifyService.showWarning("Erro ao editar Endereço");
        console.error(error);
        return EMPTY;
})
    );
}
}
