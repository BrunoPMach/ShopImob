import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CadastroVendaComponent } from './vendas/cadastro-venda/cadastro-venda.component';
import { EditarVendaComponent } from './vendas/editar-venda/editar-venda.component';
import { ApagarVendaComponent } from './vendas/apagar-venda/apagar-venda.component';
import { VendasComponent } from './vendas/vendas.component';
import { EditarProdutoComponent } from './produtos/editar-produto/editar-produto.component';
import { ApagarProdutoComponent } from './produtos/apagar-produto/apagar-produto.component';
import { CadastroProdutoComponent } from './produtos/cadastro-produto/cadastro-produto.component';
import { ProdutosComponent } from './produtos/produtos.component';
import { VendedorComponent } from './vendedor/vendedor.component';
import { CadastroVendedorComponent } from './vendedor/cadastro-vendedor/cadastro-vendedor.component';
import { EditarVendedorComponent } from './vendedor/editar-vendedor/editar-vendedor.component';
import { ApagarVendedorComponent } from './vendedor/apagar-vendedor/apagar-vendedor.component';
import { ReportComponent } from './report/report.component';

const routes: Routes = [
    {
        path: 'produtos',
        children: [
            { path: 'cadastrar', component: CadastroProdutoComponent },
            { path: 'editar/:id', component: EditarProdutoComponent },
            { path: 'lista', component: ProdutosComponent },
            { path: 'apagar/:id', component: ApagarProdutoComponent }

        ],
    },
    {
        path: 'vendas',
        children: [
            { path: 'cadastrar', component: CadastroVendaComponent },
            { path: 'editar/:id', component: EditarVendaComponent },
            { path: 'lista', component: VendasComponent },
            { path: 'apagar/:id', component: ApagarVendaComponent },
            { path: "relatorio", component: ReportComponent }

        ],
    },
    {
        path: 'vendedor',
        children: [
            { path: 'cadastrar', component: CadastroVendedorComponent },
            { path: 'editar/:id', component: EditarVendedorComponent },
            { path: 'lista', component: VendedorComponent },
            { path: 'apagar/:id', component: ApagarVendedorComponent },

        ]
    }


];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ComponentsRoutingModule { }
