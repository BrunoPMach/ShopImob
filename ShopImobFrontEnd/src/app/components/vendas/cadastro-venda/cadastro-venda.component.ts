import { Component, OnInit } from '@angular/core';
import { Venda } from 'src/app/models/venda.model';
import { Router } from '@angular/router';
import { VendaService } from 'src/app/services/venda.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { Vendedor } from 'src/app/models/vendedor.model';
import { VendedorService } from 'src/app/services/vendedor.service';
import { Produto } from 'src/app/models/produto.model';
import { ProdutoService } from 'src/app/services/produto.service';

@Component({
  selector: 'app-cadastro-venda',
  templateUrl: './cadastro-venda.component.html',
  styleUrls: ['./cadastro-venda.component.scss']
})
export class CadastroVendaComponent implements OnInit {

  public venda: Venda;
  public vendedores: Vendedor[] = new Array<Vendedor>();
  public produtos: Produto[] = new Array<Produto>();
  errorMsg: string;
  successMsg: string;
  formErrorMsg: string;
  formVenda: FormGroup;
  submitted = false;

  constructor(
    private apiVenda: VendaService,
    private apiVendedor: VendedorService,
    private apiProduto: ProdutoService,
    private router: Router,
    private _formBuilder: FormBuilder,
    private titulo: Title
  ) {
    this.titulo.setTitle('Realizar venda');
    this.formErrorMsg = "Preencha os campos obrigatórios.";
    this.successMsg = "Venda cadastrada com sucesso.";
    this.errorMsg = "Erro ao Registrar, tente novamente!";
    this.venda = new Venda();
  }

  ngOnInit() {
    this.buildForm();
    this.loadVendedor();
    this.loadProduto();
  }

  private buildForm() {
    this.formVenda = this._formBuilder.group({
      'Id_Vendedor': [null, Validators.required],
      'Id_Produto': [null, Validators.required],
      'NomeVendedor': [null, Validators.required],
      'DataVenda': [null, Validators.required],
      'ValorComissao': [null, [Validators.required, Validators.min(0)]],
      'ValorTotal': [null, [Validators.required, Validators.min(0)]],
      'Quantidade': [null, [Validators.required, Validators.min(0)]],
    });
  }

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

  get f() { return this.formVenda.controls; }

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
      this.save();
    }
  }

  save() {
    this.venda.ValorTotal = this.venda.ValorTotal.replace(',', '.');
    this.venda.ValorComissao = this.venda.ValorComissao.replace(',', '.');
    this.apiVenda.create(this.venda).subscribe(res => {
      if (res.status === 200) {
        this.cleanForm(),
          this.router.navigate(["/vendas/lista"])
        alert(this.successMsg);
      } else {
        return alert(this.errorMsg);
      }
    })
  }

  cleanForm() {
    this.formVenda.reset();
  }
}
