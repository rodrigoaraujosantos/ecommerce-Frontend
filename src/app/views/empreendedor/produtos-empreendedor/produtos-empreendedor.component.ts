import { Usuario } from 'src/app/models/usuario';

import { Produto } from 'src/app/models/produto';
import { ProdutoService } from './../../../services/produto.service';
import { UsuarioService } from './../../../services/usuario.service';
import { Component, OnInit } from '@angular/core';

import { NotificacaoService } from 'src/app/services/notificacao.service';


@Component({
  selector: 'app-produtos-empreendedor',
  templateUrl: './produtos-empreendedor.component.html',
  styleUrls: ['./produtos-empreendedor.component.css']
})
export class ProdutosEmpreendedorComponent implements OnInit {


  constructor(
    private usuarioService:UsuarioService,
    private produtosService:ProdutoService,
    private notifyService: NotificacaoService
    ) { }

  empreendedor!:Usuario
   produtosEmpreendedor!:Produto[]

  ngOnInit(): void {
  this.ExtrairUsuario()
 
  }


public ExtrairUsuario(){
const email = localStorage.getItem("email") as string
this.usuarioService.findByEmail(email).subscribe(
  (user)=>{
   
    this.empreendedor = user
    this.buscarProdutos(user.id as number)
  }
)
//Fazer upload de imagem
}
public zerarEstoque(produto:Produto){
  const produtoZero = produto
 const id:number = this.empreendedor.id as number
  if(produtoZero.estoque != 0){
  produtoZero.idEmpreendedor = this.empreendedor.id
  this.produtosService.zerarEstoque(produtoZero.idProduto as number).subscribe(
    ()=>{
      this.notifyService.showSuccess("Produto retirado o marketplace.")
      this.buscarProdutos(id)
    }
  )
}else {
  this.notifyService.showWarning("O produto ja foi retirado do marketplace.")
}
}
public buscarProdutos(id:number){

  this.produtosService.findByEmpreendedor(id).subscribe(
    (produtos)=>{
      this.produtosEmpreendedor = produtos
    }
  )

  }

  
}
