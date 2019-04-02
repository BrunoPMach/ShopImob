import { Vendedor } from 'src/app/models/vendedor.model';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { VendedorService } from 'src/app/services/vendedor.service';
import { AppUtils } from 'src/app/util/app.util';

@Component({
  selector: 'app-editar-vendedor',
  templateUrl: './editar-vendedor.component.html',
  styleUrls: ['./editar-vendedor.component.scss']
})
export class EditarVendedorComponent implements OnInit {

  public vendedor: Vendedor;
  id: number;
  errorMsg: string;
  successMsg: string;
  formErrorMsg: string;
  formVendedor: FormGroup;
  submitted = false;


  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private _formBuilder: FormBuilder,
    private api: VendedorService,


  ) {
    this.formErrorMsg = "Preencha os campos obrigatórios.";
    this.successMsg = "Vendedor Atualizado com Sucesso.";
    this.errorMsg = "Erro ao atualizar, tente novamente!";
    this.id = route.snapshot.params['id'];
    this.vendedor = new Vendedor();
  }

  ngOnInit() {
    this.buildForm();
    this.api.get(this.id).subscribe(res => {
      this.vendedor = res;
      if (this.vendedor.DataNascimento !== null && this.vendedor.DataNascimento !== undefined) {
        this.vendedor.DataNascimento = AppUtils.getBRDateLocaleFormat(this.vendedor.DataNascimento);
      }
    });
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
      this.update();
    }
  }

  update() {
    this.api.update(this.id, this.vendedor).subscribe(res => {
      if (res.status === 200) {
        alert(this.successMsg);
        this.router.navigate(['vendedor/lista']);
      } else {
        alert(this.errorMsg);
      }
    });
  }
}
