import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { Venda } from 'src/app/models/venda.model';
import { Vendedor } from 'src/app/models/vendedor.model';
import { VendaService } from 'src/app/services/venda.service';
import { VendedorService } from 'src/app/services/vendedor.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { AppUtils } from 'src/app/util/app.util';
import { ProdutoService } from 'src/app/services/produto.service';
import { Produto } from 'src/app/models/produto.model';

@Component({
  selector: 'app-editar-venda',
  templateUrl: './editar-venda.component.html',
  styleUrls: ['./editar-venda.component.scss']
})
export class EditarVendaComponent implements OnInit {

  public venda: Venda;
  public vendedores: Vendedor[] = new Array<Vendedor>();
  public produtos: Produto[] = new Array<Produto>();
  id: number;
  errorMsg: string;
  successMsg: string;
  formErrorMsg: string;
  formVenda: FormGroup;
  submitted = false;

  constructor(
    private api: VendaService,
    private apiVendedor: VendedorService,
    private apiProduto: ProdutoService,
    private route: ActivatedRoute,
    private router: Router,
    private _formBuilder: FormBuilder,
    private titulo: Title
  ) {
    this.titulo.setTitle('Atualizar venda');
    this.formErrorMsg = "Preencha os campos obrigatórios.";
    this.successMsg = "Atualização realizada com sucesso.";
    this.errorMsg = "Erro ao atualizar, tente novamente!";
    this.id = route.snapshot.params['id'];
    this.venda = new Venda();
  }

  ngOnInit() {
    this.buildForm();
    this.loadVendedor();
    this.loadProduto();
    this.api.get(this.id).subscribe(res => {
      this.venda = res;
      this.venda.Id_Produto = res.Produto.Id_Produto;
      this.venda.Id_Vendedor = res.Vendedor.Id_Vendedor;
      if (this.venda.DataVenda !== null && this.venda.DataVenda !== undefined) {
        this.venda.DataVenda = AppUtils.getBRDateLocaleFormat(this.venda.DataVenda);
      }
    });
  }

  private buildForm() {
    this.formVenda = this._formBuilder.group({
      'Id_Vendedor': [null, Validators.required],
      'Id_Produto': [null, Validators.required],
      'NomeVendedor': [null, Validators.required],
      'DataVenda': [null, Validators.required],
      'ValorComissao': [null, [Validators.required, Validators.min(0)]],
      'ValorTotal': [null, [Validators.required, Validators.min(0)]],
    });
  }

  get f() { return this.formVenda.controls; }

  loadVendedor() {
    this.apiVendedor.getAll().subscribe(res => {
      this.vendedores = res;
    });
  }

  loadProduto() {
    this.apiProduto.getAll().subscribe(res => {
      this.produtos = res;
    });
  }


  calcCommission() {
    if (this.venda.ValorTotal !== null && this.venda.ValorTotal !== undefined) {
      this.venda.ValorComissao = (parseInt(this.venda.ValorTotal) * 0.05).toString();
    } else {
      this.venda.ValorComissao = '0';
    }
  }

  calcValorTotal() {
    const valorProduto = this.produtos.find(x => x.Id_Produto == this.venda.Id_Produto);
    if (valorProduto !== null && valorProduto !== undefined && this.venda.Quantidade > 0) {
      this.venda.ValorTotal = (parseInt(valorProduto.Valor) * this.venda.Quantidade).toString();
      this.calcCommission();
    } else {
      this.venda.ValorTotal = '0';
    }

  }

  validateForm() {
    if (this.venda.Id_Vendedor !== null && this.venda.Id_Vendedor !== undefined) {
      this.venda.Fk_Vendedor = this.venda.Id_Vendedor;
    }
    if (this.venda.Id_Produto !== null && this.venda.Id_Produto !== undefined) {
      this.venda.Fk_Produto = this.venda.Id_Produto;
    }
    if (!this.venda.Fk_Vendedor || !this.venda.DataVenda || !this.venda.Fk_Produto ||
      !this.venda.ValorComissao || !this.venda.ValorTotal ||
      !this.venda.Quantidade) {
      return null;
    } else {
      this.update();
    }
  }

  update() {
    this.venda.ValorTotal = this.venda.ValorTotal.replace(',', '.');
    this.venda.ValorComissao = this.venda.ValorComissao.replace(',', '.');
    this.api.update(this.id, this.venda).subscribe(res => {
      if (res.status === 200) {
        alert(this.successMsg);
        this.router.navigate(['vendas/lista']);
      } else {
        alert(this.errorMsg);
      }
    });
  }

  cleanForm() {
    this.formVenda.reset();
  }

}
