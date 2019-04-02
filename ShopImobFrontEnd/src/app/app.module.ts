import { VendedorService } from './services/vendedor.service';
import { VendaService } from './services/venda.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ComponentsModule } from './components/components.module';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { HttpService } from './services/http.service';
import { ProdutoService } from './services/produto.service';
import { HttpModule } from '@angular/http';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,

  ],
  imports: [
    HttpModule,
    ReactiveFormsModule,
    BrowserModule,
    AppRoutingModule,
    ComponentsModule,
    NgbModule.forRoot(),


  ],
  providers: [
    HttpService,
    ProdutoService,
    VendaService,
    VendedorService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
