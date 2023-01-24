import { Router } from '@angular/router';
import { EmpreendedorService } from './../../../services/empreendedor.service';
import { Endereco } from './../../../models/endereco';
import { EnderecoService } from './../../../services/endereco.service';
import { ClienteService } from './../../../services/cliente.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NotificacaoService } from 'src/app/services/notificacao.service';
import { UploadService } from 'src/app/services/upload.service';
import { Usuario } from 'src/app/models/usuario';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css']
})
export class CadastroComponent implements OnInit {

  form!: FormGroup;
  foto:string =''
   

  constructor(
    private formBuilder: FormBuilder,
    private clienteService:ClienteService,
    private enderecoService:EnderecoService,
    private emprededorService:EmpreendedorService,
    private notifyService: NotificacaoService,
    private uploadService: UploadService,
    private router:Router
   
    
    ) {}

  
  
  formEndereco: FormGroup = this.formBuilder.group({
    cep: ['',[Validators.required,Validators.minLength(8)]],
    rua: ['',[Validators.required]],
    numero: ['',[Validators.required]],
    referencia: ['',[Validators.required,Validators.maxLength(35)]],
    bairro: ['',[Validators.required]],
    cidade: ['',[Validators.required]],
    estado: ['',[Validators.required]]
  });
  FormClienteDadosPessoais: FormGroup = this.formBuilder.group({
    nome: ['',[Validators.required,Validators.minLength(3)]],
    sobrenome: ['',[Validators.required,Validators.minLength(3)]],
    email: ['',[Validators.required,Validators.email]],
    cpf: ['',[Validators.required,Validators.minLength(11)]],
    senha: ['',[Validators.required,Validators.minLength(6)]],
    telefone: ['',[Validators.required,Validators.minLength(11)]],
    dataNascimento: ['',[Validators.required]] ,
    idEndereco:['']

  });

  FormEmpreendedorDadosPessoais: FormGroup = this.formBuilder.group({
    nome: ['',[Validators.required,Validators.minLength(3)]],
    sobrenome: ['',[Validators.required,Validators.minLength(3)]],
    email: ['',[Validators.required,Validators.email]],
    cpf: ['',[Validators.required,Validators.minLength(11)]],
    senha: ['',[Validators.required,Validators.minLength(6)]],
    telefone: ['',[Validators.required,Validators.minLength(11)]],
    dataNascimento: ['',[Validators.required]] ,
    idEndereco:[],
    nomeNegocio: ['',[Validators.required]],
    ramo: ['',[Validators.required]],

  });

 
 
  ngOnInit(): void {
  }
public cadastrar(){
  if(this.formEndereco.valid){
    
    const endereco:Endereco = this.formEndereco.value
    this.enderecoService.novoEndereco(endereco).subscribe(

      (ok)=>{
      this.router.navigate(['/auth'])
     
      if(this.FormClienteDadosPessoais.valid){
        this.criarCliente(ok.idEndereco as number)
      }else if(this.FormEmpreendedorDadosPessoais.valid){
        this.criarEmpreendedor(ok.idEndereco as number)
      }
      }
    )
    
 
  
}
}

 
public criarCliente(id:number){
   
  if(this.FormClienteDadosPessoais.valid){
    
    const cliente:Usuario = this.FormClienteDadosPessoais.value
    cliente.idEndereco=id
    cliente.foto = this.foto
   
   
    this.clienteService.criarNovoCliente(cliente).subscribe(
      (ok)=>{
        
        this.notifyService.showSuccess('cliente cadastrado com sucesso')
      }
    )
  }else{
    this.notifyService.showError('dados incorretos')
  }
  }

  public criarEmpreendedor(id:number){
    if(this.FormEmpreendedorDadosPessoais.valid){
     const empreendedor:Usuario = this.FormEmpreendedorDadosPessoais.value
     empreendedor.idEndereco = id
     empreendedor.foto = this.foto
     
     this.emprededorService.novoEmpreendedor(empreendedor).subscribe(
      (ok)=>{
        this.notifyService.showSuccess('Empreendedor  Cadastrado!')
        
      }
     ) 
    }else{
      this.notifyService.showError('Dados invalidos')
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
