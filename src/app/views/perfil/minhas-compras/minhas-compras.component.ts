import { UsuarioService } from './../../../services/usuario.service';
import { ItemService } from './../../../services/item.service';
import { PedidosService } from './../../../services/pedidos.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NotificacaoService } from 'src/app/services/notificacao.service';
import { MinhasCompras } from 'src/app/models/minhas-compras';
import { Usuario } from 'src/app/models/usuario';

@Component({
  selector: 'app-minhas-compras',
  templateUrl: './minhas-compras.component.html',
  styleUrls: ['./minhas-compras.component.css']
})
export class MinhasComprasComponent implements OnInit {
public minhasCompras:MinhasCompras[]=[]


  constructor( 

    private router: Router,
    private notifyService: NotificacaoService,
    private pedidoService:PedidosService,
    private itemService:ItemService,
    private usuarioService:UsuarioService) { }
  
    public usuario!: Usuario ;
  ngOnInit(): void {
    this.buscarUsuario()
   
  }
  public buscarUsuario(){
    const email = localStorage.getItem("email") as string
    this.usuarioService.findByEmail(email).subscribe(
      usuario=>{
        this.usuario = usuario
        this.buscarCompras()
       
      }
    )
  
  }

  public buscarCompras(){

    const email:string = localStorage.getItem("email") as string
    this.pedidoService.buscarPedidoPorEmail(email).subscribe(
      (resposta)=>{
       
        this.minhasCompras = resposta
        this.buscarItensDoPedido()
       
        
      }
    )
  }


public buscarItensDoPedido(){
  for( let pedido of this.minhasCompras){

         this.itemService.buscarItensDoPedido(pedido.idPedido).subscribe(
          (array)=>{
            pedido.itens = array
            
          }
         )
         }
} 



}
