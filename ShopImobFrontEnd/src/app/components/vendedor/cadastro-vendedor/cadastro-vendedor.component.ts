import { Component, OnInit } from '@angular/core';
import { Vendedor } from '../../../models/vendedor.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { VendedorService } from 'src/app/services/vendedor.service';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-cadastro-vendedor',
  templateUrl: './cadastro-vendedor.component.html',
  styleUrls: ['./cadastro-vendedor.component.scss']
})
export class CadastroVendedorComponent implements OnInit {

  public vendedor: Vendedor;
  errorMsg: string;
  successMsg: string;
  formErrorMsg: string;
  formVendedor: FormGroup;
  submitted = false;

  constructor(
    private api: VendedorService,
    private router: Router,
    private _formBuilder: FormBuilder,
    private titulo: Title
  ) {
    this.titulo.setTitle('Registrar Vendedor');
    this.formErrorMsg = "Preencha os campos obrigatórios.";
    this.successMsg = "Vendedor cadastrado com sucesso!";
    this.errorMsg = "Erro ao cadastrar, tente novamente!";
    this.vendedor = new Vendedor();

  }

  ngOnInit() {
    this.buildForm();
  }

  private buildForm() {
    this.formVendedor = this._formBuilder.group({
      'Nome': [null, Validators.required],
      'Documento': [null, Validators.required],
      'Salario': [null, [Validators.required, Validators.min(0)]],
      'DataNascimento': [null, Validators.required],
      'Genero': [null, Validators.required],
      'Endereco': [null, Validators.required],
    });
  }

  get f() { return this.formVendedor.controls; }

  validateForm() {
    if (!this.vendedor.Nome || !this.vendedor.Documento ||
      !this.vendedor.Salario || !this.vendedor.DataNascimento ||
      !this.vendedor.Genero || !this.vendedor.Endereco) {
      return null;
    } else {
      this.save();
    }
  }

  save() {
    debugger;
    this.vendedor.Salario = this.vendedor.Salario.replace(",", ".");
    this.api.create(this.vendedor).subscribe(res => {
      if (res.status === 200) {
        this.cleanForm(),
          this.router.navigate(["/vendedor/lista"])
        alert(this.successMsg)
      } else {
        alert(this.errorMsg);
      }
    })
  }

  cleanForm() {
    this.formVendedor.reset();
  }

}
