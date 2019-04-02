import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Vendedor } from 'src/app/models/vendedor.model';
import { VendedorService } from 'src/app/services/vendedor.service';
import { AppUtils } from 'src/app/util/app.util';
import { Title } from '@angular/platform-browser';


@Component({
  selector: 'app-apagar-vendedor',
  templateUrl: './apagar-vendedor.component.html',
  styleUrls: ['./apagar-vendedor.component.scss']
})
export class ApagarVendedorComponent implements OnInit {

  public vendedor: Vendedor;
  id: number;
  error: boolean;
  errorMsg: string;
  success: boolean;
  successMsg: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private api: VendedorService,
    private titulo: Title
  ) {
    this.titulo.setTitle('Apagar Vendedor');
    this.successMsg = "Vendedor deletado com sucesso.";
    this.errorMsg = "Erro remover, tente novamente!";
    this.id = route.snapshot.params['id'];
    this.vendedor = new Vendedor();
    this.error = false;
    this.success = false;
  }

  ngOnInit() {
    this.api.get(this.id).subscribe(res => {
      this.vendedor = res;
      if (this.vendedor.DataNascimento !== null && this.vendedor.DataNascimento !== undefined) {
        this.vendedor.DataNascimento = AppUtils.getBRDateLocaleFormat(this.vendedor.DataNascimento);
      }
    });
  }

  remove() {
    this.api.delete(this.id).subscribe(res => {
      if (res.status === 200) {
        alert(this.successMsg);
        this.router.navigate(['vendedor/lista']);
      } else {
        alert(this.errorMsg);
      }
    });
  }

}
