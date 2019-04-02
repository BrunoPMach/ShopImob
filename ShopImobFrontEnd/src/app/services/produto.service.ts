import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { HttpService } from './http.service';

import { map } from 'rxjs/operators';

import { Produto } from './../models/produto.model';

@Injectable()
export class ProdutoService {
  private api: string;
  constructor(private http: Http, private httpService: HttpService) {
      this.api = httpService.getShopImob() + 'produto/';
  }

  get(id: number) {
      if (id && id > 0) {
          return this.http.get(this.api + id)
              .pipe(map(res => {
                  return res.json();
              }));
      }
  }

  getAll() {
      return this.http.get(this.api)
          .pipe(map(res => {
              return res.json();
          }));
  }   

  create(produto: Produto) {
      const header = this.httpService.getHeaders();
      return this.http.post(this.api, produto, header)
          .pipe(map(res => {
              return res;
          }));
  }

  delete(id: number) {
      return this.http.delete(this.api + id)
          .pipe(map(res => {
              return res;
          }));
  }

  update(id: number, produto: Produto) {
      if (id && id > 0) {
        produto.Id_Produto = id;
          const header = this.httpService.getHeaders();
          return this.http.put(this.api + id, produto, header)
              .pipe(map(res => {
                  return res;
              }));
      }
  }
}
