import { Empreendedor } from 'src/app/models/empreendedor';
import { Usuario } from 'src/app/models/usuario';
import { Component, OnInit } from '@angular/core';
import { Pedidos } from './../../../models/pedidos';
import { PedidosService } from 'src/app/services/pedidos.service';
import { Item } from 'src/app/models/item';
import { ItemService } from 'src/app/services/item.service';
import { EmpreendedorService } from 'src/app/services/empreendedor.service';


@Component({
  selector: 'app-pedidos',
  templateUrl: './pedidos.component.html',
  styleUrls: ['./pedidos.component.css']
})
export class PedidosComponent implements OnInit {

  pedidos: Pedidos[] = []
  itens:Item[] = []
  empreendedores: Usuario[] =[]
 
  

  constructor(
    private pedidoService: PedidosService,
    private itemService: ItemService,
    private EmpreendedorService: EmpreendedorService
    ) { }

  ngOnInit(): void {
    this.buscarPedidos()
  }
  funcaoGeracao(){
    this.pedidoService.pedidosPDF().subscribe(
      (response) =>{
        const blob = new Blob([response], {type: 'application/pdf'})
  
        const data = window.URL.createObjectURL(blob)
        const link = document.createElement('a')
        link.href = data
        link.download = 'pedidos.pdf'
        link.dispatchEvent(new MouseEvent('click',{bubbles:true, cancelable:true,view:window}))
        setTimeout(function(){
          window.URL.revokeObjectURL(data)
          link.remove();},1000)
        })
  
      }
  public buscarPedidos(){
   
    this.pedidoService.findAll().subscribe(
      (resposta)=>{
       
        this.pedidos = resposta
        this.buscarItensDoPedido()
        
       
        
      }
    )
  }
  public buscarItensDoPedido(){
    for( let pedido of this.pedidos){
  
           this.itemService.buscarItensDoPedido(pedido.idPedido).subscribe(
            (array)=>{
             pedido.itens = array
             this.itens = array
              
            }
           )
           }
  } 
  

  
  
}


 

