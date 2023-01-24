import { EnderecoService } from './../../../services/endereco.service';
import { Endereco } from './../../../models/endereco';
import { UsuarioService } from 'src/app/services/usuario.service';
import { ItemService } from './../../../services/item.service';
import { Component, OnInit } from '@angular/core';
import { Item } from 'src/app/models/item';
import { Pedidos } from 'src/app/models/pedidos';
import { Usuario } from 'src/app/models/usuario';
import { PedidosService } from 'src/app/services/pedidos.service';
import { NotificacaoService } from 'src/app/services/notificacao.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-carrinho',
  templateUrl: './carrinho.component.html',
  styleUrls: ['./carrinho.component.css']
})
export class CarrinhoComponent implements OnInit {
itensCarrinho!:Item[]
quantidade:number = 0
desconto:number=0
total:number = 0
totalParcial:number =0
enderecoNovo:boolean = false
usuario:Usuario={
  nome: '',
  email: '',
  cpf: '',
  senha: '',
  telefone: '',
  sobrenome: '',
  dataNascimento: '',
  nomeNegocio: '',
  ramo: '',
  endereco: {
    idEndereco: 1,
    rua: "Cafelandia Brasil",
    numero: 1,
    bairro: "Barueri",
    cidade: "Barueri",
    estado: "Sp",
    referencia: "barueri",
    cep: "06416-150"
  },
  ativado: false
}


constructor(
    private itemService:ItemService,
    private usuarioService:UsuarioService,
    private pedidoService:PedidosService,
    private notificacao:NotificacaoService,
    private enderecoService:EnderecoService
    ) { }

public pedido:Pedidos={
  valorTotal: this.total,
  cliente: this.usuario,
  entrega: { 
    idEndereco: 1,
    rua: "Cafelandia Brasil",
    numero: 1,
    bairro: "Barueri",
    cidade: "Barueri",
    estado: "Sp",
  referencia: "barueri",
    cep: "06416-150"


  }
} 
public enderecoN: Endereco = {
  cep: '',
  rua: '',
  numero: 0,
  bairro: '',
  cidade: '',
  estado: '',
  referencia: ''
}

  ngOnInit(): void {
    this.buscarCarrinho()
  }
public buscarCarrinho(){
      this.desconto = 0
      this.total =0
      this.totalParcial =0
      this.quantidade =0
      
    const email:string = localStorage.getItem("email") as string
    this.itemService.buscarCarrinho(email).subscribe(
        itens =>{
          this.fieldUsuario()
          this.itensCarrinho = itens
          this.calculoQTDdescontoTotal(itens)
        }
    )
  
}
 
public fieldUsuario():void{
      const email = localStorage.getItem("email") as string
        this.usuarioService.findByEmail(email).subscribe(
          usuario=>{
            this.usuario = usuario
            console.log(usuario.endereco)
            this.pedido.entrega = usuario.endereco
            this.pedido.cliente = usuario
            
           

            
          }
        )
        
    }

public calculoQTDdescontoTotal(itens:Item[]){
      const carrinho:Item[]=itens
      this.desconto = 0
      this.total =0
      this.totalParcial =0
      this.quantidade =0
      for (let resultado of carrinho){
          this.quantidade = this.quantidade + resultado.quantidade
          this.desconto = this.desconto + (resultado.produto.desconto * this.quantidade)
          this.totalParcial= this.totalParcial +(resultado.produto.valor * resultado.quantidade) 
         
          this.total = this.totalParcial -  this.desconto
      }
      this.total = this.totalParcial -  this.desconto
      this.pedido.valorTotal = this.totalParcial - this.desconto
      
      
    }

public  DesabilitarInputEnderecoNovo(){
        if(this.enderecoNovo ==true){
          this.enderecoNovo =false
        }else{
          this.enderecoNovo = true
        }
    }
public criarPedido(){
      const pedidoCompleto:Pedidos = this.pedido
      this.pedidoService.novoPedido(pedidoCompleto).subscribe(
        (resposta) =>{
            this.notificacao.showSuccess("Parabens pela sua compra")
            console.log(resposta)
            this.mudarStatusDoItem(resposta.idPedido)
        }
      )
    
      
    }
public mudarStatusDoItem(idPedido:any){
      const status = "PROCESSANDO"
      for(let item of this.itensCarrinho){
        this.atualizarQtdItem(item.idItem as number,item)
      this.itemService.mudarStatus(item.idItem,status).subscribe(
        (resposta) =>{
            
            this.vinculoItemPedido(idPedido,item.idItem)
        }
      )
    }
      
    }
    
public adicionar(index:any){
    if(this.itensCarrinho[index].quantidade <= this.itensCarrinho[index].produto.estoque)
    this.itensCarrinho[index].quantidade =this.itensCarrinho[index].quantidade +1
    this.itensCarrinho[index].valorParcial=this.itensCarrinho[index].produto.valor * this.itensCarrinho[index].quantidade
    this.calculoQTDdescontoTotal(this.itensCarrinho)
   
  }
public remover(index:any,id:any){
    if(this.itensCarrinho[index].quantidade >= 1){
    this.itensCarrinho[index].quantidade =this.itensCarrinho[index].quantidade -1
    this.itensCarrinho[index].valorParcial=this.itensCarrinho[index].produto.valor * this.itensCarrinho[index].quantidade
    this.calculoQTDdescontoTotal(this.itensCarrinho)
    
  }
  if(this.itensCarrinho[index].quantidade < 1){
    const resultado = window.confirm("deseja excluir o item")
    if (resultado) {
      this.removerItem(id);
      this.buscarCarrinho()
    }
  }
  }
public removerItem(index:any){

   this.itemService.excluirItem(index).subscribe(
    ()=>{
      this.notificacao.showSuccess("item excluido")
      this.buscarCarrinho()
    }
   )
  }
public vinculoItemPedido(idPedido:any , idItem:any){
    this.itemService.vincularAoPedido(idPedido,idItem).subscribe(
      (resposta)=>{
        
     
      }
    )
  }

  public criarEndereco(formEditEndereco: NgForm):void{
    if(formEditEndereco.valid){
    this.enderecoService.novoEndereco(this.enderecoN).subscribe(
      (resposta) =>{
      this.notificacao.showSuccess("Endereco cadastrado");
      this.pedido.entrega =resposta
    });
    }
  }
  public atualizarQtdItem(id:number,item:Item){
    this.itemService.AtualizarQtdItem(id,item).subscribe(
      () =>{
      
      }
    )

  }
}
