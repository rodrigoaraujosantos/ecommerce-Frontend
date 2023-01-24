import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { AngularFireStorage } from '@angular/fire/compat/storage';

import { catchError, EMPTY, from, Observable } from 'rxjs';
import { API_CONFIG } from '../config/config';
import { Produto } from '../models/produto';
import { NotificacaoService } from './notificacao.service';


@Injectable({
  providedIn: 'root'
})
export class ProdutoService {

  constructor(
    private http: HttpClient,
    private storage: AngularFireStorage,
    private notifyService: NotificacaoService
    ) { }

  public findById(idProduto: string|number): Observable<Produto> {
    return this.http.get<Produto>(`${API_CONFIG.baseUrl}/produto/${idProduto}`).pipe(
      catchError(error => {
        this.notifyService.showWarning("Cadastre-se para comprar");
        console.error(error);
        return EMPTY;
      })
    )
  }

  public findAll(): Observable<Produto[]>{
    return this.http.get<Produto[]>(`${API_CONFIG.baseUrl}/produtos`).pipe(
      catchError(error => {
        this.notifyService.showWarning("Erro ao buscar dados do produto");
        console.error(error);
        return EMPTY;
      })
    );
  }
  
  public produtosAVenda(): Observable<Produto[]>{
    return this.http.get<Produto[]>(`${API_CONFIG.baseUrl}/produtos/gerais`).pipe(
      catchError(error => {
        this.notifyService.showWarning("Erro ao buscar dados do produto");
        console.error(error);
        return EMPTY;
      })
    );
  }


  public create(produto: Produto): Observable<Produto> {
    
    return this.http.post<Produto>(`${API_CONFIG.baseUrl}/produto`, produto).pipe(
      catchError(error => {
        this.notifyService.showWarning("Erro ao cadastrar novo produto");
        console.error(error);
        return EMPTY; 
      })
    );  
  }

  

  public update(produto: Produto): Observable<Produto>{
   
    return this.http.put<Produto>(`${API_CONFIG.baseUrl}/produto/${produto.idProduto}`, produto).pipe(
      catchError(error =>{
        this.notifyService.showWarning("Erro ao cadastrar novo produto");
        console.error(error);
       
        return EMPTY;
      })
    );
  }

  public zerarEstoque(idProduto: number): Observable<any> {
    return this.http.delete(`${API_CONFIG.baseUrl}/zerar/${idProduto}`).pipe(
      catchError(error => {
        this.notifyService.showWarning("Erro ao excluir produto");
        console.error(error);
        return EMPTY;
      })
    );
  }

  public findByEmpreendedor(id:number): Observable<Produto[]> {
    return this.http.get<Produto[]>(`${API_CONFIG.baseUrl}/produtos/empreendedor/${id}`).pipe(
      catchError(error => {
        this.notifyService.showWarning("erro ao buscar dados dos Produtos do empreendedor")
        console.error(error)
        return EMPTY
      })
    )
  }
  
  public findByNome(nomeProduto: string): Observable<Produto[]> {
    return this.http.get<Produto[]>(`${API_CONFIG.baseUrl}/produtos/gerais/nome?filtro=${nomeProduto}`).pipe(
      catchError(error => {
        this.notifyService.showWarning("Erro ao buscar Produto");
        console.error(error);
        return EMPTY;
      })
    )
}
public findByDesconto(): Observable<Produto[]> {
  return this.http.get<Produto[]>(`${API_CONFIG.baseUrl}/produtos/gerais/desconto`).pipe(
    catchError(error => {
      this.notifyService.showWarning("Erro ao buscar Produto");
      console.error(error);
      return EMPTY;
    })
  )
}
public findByCategoria(categoria:string): Observable<Produto[]> {
  return this.http.get<Produto[]>(`${API_CONFIG.baseUrl}/produtos/gerais/categoria?filtro=${categoria}`).pipe(
    catchError(error => {
      this.notifyService.showWarning("Erro ao buscar Produto");
      console.error(error);
      return EMPTY;
    })
  )
}
public findBysuperProduto(): Observable<Produto[]> {
  return this.http.get<Produto[]>(`${API_CONFIG.baseUrl}/produtos/gerais/superproduto`).pipe(
    catchError(error => {
      this.notifyService.showWarning("Erro ao buscar Produto");
      console.error(error);
      return EMPTY;
    })
  )
}

}
