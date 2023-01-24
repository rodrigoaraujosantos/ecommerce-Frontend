import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, EMPTY, Observable } from 'rxjs';
import { API_CONFIG } from '../config/config';
import { DadosGraficosUsuarios } from '../models/dados-graficos-usuarios';
import { NotificacaoService } from './notificacao.service';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(
    private http :HttpClient,
    private notifyService: NotificacaoService
    
    ) { }
    public clienteCadastradosPorMes(ano:string):Observable<DadosGraficosUsuarios[]>{
     return this.http.get<DadosGraficosUsuarios[]>(`${API_CONFIG.baseUrl}/cadastrados/cliente?ano=${ano}`).pipe(
     catchError((erro)=>{
       console.error(erro)
       this.notifyService.showWarning('erro clientes/mes')
       return EMPTY
     })
   )
 }
 public empreendedoresCadastradosPorMes(ano:string):Observable<DadosGraficosUsuarios[]>{
  return this.http.get<DadosGraficosUsuarios[]>(`${API_CONFIG.baseUrl}/empreendedor/cadastrado?ano=${ano}`).pipe(
  catchError((erro)=>{
    console.error(erro)
    this.notifyService.showWarning('erro empreendedores/mes')
    return EMPTY
  })
)
}

public totalAdmCadastrados(ano:string):Observable<DadosGraficosUsuarios>{
  return this.http.get<DadosGraficosUsuarios>(`${API_CONFIG.baseUrl}/administradores/total?ano=${ano}`).pipe(
  catchError((erro)=>{
    console.error(erro)
    this.notifyService.showWarning('erro ao buscar total de Administradores cadastrados')
    return EMPTY
  })
)
}

public totalClienteCadastrados(ano:string):Observable<DadosGraficosUsuarios>{
  return this.http.get<DadosGraficosUsuarios>(`${API_CONFIG.baseUrl}/clientes/total?ano=${ano}`).pipe(
  catchError((erro)=>{
    console.error(erro)
    this.notifyService.showWarning('erro ao buscar total de clientes cadastrados')
    return EMPTY
  })
)
}
public totalEmpreendedoresCadastrados(ano:string):Observable<DadosGraficosUsuarios>{
  return this.http.get<DadosGraficosUsuarios>(`${API_CONFIG.baseUrl}/empreendedor/total?ano=${ano}`).pipe(
  catchError((erro)=>{
    console.error(erro)
    this.notifyService.showWarning('erro ao buscar total de clientes cadastrados')
    return EMPTY
  })
)
}
public totalProdutosCadastrados(ano:string):Observable<DadosGraficosUsuarios>{
  return this.http.get<DadosGraficosUsuarios>(`${API_CONFIG.baseUrl}/produtos/total?ano=${ano}`).pipe(
  catchError((erro)=>{
    console.error(erro)
    this.notifyService.showWarning('erro ao buscar total de produtos cadastrados')
    return EMPTY
  })
)
}
public totalProdutosCadastradosSemana(ano:string):Observable<DadosGraficosUsuarios[]>{
  return this.http.get<DadosGraficosUsuarios[]>(`${API_CONFIG.baseUrl}/cadastrados/semanas?ano=${ano}`).pipe(
  catchError((erro)=>{
    console.error(erro)
    this.notifyService.showWarning('erro ao buscar total de produtos cadastrados por semana')
    return EMPTY
  })
)
}
public totalProdutosCadastradosMes(ano:string):Observable<DadosGraficosUsuarios[]>{
  return this.http.get<DadosGraficosUsuarios[]>(`${API_CONFIG.baseUrl}/cadastrados/produtos?ano=${ano}`).pipe(
  catchError((erro)=>{
    console.error(erro)
    this.notifyService.showWarning('erro ao buscar total de produtos cadastrados por mês')
    return EMPTY
  })
)
}
public produtosMaisVendidosPorCategoria(ano:string):Observable<DadosGraficosUsuarios[]>{
  return this.http.get<DadosGraficosUsuarios[]>(`${API_CONFIG.baseUrl}/produtos/vendidos?ano=${ano}`).pipe(
  catchError((erro)=>{
    console.error(erro)
    this.notifyService.showWarning('erro ao buscar total de produtos cadastrados por mês')
    return EMPTY
  })
)
}

}


