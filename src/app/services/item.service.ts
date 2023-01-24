import { catchError, EMPTY, Observable } from 'rxjs';
import { Item } from './../models/item';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_CONFIG } from '../config/config';
import { NotificacaoService } from './notificacao.service';
import { Pedidos } from '../models/pedidos';

@Injectable({
  providedIn: 'root'
})
export class ItemService {

  constructor(
     private http :HttpClient,
     private notifyService: NotificacaoService
     
     ) { }
     public buscarItensDoPedido(idPedido:number|undefined):Observable<Item[]>{
      return this.http.get<Item[]>(`${API_CONFIG.baseUrl}/Itens/Pedido/${idPedido}`).pipe(
      catchError((erro)=>{
        console.error(erro)
        this.notifyService.showWarning('erro ao buscar o array de itens')
        return EMPTY
      })
    )
  }
  public novoItem(item:Item):Observable<Item>{
      return this.http.post<Item>(`${API_CONFIG.baseUrl}/novoItem`,item).pipe(
      catchError((erro)=>{
        console.error(erro)
        this.notifyService.showWarning('Item não cadastrado')
        return EMPTY
      })
    )
  }

  public AtualizarQtdItem(id:number, item:Item):Observable<Item>{
    return this.http.put<Item>(`${API_CONFIG.baseUrl}/atualizarItem/${id}`,item).pipe(
      catchError((erro)=>{
        console.error(erro)
        this.notifyService.showWarning('Item não atualizado')
        return EMPTY
      })
    )
  }
  public buscarCarrinho(email:string):Observable<Item[]>{
    return this.http.get<Item[]>(`${API_CONFIG.baseUrl}/Item/${email}`).pipe(
    catchError((erro)=>{
      console.error(erro)
      this.notifyService.showWarning('erro ao buscar')
      return EMPTY
    })
  )
}
public buscarVendasDaMinhaLoja(nomeNegocio:string):Observable<Item[]>{
  return this.http.get<Item[]>(`${API_CONFIG.baseUrl}/Itens/${nomeNegocio}`).pipe(
  catchError((erro)=>{
    console.error(erro)
    this.notifyService.showWarning('erro ao buscar itens da loja')
    return EMPTY
  })
)
}
public mudarStatus(id:number|undefined,status:string|undefined):Observable<Item>{
  return this.http.put<Item>(`${API_CONFIG.baseUrl}/atualizarStatus/${id}?status=${status}`,undefined).pipe(
  catchError((erro)=>{
    console.error(erro)
    this.notifyService.showWarning('atualizar o status')
    return EMPTY
  })
)
}
public excluirItem(id:number|undefined):Observable<Item>{
  return this.http.delete<Item>(`${API_CONFIG.baseUrl}/deletarItem/${id}`).pipe(
  catchError((erro)=>{
    console.error(erro)
    this.notifyService.showWarning('erro ao remover o Item')
    return EMPTY
  })
)
}
public vincularAoPedido(idPedido:number|undefined,idItem:number|undefined):Observable<Item>{
  return this.http.put<Item>(`${API_CONFIG.baseUrl}/vincular/${idPedido}/${idItem}`,undefined).pipe(
  catchError((erro)=>{
    console.error(erro)
    this.notifyService.showWarning('erro ao vincular com pedido')
    return EMPTY
  })
)
}
}
