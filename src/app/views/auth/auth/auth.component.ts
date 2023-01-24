import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Credenciais } from 'src/app/models/credenciais';
import { TokenDecodificado } from 'src/app/models/token-decodificado';
import { AuthService } from 'src/app/services/auth.service';
import { NotificacaoService } from 'src/app/services/notificacao.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

public formLogin: FormGroup
  
  

  constructor(
    formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private notifyService: NotificacaoService,
    
    
    ) {
    this.formLogin = formBuilder.group({
      email:["", [Validators.required, Validators.email]],
      senha:["", [Validators.required]]
    });
   }

  ngOnInit(): void {
  }

  public signIn(): void{
    if(this.formLogin.valid){
      const credenciais : Credenciais = this.formLogin.value
      this.authService.authenticate(credenciais).subscribe(response =>{
       
        this.extrairEmailPerfil()
       
        const role = localStorage.getItem("perfil")
        switch (role) {
    
         case  'ROLE_ADMIN':
        this.router.navigate(['/administrador'])
          break
        
        case 'ROLE_EMPREENDEDOR':
          this.router.navigate(['/empreendedor'])
          break
          case 'ROLE_CLIENTE':
            this.router.navigate(['/cliente'])
          break
        
        }

        this.notifyService.showSuccess("Bem vindo(a)!");
      }
      
      );
     
    }else{
      this.notifyService.showError("Dados Invalidos.");
    }
  }
  public extrairEmailPerfil(){
    const jwtService = new JwtHelperService();
    const tokenLogado:string = localStorage.getItem("token") as string
    const decodedToken:TokenDecodificado = jwtService.decodeToken(tokenLogado) as TokenDecodificado
    localStorage.setItem("email",decodedToken.sub)
    localStorage.setItem("perfil",decodedToken.perfil)
  }
}
