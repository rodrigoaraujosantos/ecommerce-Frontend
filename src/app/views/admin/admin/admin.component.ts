import { PedidosService } from 'src/app/services/pedidos.service';
import { Component, OnInit } from '@angular/core';



@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  
  constructor(
   private pedidoService:PedidosService
    
  ){}
  ngOnInit(): void {
   
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
  
 }



