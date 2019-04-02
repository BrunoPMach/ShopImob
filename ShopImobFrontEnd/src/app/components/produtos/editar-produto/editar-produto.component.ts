import { Component, OnInit } from '@angular/core';
import { Produto } from 'src/app/models/produto.model';
import { ActivatedRoute, Router } from '@angular/router';
import { ProdutoService } from 'src/app/services/produto.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-editar-produto',
  templateUrl: './editar-produto.component.html',
  styleUrls: ['./editar-produto.component.scss']
})
export class EditarProdutoComponent implements OnInit {

  public produto: Produto;
  id: number;
  errorMsg: string;
  successMsg: string;
  formErrorMsg: string;
  formProd: FormGroup;
  submitted = false;


  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private _formBuilder: FormBuilder,
    private api: ProdutoService,
    private titulo: Title
  ) {
    this.titulo.setTitle('Atualizar Produto');
    this.formErrorMsg = "Preencha os campos obrigatórios.";
    this.successMsg = "Produto Atualizado com Sucesso.";
    this.errorMsg = "Erro ao atualizar, tente novamente!";
    this.id = route.snapshot.params['id'];
    this.produto = new Produto();
  }

  ngOnInit() {
    this.buildForm();
    this.api.get(this.id).subscribe(res => {
      this.produto = res;
    });
  }

  private buildForm() {
    this.formProd = this._formBuilder.group({
      'Nome': [null, Validators.required],
      'Valor': [null, [Validators.required, Validators.min(0)]],
    });
  }

  get f() { return this.formProd.controls; }

  update() {
    this.produto.Valor = this.produto.Valor.replace(',', '.');
    this.api.update(this.id, this.produto).subscribe(res => {
      if (res.status === 200) {
        alert(this.successMsg);
        this.router.navigate(['produtos/lista']);
      } else {
        alert(this.errorMsg);
      }
    });
  }

  validateForm() {
    if (!this.produto.Nome || !this.produto.Valor) {
      alert(this.formErrorMsg);
    } else {
      this.update();
    }
  }
}
