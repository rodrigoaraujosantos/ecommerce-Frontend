import { NotificacaoService } from './../../../services/notificacao.service';
import { UsuarioService } from './../../../services/usuario.service';
import { Usuario } from './../../../models/usuario';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-relacao-de-usuarios',
  templateUrl: './relacao-de-usuarios.component.html',
  styleUrls: ['./relacao-de-usuarios.component.css']
})
export class RelacaoDeUsuariosComponent implements OnInit {


  displayedColumns: string[] = ["id", "perfil", "nome", "cpf", "email", "telefone", "detalhes", "editar", "excluir", "ativar"];
  dataSource: Usuario [] =  [];

  constructor(
    private usuarioService : UsuarioService,
    private notificacaoService:NotificacaoService
    ) { }

  ngOnInit(): void {
    this.inicializeTable()
  }

  private inicializeTable():void {
    this.dataSource = []
    this.usuarioService.findAll().subscribe(usuarios => {
      this.dataSource = usuarios;
    });

  }
  public desativar(id:number){
    this.usuarioService.delete(id).subscribe(

      resposta => {
        this.notificacaoService.showSuccess("Usuario desativado")
        this.inicializeTable()
      }
    )
  }
  public ativar(id:number){
    this.usuarioService.ativar(id).subscribe(

      resposta => {
        this.notificacaoService.showSuccess("Usuario ativado")
        this.inicializeTable()
      }
    )
  }
}
