import { Usuario } from './../models/usuario';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, EMPTY, Observable } from 'rxjs';
import { API_CONFIG } from '../config/config';
import { NotificacaoService } from './notificacao.service';


@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(
    private http: HttpClient,
    private notifyService: NotificacaoService
  ) { }

  public findAll(): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(`${API_CONFIG.baseUrl}/usuarios`).pipe(
      catchError(error => {
        this.notifyService.showError("Erro ao buscar dados do usuarios");
        console.error(error);
        return EMPTY;
      })
    );


  }
  public updatePerfil(usuario: Usuario): Observable<Usuario> {

    return this.http.put<Usuario>(`${API_CONFIG.baseUrl}/usuario/${usuario.id}`, usuario).pipe(
      catchError(error => {
        console.error(error);
        this.notifyService.showWarning("Erro ao editar perfil do Usuario");
        return EMPTY;
      })
    );
  }

  public findById(id: string): Observable<Usuario> {
    return this.http.get<Usuario>(`${API_CONFIG.baseUrl}/usuario/${id}`).pipe(
      catchError(error => {
        this.notifyService.showError("Erro ao buscar dados de Usuario");
        console.error(error);
        return EMPTY;
      })
    );
  }
  public findByEmail(email: string): Observable<Usuario> {
    return this.http.get<Usuario>(`${API_CONFIG.baseUrl}/usuario/email/${email}`).pipe(
      catchError(error => {
        this.notifyService.showError("Erro ao buscar dados de Usuario");
        console.error(error);
        return EMPTY;
      })
    );
  }
  public delete(id: number): Observable<Usuario> {
    return this.http.delete<Usuario>(`${API_CONFIG.baseUrl}/user/${id}`).pipe(
      catchError(error => {
        this.notifyService.showError(" erro ao desativar conta");
        console.error(error);
        return EMPTY;
      })
    );
  }
  public ativar(id: number): Observable<Usuario> {
    return this.http.put<Usuario>(`${API_CONFIG.baseUrl}/user/ativar/${id}`,undefined).pipe(
      catchError(error => {
        this.notifyService.showError(" erro ao ativar conta");
        console.error(error);
        return EMPTY;
      })
    );
  }
}

