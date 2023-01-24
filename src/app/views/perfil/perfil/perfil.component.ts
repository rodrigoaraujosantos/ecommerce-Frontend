import { Usuario } from './../../../models/usuario';
import { UsuarioService } from './../../../services/usuario.service';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AtualizarSenha } from 'src/app/models/atualizar-senha';
import { Endereco } from 'src/app/models/endereco';
import { AdministradorService } from 'src/app/services/administrador.service';
import { AuthService } from 'src/app/services/auth.service';
import { EnderecoService } from 'src/app/services/endereco.service';
import { NotificacaoService } from 'src/app/services/notificacao.service';
import { UploadService } from 'src/app/services/upload.service';


@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {

  constructor(private route: ActivatedRoute,
    private router: Router,
    private enderecoService: EnderecoService,
    private authService : AuthService,
    private usuarioService:UsuarioService,
    private notifyService: NotificacaoService,
    private uploadService: UploadService
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
      ativado: false,
      foto : ''
    };
    public atualizarSenha : AtualizarSenha = {

      senha: '',
      novaSenha: ''
      }
    ngOnInit(): void {
      this.fieldUsuario()
      
    }
   
    public fieldUsuario():void{
      const email = localStorage.getItem("email") as string
        this.usuarioService.findByEmail(email).subscribe(
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
          this.router.navigate(["/marketplace"])
      
      });
    }
  }
  public updateEndereco(formEditEndereco: NgForm):void{
    if(formEditEndereco.valid){
    this.enderecoService.updateEdereco(this.endereco).subscribe(() =>{
      this.notifyService.showSuccess("Endereco editado");
      this.router.navigate(["/marketplace"]);
    });
    }
  }
  public updatePerfil(formEditPerfil: NgForm): void{
    if(formEditPerfil.valid){
    this.usuarioService.updatePerfil(this.usuario).subscribe(() =>{
      
      this.router.navigate(["/marketplace"]);
      this.notifyService.showSuccess("Usuario editado.");
      
    })
  }
  else{
    this.notifyService.showError("Dados inválidos");
  }

  }
  public uploadFile(event: any): void{
 
    const file: File = event.target.files[0];
   
    this.uploadService.uploadFoto(file).subscribe(uploadResult => {
  
  
      const storageReference = uploadResult.ref;
      const promiseFileUrl = storageReference.getDownloadURL();
      promiseFileUrl.then((fotoUrl: string) => {
      this.usuario.foto = fotoUrl;
     
      this.notifyService.showSuccess('foto salva')
      
      })  
    })     
  }
  }



