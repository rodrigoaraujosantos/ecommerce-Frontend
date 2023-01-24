import { DashboardService } from './../../../services/dashboard.service';
import { Component, OnInit } from '@angular/core';
import { ChartData } from 'chart.js';
import { DadosGraficosUsuarios } from 'src/app/models/dados-graficos-usuarios';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-dashboard-admin',
  templateUrl: './dashboard-admin.component.html',
  styleUrls: ['./dashboard-admin.component.css']
})
export class DashboardAdminComponent implements OnInit {

  public anoEscolhido:string = "2023"
  public dadosGraficosusuario: DadosGraficosUsuarios ={
    cadastrados: 0,
    mes: '',
    semana: '',
    quantidade: 0,
    quantidadeAdm: '',
    quantidadeCliente: '',
    quantidadeEmpreendedor: '',
    quantidadeProdutos: '',
    nome: '',
    categoria: '',
    nomeProduto: '',
    qtdVendido: 0
  }

  public graficoCliente: boolean = false;
  public graficoEmpreendedor:boolean = false;
  public graficoProdutosSemana:boolean = false;
  public graficoProdutosMes :boolean = false;
  public graficoProdutosVendidos :boolean = false;

  
  constructor(
    private dashboardService:DashboardService,
    private usuarioService:UsuarioService
  ) { }

  ngOnInit(): void {
    
    this.InicializadorGraficoCLienteEmpreendedor()
  }

  InicializadorGraficoCLienteEmpreendedor(){
 
  const ano:string = this.anoEscolhido
  const email:string = localStorage.getItem("email") as string
  this.usuarioService.findByEmail(email).subscribe( usuario =>{
  this.dadosGraficosusuario.nome = usuario.nome  
  this.clientesCadastrados(ano)
  this.empreendedoresCadastrados(ano)
  this.getTotalAdmCadastrado(ano)
  this.getTotalClienteCadastrado(ano)
  this.getTotalEmpreendedoresCadastrado(ano)
  this.getTotalProdutosCadastrado(ano)
  this.produtosCadastradosSemana(ano)
  this.produtosCadastradosMes(ano)
  this.produtosMaisVendidos(ano)

})
}


getTotalAdmCadastrado(ano:string): void{
  this.dashboardService.totalAdmCadastrados(ano).subscribe((quantidade) =>
   {this.dadosGraficosusuario.quantidadeAdm =  quantidade.quantidadeAdm}
);
}

getTotalClienteCadastrado(ano:string): void{
  this.dashboardService.totalClienteCadastrados(ano).subscribe((quantidade) =>
   {this.dadosGraficosusuario.quantidadeCliente =  quantidade.quantidadeCliente}
);
}

getTotalEmpreendedoresCadastrado(ano:string): void{
  this.dashboardService.totalEmpreendedoresCadastrados(ano).subscribe((quantidade) =>
   {this.dadosGraficosusuario.quantidadeEmpreendedor =  quantidade.quantidadeEmpreendedor}
);
}

getTotalProdutosCadastrado(ano:string): void{
  this.dashboardService.totalProdutosCadastrados(ano).subscribe((quantidade) =>
   {this.dadosGraficosusuario.quantidadeProdutos =  quantidade.quantidadeProdutos}
);
}

labels:string[] = []
data:number[] = []

labelsGraficoEmpreendedor:string[] = []
dataGraficoEmpreendedor:number[] = []

labelsGraficoProdutosSemana:string[] = []
dataGraficoProdutosSemana:number[] = []

labelsGraficoProdutosMes:string[] = []
dataGraficoProdutosMes:number[] = []

labelsGraficoProdutosMaisVendidos:string[] = []
dataGraficoProdutosMaisVendidos:number[] = []

  public barChartData: ChartData<'bar'> = {
    labels: this.labels,
    datasets: [  
      { data:this.data, label:'cliente' }
                     ]
  };

  public dadosEmpreendedor: ChartData<'bar'> = {
    labels: this.labelsGraficoEmpreendedor,
    datasets:  [
      { data:this.dataGraficoEmpreendedor , label:'Empreendedor'},
     
    ]
  };

  public dadosProdutoSemana: ChartData<'bar'> = {
    labels: this.labelsGraficoProdutosSemana,
    datasets:  [
      { data:this.dataGraficoProdutosSemana , label:'produtos Semana'},
     
    ]
  };

  public dadosProdutoMes: ChartData<'bar'> = {
    labels: this.labelsGraficoProdutosMes,
    datasets:  [
      { data:this.dataGraficoProdutosMes, label:'produtos Mês'},
     
    ]
  };

  public pieChartData: ChartData<'pie', number[], string | string[]> = {
    labels: this.labelsGraficoProdutosMaisVendidos,
    datasets: [ {
      data: this.dataGraficoProdutosMaisVendidos
    } ]
  };

  public clientesCadastrados(ano:string){
   
    this.dashboardService.clienteCadastradosPorMes(ano).subscribe(
      (resposta)=>{
        console.log(resposta)
        for (let dados of resposta){
          this.labels.push(dados.mes)
          this.data.push(dados.cadastrados)
        }
        this.graficoCliente = true;
      }
    )
  }
  public empreendedoresCadastrados(ano:string){
    this.graficoEmpreendedor = false;
    this.dashboardService.empreendedoresCadastradosPorMes(ano).subscribe(
      (resposta)=>{
        console.log(resposta)
        for (let dados of resposta){
          this.labelsGraficoEmpreendedor.push(dados.mes)
          this.dataGraficoEmpreendedor.push(dados.cadastrados)
        }
        this.graficoEmpreendedor = true;
        }
    )
  }

  public produtosCadastradosSemana(ano:string){
    
    this.dashboardService.totalProdutosCadastradosSemana(ano).subscribe(
      (resposta)=>{
        console.log(resposta)
        for (let dados of resposta){
          this.labelsGraficoProdutosSemana.push(dados.semana)
          this.dataGraficoProdutosSemana.push(dados.quantidade)
        }
        this.graficoProdutosSemana = true;
        }
    )
  }

  public produtosCadastradosMes(ano:string){
    
    this.dashboardService.totalProdutosCadastradosMes(ano).subscribe(
      (resposta)=>{
        console.log(resposta)
        for (let dados of resposta){
          this.labelsGraficoProdutosMes.push(dados.mes)
          this.dataGraficoProdutosMes.push(dados.cadastrados)
        }
        this.graficoProdutosMes = true;
        }
    )
  }

  public produtosMaisVendidos(ano:string){
    
    this.dashboardService.produtosMaisVendidosPorCategoria(ano).subscribe(
      (resposta)=>{
        for (let dados of resposta){
          this.labelsGraficoProdutosMaisVendidos.push(dados.categoria)
          this.dataGraficoProdutosMaisVendidos.push(dados.qtdVendido)
        }
        this.graficoProdutosVendidos = true;
      }
    )
  }
  public limparGraficos(){
    this.graficoCliente = false;
    this.graficoEmpreendedor = false;
    this.graficoProdutosSemana = false;
    this.graficoProdutosMes  = false;
    this.graficoProdutosVendidos  = false;


    this.labels = []
   this.data = []
   this.labelsGraficoEmpreendedor = []
   this.dataGraficoEmpreendedor= []

  this.labelsGraficoProdutosSemana = []
  this.dataGraficoProdutosSemana = []

  this.labelsGraficoProdutosMes = []
   this.dataGraficoProdutosMes = []

 this.labelsGraficoProdutosMaisVendidos = []
  this.dataGraficoProdutosMaisVendidos = []
  }
}










