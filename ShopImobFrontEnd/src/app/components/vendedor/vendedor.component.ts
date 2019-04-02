import { Component, OnInit } from '@angular/core';
import { VendedorService } from 'src/app/services/vendedor.service';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-vendedor',
  templateUrl: './vendedor.component.html',
  styleUrls: ['./vendedor.component.scss']
})
export class VendedorComponent implements OnInit {

  public listVendedor: any;
  public saveResult: any;

  public showLoading: boolean;
  constructor(private api: VendedorService,
    private titulo: Title
  ) {
    this.titulo.setTitle('Lista de Vendedores');
  }

  ngOnInit() {
    this.api.getAll().subscribe(res => {
      this.listVendedor = res;
    });
  }
}
