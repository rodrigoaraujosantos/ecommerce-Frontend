import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AtualizarSenha } from 'src/app/models/atualizar-senha';
import { Endereco } from 'src/app/models/endereco';
import { Usuario } from 'src/app/models/usuario';
import { AuthService } from 'src/app/services/auth.service';
import { EnderecoService } from 'src/app/services/endereco.service';
import { NotificacaoService } from 'src/app/services/notificacao.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-editar-usuario',
  templateUrl: './editar-usuario.component.html',
  styleUrls: ['./editar-usuario.component.css']
})
export class EditarUsuarioComponent implements OnInit {
  constructor(private route: ActivatedRoute,
    private router: Router,
    private enderecoService: EnderecoService,
    private authService : AuthService,
    private usuarioService:UsuarioService,
    private notifyService:NotificacaoService
    ) { }
  

    
 
    public endereco: Endereco = {
      cep: '',
      rua: '',
      numero: 0,
      bairro: '',
      cidade: '',
      estado: '',
      referencia: ''
    }
    public usuario: Usuario = {
      id: 0,
      nome: '',
      sobrenome: '',
      dataNascimento: '',
      telefone: '',
      email: '',
      senha: '',
      cpf: '',
      nomeNegocio: '',
      ramo: '',
      endereco: this.endereco,
      ativado: false
    };
    public atualizarSenha : AtualizarSenha = {

      senha: '',
      novaSenha: ''
      }
    ngOnInit(): void {
      this.fieldUsuario()
    }
   
    public fieldUsuario():void{
      const id = this.route.snapshot.params["id"];
        this.usuarioService.findById(id).subscribe(
          usuario=>{
            this.usuario = usuario
            this.endereco = usuario.endereco
          }
        )
    }
    public updateSenha(formEditSenha: NgForm):void{
      if(formEditSenha.valid){
        this.authService.updateSenha(this.atualizarSenha, this.usuario.id as number).subscribe(() =>{
          this.notifyService.showSuccess("Senha alterada com sucesso!")
          this.router.navigate(["/administrador"])
      
      });
    }
  }
  public updateEndereco(formEditEndereco: NgForm):void{
    if(formEditEndereco.valid){
    this.enderecoService.updateEdereco(this.endereco).subscribe(() =>{
      this.notifyService.showSuccess("Endereco editado");
      this.router.navigate(["/administrador"]);
    });
    }
  }
  public updatePerfil(formEditPerfil: NgForm): void{
    if(formEditPerfil.valid){
    this.usuarioService.updatePerfil(this.usuario).subscribe(() =>{
      this.notifyService.showSuccess("usuario editado.");
      this.router.navigate(["/administrador"]);
    })
  }
  else{
    this.notifyService.showError("Dados inválidos");
  }

  }
  

}
