import { EmpreendedorService } from 'src/app/services/empreendedor.service';
import { CategoriaService } from './../../../services/categoria.service';
import { Categoria } from './../../../models/categoria';
import { Produto } from './../../../models/produto';
import { AuthService } from './../../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { ProdutoService } from 'src/app/services/produto.service';
import { ItemService } from 'src/app/services/item.service';
import { NotificacaoService } from 'src/app/services/notificacao.service';
import { Item } from 'src/app/models/item';
import { ActivatedRoute } from '@angular/router';
import { Empreendedor } from 'src/app/models/empreendedor';




@Component({
  selector: 'app-produtos',
  templateUrl: './produtos.component.html',
  styleUrls: ['./produtos.component.css']
})
export class ProdutosComponent implements OnInit {

//Variaveis de manipulação
  produtos: Produto[] = [];
  busca!:string
  desconto:boolean = false
  categorias!:Categoria[];
  categoriaSelecionada!:Categoria
  produto!:Produto
  



constructor( private produtoService: ProdutoService,
private authService:AuthService,
private route: ActivatedRoute,
private categoriaService:CategoriaService,
private itemService: ItemService,
private notifyService: NotificacaoService,
private empreededorService:EmpreendedorService
     ) { }

     public itemCarrinho:Item ={
      quantidade: 1,
      email: '',
      valorParcial: 0,
      produto: this.produto
    }

ngOnInit(): void {
this.initializeProdutos();

  }
private initializeProdutos(): void {
   
    this.produtoService.produtosAVenda().subscribe(produtos => {
      this.produtos = produtos;
      this.buscarCategorias()
     
      
    })
  
  }
public buscarPorNome(){
    
    this.produtoService.findByNome(this.busca.toLowerCase()).subscribe(
      result => {
        this.produtos = []
        this.produtos = result
      }
    )
  }
public buscarComDesconto(){
  if(this.desconto == false){
    this.desconto=true
  this.produtoService.findByDesconto().subscribe(
    result => {
      this.produtos = []
      this.produtos = result
    }
  )
}else{
  this.desconto = false 
  this.initializeProdutos()
}

  }
public buscarCategorias(){
    this.categoriaService.findAll().subscribe(
      (resposta)=>{
        this.categorias = resposta
      }
    )
  }
public findByCategoria(){
  
   
    this.produtoService.findByCategoria(this.categoriaSelecionada.nomeCategoria).subscribe(
    result => {
      this.produtos = []
      this.produtos = result
    }
  )
  }
public limparFiltro(){
  
    
    this.initializeProdutos()

  }
  
  display: string = 'none';
  visibility: string = 'hidden';
  
  onMouseEnter() {
      this.display = 'initial';
      this.visibility = 'visible';
  }
  
  onMouseLeave() {
      this.display = 'none';
      this.visibility = 'hidden';
  }
  
  
 public criarItem(){
  
  const itemNovo:Item = this.itemCarrinho
 
  this.itemService.novoItem(itemNovo).subscribe(
    (resposta) => {
      this.notifyService.showSuccess("adicionado ao carrinho")

    }
  )

 }

 public InserirNoCarrinho(idProd:number|undefined){
  const id = idProd
    this.produtoService.findById(id as number).subscribe(
      (resposta)=>{
        this.produto=resposta 
        this.itemCarrinho.valorParcial = (this.produto.valor * this.itemCarrinho.quantidade)
        this.itemCarrinho.email = localStorage.getItem("email") as string
        this.itemCarrinho.produto = resposta
        this.criarItem()
      }
    )
  
   }

 
}