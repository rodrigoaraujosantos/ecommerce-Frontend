import { NotificacaoService } from './../../../services/notificacao.service';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Empreendedor } from 'src/app/models/empreendedor';
import { Produto } from 'src/app/models/produto';
import { ProdutoAdmin } from 'src/app/models/produto-admin';
import { EmpreendedorService } from 'src/app/services/empreendedor.service';
import { ProdutoService } from 'src/app/services/produto.service';

@Component({
  selector: 'app-relacao-produtos',
  templateUrl: './relacao-produtos.component.html',
  styleUrls: ['./relacao-produtos.component.css']
})
export class RelacaoProdutosComponent implements OnInit {

  
  produtos: Produto[]= [];    
  produtosAdmin: ProdutoAdmin[] = [];
  empreendedor: Empreendedor[]=[];

  constructor(private produtoService: ProdutoService,
    private empreendedorService: EmpreendedorService,
    public dialog: MatDialog,
    private notificacaoService:NotificacaoService
    ) { }

  ngOnInit(): void {
    this.initializeProdutos();
    this.initializeEmpreendedor();
  }

  private initializeProdutos(): void {
    this.produtoService.findAll().subscribe(produtos => {
      this.produtos = produtos;
    

    })
  }

  private initializeEmpreendedor(): void {
    this.empreendedorService.findAllEmpreendedor().subscribe(empreendedor=>{
      this.empreendedor = empreendedor;
  
    })   
  }

  public zerarEstoque(produto:Produto){
    const produtoZero = produto
    if(produtoZero.estoque != 0){
    
    this.produtoService.zerarEstoque(produtoZero.idProduto as number).subscribe(
      ()=>{
        this.notificacaoService.showSuccess("Produto retirado o marketplace.")
        this.initializeProdutos()
      }
    )
  }else {
    this.notificacaoService.showWarning("O produto ja foi retirado do marketplace.")
  }

}
}
