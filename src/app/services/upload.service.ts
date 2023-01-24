import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { catchError, EMPTY, from, Observable } from 'rxjs';
import { NotificacaoService } from './notificacao.service';



@Injectable({
  providedIn: 'root'
})
export class UploadService {

  constructor(
    private storage: AngularFireStorage,
    private notifyService: NotificacaoService
    ) { }


  
  public uploadFoto(foto: File): Observable<any> {
    const promise = this.storage.upload(`fotos/${Date.now()}`, foto) 
    return from(promise).pipe(
      catchError(error => {
        this.notifyService.showWarning("Erro ao fazer upload de foto.")
        console.error(error)
        return EMPTY
      })
    )
  }
}
