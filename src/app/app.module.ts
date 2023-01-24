import { AuthModule } from './views/auth/auth.module';
import { environment } from './../environments/environment';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import {AngularFireModule} from '@angular/fire/compat'

import {MatCardModule} from '@angular/material/card';

import {MatIconModule} from '@angular/material/icon';

import { ComponentesModule } from './componentes/componentes.module';
import { MaterialModule } from './shared/material.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './interceptors/Interceptor';
import { JwtModule } from '@auth0/angular-jwt';
import { NgChartsModule } from 'ng2-charts';

import { AngularFirestoreModule } from '@angular/fire/compat/firestore';








@NgModule({
  declarations: [
    AppComponent,
 
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    MaterialModule,
    ComponentesModule,
    MatCardModule,
    HttpClientModule, 
    JwtModule,
    NgChartsModule,
    AngularFirestoreModule,
    MatIconModule,
    ToastrModule.forRoot({
      timeOut:4000,
      progressBar:true,
      closeButton: true,
      positionClass: 'toast-bottom-right' 
    })

  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass : AuthInterceptor,
      multi:true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
