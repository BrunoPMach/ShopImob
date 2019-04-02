import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { HttpService } from './http.service';
import { map } from 'rxjs/operators';
import { Venda } from '../models/venda.model';

@Injectable()
export class VendaService {
  private api: string;
  constructor(private http: Http, private httpService: HttpService) {
    this.api = httpService.getShopImob() + 'venda/';
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

  getDTO() {
    return this.http.get(this.api)
      .pipe(map(res => {
        return res.json();
      }));
  }

  getRelatorio() {
    const header = this.httpService.getHeaders();
    return this.http.get(this.api + '/Relatorio')
      .pipe(map(res => {
        return res.json();
      }));
  }

  create(venda: Venda) {
    const header = this.httpService.getHeaders();
    return this.http.post(this.api, venda, header)
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

  update(id: number, venda: Venda) {
    if (id && id > 0) {
      venda.Id_Venda = id;
      const header = this.httpService.getHeaders();
      return this.http.put(this.api + id, venda, header)
        .pipe(map(res => {
          return res;
        }));
    }
  }
}
