import { Venda } from './../../../models/venda.model';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { VendaService } from 'src/app/services/venda.service';

@Component({
  selector: 'app-apagar-venda',
  templateUrl: './apagar-venda.component.html',
  styleUrls: ['./apagar-venda.component.scss']
})
export class ApagarVendaComponent implements OnInit {

  public venda: Venda;
  id: number;
  error: boolean;
  errorMsg: string;
  success: boolean;
  successMsg: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private api: VendaService
  ) {

    this.successMsg = "Venda deletada com sucesso.";
    this.errorMsg = "Erro remover, tente novamente!";
    this.id = route.snapshot.params['id'];
    this.venda = new Venda();
    this.error = false;
    this.success = false;
  }

  ngOnInit() {
    this.api.get(this.id).subscribe(res => {
      this.venda = res;
    });
  }

  remove() {
    this.api.delete(this.id).subscribe(res => {
      if (res.status === 200) {
        alert(this.successMsg);
        this.router.navigate(['vendas/lista']);
      } else {
        alert(this.errorMsg);
      }
    });
  }
}
