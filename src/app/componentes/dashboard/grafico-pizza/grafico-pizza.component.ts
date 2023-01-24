import { Component, ElementRef, OnInit, ViewChild,Input } from '@angular/core';
import { ChartConfiguration, ChartData, ChartEvent, ChartType } from 'chart.js';
import DatalabelsPlugin from 'chartjs-plugin-datalabels';
import { BaseChartDirective } from 'ng2-charts';

@Component({
  selector: 'app-grafico-pizza',
  templateUrl: './grafico-pizza.component.html',
  styleUrls: ['./grafico-pizza.component.css']
})
export class GraficoPizzaComponent implements OnInit {
  @ViewChild("meuCanvas", { static:true }) elemento:ElementRef | undefined
  @ViewChild(BaseChartDirective) chart: BaseChartDirective | undefined;
  constructor() { }

  ngOnInit(): void {
  }
 @Input()
 public dados: ChartData<'pie', number[], string | string[]> = {
  labels: [ ],
  datasets: [ {
    data: [ 300, 500, 100,400 ]
  } ]
};

  public pieChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
        position: 'top',
      }


      
     
    }

  };
 
  public pieChartType: ChartType = 'pie';
  public pieChartPlugins = [ DatalabelsPlugin ];
  
  // events
  public chartClicked2({ event, active }: { event: ChartEvent, active: {}[] }): void {
    console.log(event, active);
  }
  
  public chartHovered2({ event, active }: { event: ChartEvent, active: {}[] }): void {
    console.log(event, active);
  }
  
}
