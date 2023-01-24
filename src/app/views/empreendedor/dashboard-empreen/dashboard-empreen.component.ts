import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Chart, ChartConfiguration, ChartData, ChartEvent, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';


@Component({
  selector: 'app-dashboard-empreen',
  templateUrl: './dashboard-empreen.component.html',
  styleUrls: ['./dashboard-empreen.component.css']
})
export class DashboardEmpreenComponent  {
@ViewChild("meuCanvas", { static:true }) elemento:ElementRef | undefined
@ViewChild(BaseChartDirective) chart: BaseChartDirective | undefined;

public barChartOptions: ChartConfiguration['options'] = {
  responsive: true,
 
  scales: {
    x: {},
    y: {
      min: 10
    }
  },
  plugins: {
    legend: {
      display: true,
    },
    
  }
};
public barChartType: ChartType = 'bar';


public barChartData: ChartData<'bar'> = {
  labels: [ '2006', '2007', '2008', '2009', '2010', '2011', '2012' ],
  datasets: [
    { data: [ 65, 59, 80, 81, 56, 55, 40 ], label: 'Vendas' },
    { data: [ 28, 48, 40, 19, 86, 27, 90 ], label: 'Clientes' }
    
  ]
};

// events
public chartClicked({ event, active }: { event?: ChartEvent, active?: {}[] }): void {
  console.log(event, active);
}

public chartHovered({ event, active }: { event?: ChartEvent, active?: {}[] }): void {
  console.log(event, active);
}


public pieChartOptions: ChartConfiguration['options'] = {
  responsive: true,
  plugins: {
    legend: {
      display: true,
      position: 'top',
    },
   
  }
};
public pieChartData: ChartData<'pie', number[], string | string[]> = {
  labels: [  'Produtos','RAFAEL' ],
  datasets: [ {
    data: [ 300, 500, 100,400 ]
  } ]
};
public pieChartType: ChartType = 'pie';

// events
public chartClicked2({ event, active }: { event: ChartEvent, active: {}[] }): void {
  console.log(event, active);
}

public chartHovered2({ event, active }: { event: ChartEvent, active: {}[] }): void {
  console.log(event, active);
}

changeLabels(): void {
  const words = [ 'hen', 'variable', 'embryo', 'instal', 'pleasant', 'physical', 'bomber', 'army', 'add', 'film',
    'conductor', 'comfortable', 'flourish', 'establish', 'circumstance', 'chimney', 'crack', 'hall', 'energy',
    'treat', 'window', 'shareholder', 'division', 'disk', 'temptation', 'chord', 'left', 'hospital', 'beef',
    'patrol', 'satisfied', 'academy', 'acceptance', 'ivory', 'aquarium', 'building', 'store', 'replace', 'language',
    'redeem', 'honest', 'intention', 'silk', 'opera', 'sleep', 'innocent', 'ignore', 'suite', 'applaud', 'funny' ];
  const randomWord = () => words[Math.trunc(Math.random() * words.length)];
  this.pieChartData.labels = new Array(3).map(_ => randomWord());

  this.chart?.update();
}

addSlice(): void {
  if (this.pieChartData.labels) {
    this.pieChartData.labels.push([ 'Line 1', 'Line 2', 'Line 3' ]);
  }

  this.pieChartData.datasets[0].data.push(400);

  this.chart?.update();
}
public polarAreaChartLabels: string[] = [ 'Vendas', 'Clientes', 'Produtos'];
public polarAreaChartData: ChartData<'polarArea'> = {
  labels: this.polarAreaChartLabels,
  datasets: [ {
    data: [ 300, 500, 100, 40, 120 ],
    label: 'Series 1'
  } ]
};
public polarAreaLegend = true;

public polarAreaChartType: ChartType = 'polarArea';

// events
public chartClicked3({ event, active }: { event: ChartEvent, active: {}[] }): void {
  console.log(event, active);
}

public chartHovered3({ event, active }: { event: ChartEvent, active: {}[] }): void {
  console.log(event, active);
}
  


}
