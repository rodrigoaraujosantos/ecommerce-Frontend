import { Component, OnInit } from '@angular/core';
import { Produto } from './../../../models/produto';
import { ProdutoService } from 'src/app/services/produto.service';
import { AuthService } from './../../../services/auth.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {


//Variaveis de manipulação
produtos: Produto[] = [];

constructor( private produtoService: ProdutoService,
private authService:AuthService
 ) { }

ngOnInit(): void {
this.initializeProdutos();
}
private initializeProdutos(): void {
 
  this.produtoService.findBysuperProduto().subscribe(produtos => {
    this.produtos = produtos;
   
    
  })

}


}

