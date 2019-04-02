import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { ComponentsRoutingModule } from './components-routing.module';

import { CadastroVendaComponent } from './vendas/cadastro-venda/cadastro-venda.component';
import { EditarVendaComponent } from './vendas/editar-venda/editar-venda.component';
import { ApagarVendaComponent } from './vendas/apagar-venda/apagar-venda.component';
import { VendasComponent } from './vendas/vendas.component';
import { EditarProdutoComponent } from './produtos/editar-produto/editar-produto.component';
import { ApagarProdutoComponent } from './produtos/apagar-produto/apagar-produto.component';
import { CadastroProdutoComponent } from './produtos/cadastro-produto/cadastro-produto.component';
import { ProdutosComponent } from './produtos/produtos.component';
import { VendedorComponent } from './vendedor/vendedor.component';
import { ReportComponent } from './report/report.component';
import { ApagarVendedorComponent } from './vendedor/apagar-vendedor/apagar-vendedor.component';
import { CadastroVendedorComponent } from './vendedor/cadastro-vendedor/cadastro-vendedor.component';
import { EditarVendedorComponent } from './vendedor/editar-vendedor/editar-vendedor.component';


@NgModule({
    imports: [CommonModule, ComponentsRoutingModule, FormsModule, BrowserModule, ReactiveFormsModule],
    declarations: [
        CadastroVendaComponent,
        EditarVendaComponent,
        ApagarVendaComponent,
        VendasComponent,
        EditarProdutoComponent,
        ApagarProdutoComponent,
        CadastroProdutoComponent,
        ProdutosComponent,
        VendedorComponent,
        ReportComponent,
        ApagarVendedorComponent,
        CadastroVendedorComponent,
        EditarVendedorComponent
        
    ],
    exports: []
})
export class ComponentsModule {}
