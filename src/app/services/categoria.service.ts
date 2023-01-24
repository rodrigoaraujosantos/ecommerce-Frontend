import { Categoria } from './../models/categoria';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, EMPTY, Observable } from 'rxjs';
import { API_CONFIG } from '../config/config';
import { NotificacaoService } from './notificacao.service';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {


  constructor(
    private http:HttpClient,
    private notifyService: NotificacaoService
    
    ) { }

  public findAll(): Observable<Categoria[]>{
    return this.http.get<Categoria[]>(`${API_CONFIG.baseUrl}/produtos/gerais/categorias`).pipe(
      catchError(error => {
        this.notifyService.showWarning("Erro ao buscar dados do produto.");
        console.error(error);
        return EMPTY;
      })
    );
  }
}
