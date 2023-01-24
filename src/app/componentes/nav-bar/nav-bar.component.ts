import { Component, HostListener, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NotificacaoService } from 'src/app/services/notificacao.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {
 empreendedor : boolean = false
admin:boolean = false
cliente:boolean = false
home:boolean = false

  constructor(
    private Router: Router,
    private notifyService: NotificacaoService

    ) {
   }

  ngOnInit(): void {
    this.trocaRole()
  }
  
  navbarVisible = true;

  @HostListener('window:scroll')
  onWindowScroll() {
    // Verifica se o usuário rolou para baixo ou para cima
    this.navbarVisible = window.pageYOffset < 60;
  }

    logout(){
      localStorage.clear()
      this.Router.navigate(["/auth"])
      this.notifyService.showSuccess("Até logo!")
    }

   trocaRole(){
   const role = localStorage.getItem("perfil")
    switch (role) {

     case  'ROLE_ADMIN':
      this.admin = true
      this.cliente = false
      this.empreendedor = false
      this.home = false
      break
    
    case 'ROLE_EMPREENDEDOR':
      this.admin = false
      this.cliente = false
      this.empreendedor = true
      this.home = false
      break
      case 'ROLE_CLIENTE':
      this.admin = false
      this.cliente = true
      this.empreendedor = false
      this.home = false
      break
    default:
      this.admin = false
      this.cliente = false
      this.empreendedor = false
      this.home = true
      
   }
}



}
