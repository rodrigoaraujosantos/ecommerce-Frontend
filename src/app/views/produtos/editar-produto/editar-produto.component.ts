import { ProdutoService } from 'src/app/services/produto.service';

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { Produto } from 'src/app/models/produto';
import { UploadService } from 'src/app/services/upload.service';
import { CategoriaService } from 'src/app/services/categoria.service';
import { Categoria } from 'src/app/models/categoria';
import { UsuarioService } from 'src/app/services/usuario.service';
import { Usuario } from 'src/app/models/usuario';
import { NotificacaoService } from 'src/app/services/notificacao.service';

@Component({
  selector: 'app-editar-produto',
  templateUrl: './editar-produto.component.html',
  styleUrls: ['./editar-produto.component.css']
})
export class EditarProdutoComponent implements OnInit {
   perfil = localStorage.getItem("perfil")
  isLoading: boolean = false
  foto: string = '';
  categorias: Categoria[]=[]
  categoriaSelecionada!: number
  usuario!: Usuario
  administradorMode:boolean = false
  public produto: Produto = {
    nome: '',
    foto: '',
    descricao: '',
    estoque: 0,
    valor: 0,
    validadeDesconto:undefined,
    desconto: 0,
    categoria:this.categorias[0],
    idCategoria: 0,

    
  };

  constructor(
    private produtoService:ProdutoService,
    private router: Router,
    private route: ActivatedRoute,
    private uploadService: UploadService,
    private categoriaService: CategoriaService,
    private usuarioService: UsuarioService,
    private notifyService:NotificacaoService
    ) { }

  ngOnInit(): void {
    this.initilizeFields();
  }

  

  private initilizeFields(): void {
    const idProduto: string | null = this.route.snapshot.paramMap.get('id');
    if(idProduto) {
      this.produtoService.findById(idProduto).subscribe(produto => {
        this.produto = produto;
     
        this.buscarCategorias()
        this.fieldUsuario()
      });
    }
  }

  public buscarCategorias() {
    this.categoriaService.findAll().subscribe(categoria => {
      this.categorias = categoria
    })
  }

  public update(): void{
    const id: number = this.categoriaSelecionada

   
    
      const produtoEditado: Produto = this.produto
      produtoEditado.idCategoria = id
      this.produtoService.update(produtoEditado).subscribe(produto => {
        this.notifyService.showSuccess("Produto editado.")
        if(this.perfil == "ROLE_ADMIN"){
          this.router.navigate(["/administrador"])
        }else{
          this.router.navigate(["/empreendedor/produto-Empreendedor"])
        }
      })
    
  }

  public uploadFile(event: any): void{
    this.isLoading = true; 
    const file: File = event.target.files[0];
    
    this.uploadService.uploadFoto(file).subscribe(response => {
      this.isLoading = false;

      const storageReference = response.ref;
      const promiseFileUrl = storageReference.getDownloadURL();
      promiseFileUrl.then((novaFoto: string) => {
      this.produto.foto = novaFoto;
      })  
    })     
  }

  public fieldUsuario():void{
    const email = localStorage.getItem("email") as string
      this.usuarioService.findByEmail(email).subscribe(
        usuario=>{
          this.usuario = usuario
          this.produto.idEmpreendedor = usuario.id
        }
      )
  }
}
