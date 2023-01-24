import { Usuario } from './../../../models/usuario';
import { Administrador } from './../../../models/administrador';
import { AdministradorService } from 'src/app/services/administrador.service';
import { EnderecoService } from './../../../services/endereco.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Endereco } from 'src/app/models/endereco';
import { NotificacaoService } from 'src/app/services/notificacao.service';
import { UploadService } from 'src/app/services/upload.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cadastro-admin',
  templateUrl: './cadastro-admin.component.html',
  styleUrls: ['./cadastro-admin.component.css']
})
export class CadastroAdminComponent implements OnInit {
 admin!:FormGroup
 formEndereco!:FormGroup
  constructor(
   
    private fb : FormBuilder,
    private enderecoService:EnderecoService,
    private administradorService:AdministradorService,
    private uploadService: UploadService,
    private notifyService: NotificacaoService,
    private roter:Router
  ) 
  {
    
    this.admin = fb.group({
    nome: ['',[Validators.required,Validators.minLength(3)]],
    sobrenome: ['',[Validators.required,Validators.minLength(3)]],
    email: ['',[Validators.required,Validators.email]],
    cpf: ['',[Validators.required,Validators.minLength(11)]],
    senha: ['',[Validators.required,Validators.minLength(6)]],
    telefone: ['',[Validators.required,Validators.minLength(11)]],
    dataNascimento: ['',[Validators.required]] ,
    idEndereco:['']
  })
  this.formEndereco = fb.group({
    cep: ['',[Validators.required,Validators.minLength(8)]],
    rua: ['',[Validators.required]],
    numero: ['',[Validators.required]],
    referencia: ['',[Validators.required,Validators.maxLength(35)]],
    bairro: ['',[Validators.required]],
    cidade: ['',[Validators.required]],
    estado: ['',[Validators.required]]
  });

}
foto:string =''

  ngOnInit(): void {
  }

  public cadastrar(){
    if(this.formEndereco.valid){
      const endereco:Endereco = this.formEndereco.value
      this.enderecoService.novoEndereco(endereco).subscribe(
  
        (ok)=>{
    
        this.notifyService.showSuccess('Endereço cadastrado.')
        this.novoAdmin(ok.idEndereco as number)
   
        }
      )
      
    }
  }
  
 public novoAdmin(id:number){
  if(this.admin.valid){
    const novoAdmin:Usuario = this.admin.value
    novoAdmin.idEndereco = id
    novoAdmin.foto =this.foto
   this.administradorService.newAdmin(novoAdmin).subscribe(
   (resposta)=>{
     
      this.notifyService.showSuccess('Administrador cadastrado com sucesso!')
      this.roter.navigate([""])
   }
   )
  }else{
    this.notifyService.showError('Dados invalidos!')
  }
 }
 public uploadFile(event: any): void{
 
  const file: File = event.target.files[0];
  
  this.uploadService.uploadFoto(file).subscribe(uploadResult => {


    const storageReference = uploadResult.ref;
    const promiseFileUrl = storageReference.getDownloadURL();
    promiseFileUrl.then((fotoUrl: string) => {
    this.foto = fotoUrl;
  
    this.notifyService.showSuccess('foto salva')
    
    })  
  })     
}
}
