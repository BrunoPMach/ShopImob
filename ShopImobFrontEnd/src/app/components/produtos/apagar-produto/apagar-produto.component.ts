import { Title } from '@angular/platform-browser';
import { Component, OnInit } from '@angular/core';
import { Produto } from '../../../models/produto.model';
import { ActivatedRoute, Router } from '@angular/router';
import { ProdutoService } from '../../../services/produto.service';

@Component({
  selector: 'app-apagar-produto',
  templateUrl: './apagar-produto.component.html',
  styleUrls: ['./apagar-produto.component.scss']
})
export class ApagarProdutoComponent implements OnInit {

  public produto: Produto;
  id: number;
  error: boolean;
  errorMsg: string;
  success: boolean;
  successMsg: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private api: ProdutoService,
    private titulo: Title
  ) {
    this.titulo.setTitle('Apagar Produto');
    this.successMsg = "Produto Deletado com Sucesso.";
    this.errorMsg = "Erro remover, tente novamente!";
    this.id = route.snapshot.params['id'];
    this.produto = new Produto();
    this.error = false;
    this.success = false;
  }

  ngOnInit() {
    this.api.get(this.id).subscribe(res => {
      this.produto = res;
    });
  }

  remove() {
    this.api.delete(this.id).subscribe(res => {
      if (res.status === 200) {
        alert(this.successMsg);
        this.router.navigate(['produtos/lista']);
      } else {
        alert(this.errorMsg);
      }
    });
  }
}
