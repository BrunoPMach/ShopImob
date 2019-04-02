import { Venda } from './../../models/venda.model';
import { Component, OnInit } from '@angular/core';
import { VendaService } from 'src/app/services/venda.service';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.scss']
})
export class ReportComponent implements OnInit {

  public listVenda: any;
  public ValorTotalComissao = 0;
  public saveResult: any;
  public showLoading: boolean;
  constructor(private api: VendaService,
    private titulo: Title
  ) {
    this.titulo.setTitle('Relatório de Vendas');
  }

  ngOnInit() {
    this.api.getAll().subscribe(res => {
      this.listVenda = res;
      this.listVenda.forEach(venda => {
        this.ValorTotalComissao = + venda.ValorComissao;
      });
    });
    this.calculaComissaoDia();
  }
  calculaComissaoDia() {

  }

}
