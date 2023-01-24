import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, EMPTY, Observable } from 'rxjs';
import { __param } from 'tslib';
import { API_CONFIG } from '../config/config';

import { MinhasCompras } from '../models/minhas-compras';
import { Pedidos } from './../models/pedidos';
import { NotificacaoService } from './notificacao.service';

@Injectable({
  providedIn: 'root'
})
export class PedidosService {


  constructor(private http: HttpClient,
    private notifyService:NotificacaoService) { }
  public findAll(): Observable<Pedidos[]>{
    return this.http.get<Pedidos[]>(`${API_CONFIG.baseUrl}/pedidos`).pipe(
      catchError(error =>{
        this.notifyService.showWarning("Erro ao buscar relação de pedidos");
        console.error(error);
        return EMPTY;
      })
    );
  }
  public novoPedido(pedido:Pedidos):Observable<Pedidos>{
    return this.http.post<Pedidos>(`${API_CONFIG.baseUrl}/pedido/newPedido`,pedido).pipe(
    catchError((erro)=>{
      console.error(erro)
      this.notifyService.showWarning('erro ao realizar pedido ')
      return EMPTY
    })
  )
}
public buscarPedidoPorEmail(email:string):Observable<MinhasCompras[]>{
  return this.http.get<MinhasCompras[]>(`${API_CONFIG.baseUrl}/meus/pedidos/${email}`).pipe(
    catchError(error =>{
      this.notifyService.showWarning("Erro ao buscar  pedidos do usuario");
      console.error(error);
      return EMPTY;
    })
  )
}
public pedidosPDF():Observable<Blob>{
  return this.http.get(`${API_CONFIG.baseUrl}/pedidos/export/pdf`,{ responseType: 'blob'} )
}


}
