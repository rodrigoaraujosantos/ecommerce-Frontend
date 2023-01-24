import { Component, ElementRef, OnInit, ViewChild,Input } from '@angular/core';
import { ChartConfiguration, ChartData, ChartEvent, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';

@Component({
  selector: 'app-grafico-barra',
  templateUrl: './grafico-barra.component.html',
  styleUrls: ['./grafico-barra.component.css']
})
export class GraficoBarraComponent implements OnInit {
  @ViewChild("meuCanvas", { static:true }) elemento:ElementRef | undefined
  @ViewChild(BaseChartDirective) chart: BaseChartDirective | undefined;

  @Input() 
  public barChartData:ChartData<'bar'> ={
    datasets: []
  } 
  constructor() { }

  public barChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    scales: {
      x: {},
      y: {
        min: 0
      }
    },
    plugins: {
      legend: {
        display: true,
        
      },
      
    }
  };
  public barChartType: ChartType = 'bar';
// events
public chartHovered({ event, active }: { event?: ChartEvent, active?: {}[] }): void {
}
  ngOnInit(): void {
  }

}
