import { ItemService } from './../../../services/item.service';
import { ProdutoService } from 'src/app/services/produto.service';
import { Produto } from 'src/app/models/produto';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Item } from 'src/app/models/item';
import { NotificacaoService } from 'src/app/services/notificacao.service';
import { Empreendedor } from 'src/app/models/empreendedor';


@Component({
  selector: 'app-detalhes-produto',
  templateUrl: './detalhes-produto.component.html',
  styleUrls: ['./detalhes-produto.component.css']
})
export class DetalhesProdutoComponent implements OnInit {
produto!:Produto
empreendedor!:Empreendedor

  constructor( 
    private produtoService:ProdutoService,
    private route: ActivatedRoute,
    private itemService: ItemService,
    private notifyService: NotificacaoService
   
    ) { }
public itemCarrinho:Item ={
  quantidade: 1,
  email: '',

  valorParcial: 0,
  produto: this.produto
}


  ngOnInit(): void {
    this.buscarProdutoById()
  }

 public buscarProdutoById(){
const id = this.route.snapshot.params["id"]
  this.produtoService.findById(id).subscribe(
    (resposta)=>{
      this.produto=resposta 
      this.itemCarrinho.valorParcial = (this.produto.valor * this.itemCarrinho.quantidade)
      this.itemCarrinho.email = localStorage.getItem("email") as string
      this.itemCarrinho.produto = resposta
    }
  )

 }
 public adicionarQtd(){
  this.itemCarrinho.quantidade = this.itemCarrinho.quantidade + 1
  this.itemCarrinho.valorParcial = (this.produto.valor * this.itemCarrinho.quantidade)
  
 }
 public retirarQtd(){
  if(this.itemCarrinho.quantidade >  0){
  this.itemCarrinho.quantidade = this.itemCarrinho.quantidade - 1
  this.itemCarrinho.valorParcial = (this.produto.valor * this.itemCarrinho.quantidade)
}
 }

 public criarItem(){
  const itemNovo:Item = this.itemCarrinho

  this.itemService.novoItem(itemNovo).subscribe(
    (resposta) => {
      this.notifyService.showSuccess("adicionado ao carrinho")

    }
  )

 }
 

}