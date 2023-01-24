import { EmpreendedorService } from './../../../services/empreendedor.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Categoria } from 'src/app/models/categoria';
import { Produto } from 'src/app/models/produto';
import { Usuario } from 'src/app/models/usuario';
import { CategoriaService } from 'src/app/services/categoria.service';
import { ProdutoService } from 'src/app/services/produto.service';
import { NgForm } from '@angular/forms';


import { UploadService } from 'src/app/services/upload.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import { NotificacaoService } from 'src/app/services/notificacao.service';
import { Empreendedor } from 'src/app/models/empreendedor';


@Component({
  selector: 'app-novo-produto',
  templateUrl: './novo-produto.component.html',
  styleUrls: ['./novo-produto.component.css']
})
export class NovoProdutoComponent implements OnInit {
  
 
  perfil = localStorage.getItem("perfil")
  isLoading: boolean = false
  foto: string = '';

  administradorMode:boolean = false
  empreendedores:Empreendedor[]=[]
  categorias:Categoria[] = [];
  categoriaSelecionada!:Categoria;
  empreendedor!:Usuario;

  public formProduto: Produto = {
    nome: '',
    valor: 0,
    descricao: '',
    categoria: this.categoriaSelecionada,
    foto: '',
    estoque: 0,
    desconto: 0,
    idCategoria: 0,
    idEmpreendedor:0
    
  }; 

  
  
  
  constructor(
    private uploadService: UploadService,
    private produtoService: ProdutoService,
    private router: Router,
    private categoriaService: CategoriaService,
    private usuarioService: UsuarioService,
    private notifyService: NotificacaoService,
    private empreededorService:EmpreendedorService
  

    /* private empreendedorService: EmpreendedorService, */
    
    
    ) { 
      
    }


  ngOnInit(): void {
    this.buscarCategorias()
   
    
  }
  public buscarCategorias(){
    this.categoriaService.findAll().subscribe(
      (resposta)=>{
        this.buscarEmpreendedore()
        this.fieldUsuario()
        this.categorias = resposta
        
      }
    )
  }

  public fieldUsuario():void{
    const perfil = localStorage.getItem("perfil")
    if(perfil != "ROLE_ADMIN"){
    const email = localStorage.getItem("email") as string
      this.usuarioService.findByEmail(email).subscribe(
        usuario=>{
         this.empreendedor = usuario
        }
      )
  }
  }

  public create(FormEdit: NgForm): void {
  
    
    if(FormEdit.valid ) {
      const produto: Produto = this.formProduto;
      produto.categoria = this.categoriaSelecionada;
      produto.idEmpreendedor = this.empreendedor.id
      produto.foto = this.foto
    
      this.produtoService.create(produto).subscribe (() => {
        this.notifyService.showSuccess("Produto cadastrado com sucesso!");

        if(this.perfil == "ROLE_ADMIN"){
          this.router.navigate(["/marketplace"])
        }else
        this.router.navigate(["/empreendedor/produto-Empreendedor"])
      });
    }
  else {
    this.notifyService.showError("Dados inválidos.");
  }
}


  public uploadFile(event: any): void{
    this.isLoading = true; 
    const file: File = event.target.files[0];
   
    this.uploadService.uploadFoto(file).subscribe(uploadResult => {
      this.isLoading = false;

      const storageReference = uploadResult.ref;
      const promiseFileUrl = storageReference.getDownloadURL();
      promiseFileUrl.then((fotoUrl: string) => {
      this.foto = fotoUrl;
      this.notifyService.showSuccess('foto salva com sucesso')
      
      })  
    })     
  }
  public buscarEmpreendedore(){
    const perfil = localStorage.getItem('perfil') 
 if(perfil == "ROLE_ADMIN"){
  this.administradorMode = true
    this.empreededorService.findAllEmpreendedor().subscribe(
      (resposta) =>{
        this.empreendedores = resposta

      }
    )
  }
   }
}
