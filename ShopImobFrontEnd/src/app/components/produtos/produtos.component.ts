import { Component, OnInit } from '@angular/core';

import { ProdutoService } from '../../services/produto.service';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-produtos',
  templateUrl: './produtos.component.html',
  styleUrls: ['./produtos.component.scss']
})
export class ProdutosComponent implements OnInit {

  public listProduto: any;
  public saveResult: any;

  public showLoading: boolean;
  constructor(private api: ProdutoService,
    private titulo: Title
  ) {
    this.titulo.setTitle('Lista de Produtos');
  }

  ngOnInit() {
    this.api.getAll().subscribe(res => {
      this.listProduto = res;
    });
  }
}
