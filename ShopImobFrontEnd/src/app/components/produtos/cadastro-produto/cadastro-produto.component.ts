import { Component, OnInit } from '@angular/core';

import { Produto } from './../../../models/produto.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { ProdutoService } from '../../../services/produto.service';

@Component({
  selector: 'app-cadastro-produto',
  templateUrl: './cadastro-produto.component.html',
  styleUrls: ['./cadastro-produto.component.scss']
})
export class CadastroProdutoComponent implements OnInit {

  public produto: Produto;
  errorMsg: string;
  successMsg: string;
  formErrorMsg: string;
  formProd: FormGroup;
  submitted = false;

  constructor(
    private apiProduto: ProdutoService,
    private router: Router,
    private _formBuilder: FormBuilder,
    private titulo: Title
    ) {
    this.titulo.setTitle('Registrar Produto');
    this.successMsg = "Produto cadastrado com sucesso!";
    this.errorMsg = "Erro ao cadastrar, tente novamente!";
    this.produto = new Produto();

  }

  ngOnInit() {
    this.buildForm();
  }

  private buildForm() {
    this.formProd = this._formBuilder.group({
      'Nome': [null, Validators.required],
      'Valor': [null, [Validators.required, Validators.min(0)]],
    });
  }

  get f() { return this.formProd.controls; }

  validateForm() {

    console.log(this.produto);

    if (!this.produto.Nome || !this.produto.Valor) {
      return null;
    } else {
      this.save();
    }
  }

  save() {
    this.produto.Valor = this.produto.Valor.replace(',', '.');
    this.apiProduto.create(this.produto).subscribe(res => {
      if (res.status === 200) {
        this.cleanForm(),
          this.router.navigate(["/produtos/lista"])
        alert(this.successMsg);
      } else {
        return alert(this.errorMsg);
      }
    })
  }

  cleanForm() {
    this.formProd.reset();
  }
}