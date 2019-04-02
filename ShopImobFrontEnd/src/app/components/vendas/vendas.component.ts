import { Component, OnInit } from '@angular/core';

import { VendaService } from 'src/app/services/venda.service';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-vendas',
  templateUrl: './vendas.component.html',
  styleUrls: ['./vendas.component.scss']
})
export class VendasComponent implements OnInit {

  public listVenda: any;
  public saveResult: any;
  public showLoading: boolean;
  constructor(private api: VendaService,
    private titulo: Title
  ) {
    this.titulo.setTitle('Lista de Vendas');
  }

  ngOnInit() {
    this.api.getAll().subscribe(res => {
      this.listVenda = res;
    });

  }

}
