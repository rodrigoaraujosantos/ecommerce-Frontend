import { UsuarioService } from 'src/app/services/usuario.service';
import { Usuario } from 'src/app/models/usuario';
import { Component, OnInit } from '@angular/core';
import { ItemService } from 'src/app/services/item.service';
import { Item } from 'src/app/models/item';
import {NotificacaoService} from 'src/app/services/notificacao.service';

@Component({
  selector: 'app-pedidos-empreendedor',
  templateUrl: './pedidos-empreendedor.component.html',
  styleUrls: ['./pedidos-empreendedor.component.css']
})
export class PedidosEmpreendedorComponent implements OnInit {

  empreendedor!:Usuario
  itens:Item[] =[]

  ngOnInit(): void {
    this.fieldUsuario()
  }

  statusSelecionado = 'status';

 

  constructor(
    private itemService:ItemService,
    private usuarioService:UsuarioService,
    private notifyService: NotificacaoService
    ) { }


    public buscarVendasDaMinhaLoja(){
      this.itemService.buscarVendasDaMinhaLoja(this.empreendedor.nomeNegocio).subscribe(
        (resposta)=>{
          this.itens = resposta
        }
      )

    }

    public fieldUsuario():void{
      const email = localStorage.getItem("email") as string
        this.usuarioService.findByEmail(email).subscribe(
          usuario=>{
            this.empreendedor = usuario
            this.buscarVendasDaMinhaLoja()
            
          
          }
        )
    }
    public mudarStatusDoItem(item:Item){
      const itemAtual:Item = item
      this.itemService.mudarStatus(item.idItem,item.carrinho).subscribe(
        (resposta) =>{
            
          this.notifyService.showSuccess("Status atualizado")
        }
      )
    }
      
    }





