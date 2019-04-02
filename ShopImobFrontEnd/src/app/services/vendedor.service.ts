import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { HttpService } from './http.service';
import { map } from 'rxjs/operators';
import { Vendedor } from './../models/vendedor.model';


@Injectable()
export class VendedorService {
  private api: string;
  constructor(private http: Http, private httpService: HttpService) {
      this.api = httpService.getShopImob() + 'vendedor/';
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

  create(vendedor: Vendedor) {
      const header = this.httpService.getHeaders();
      return this.http.post(this.api, vendedor, header)
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

  update(id: number, vendedor: Vendedor) {
      if (id && id > 0) {
        vendedor.Id_Vendedor = id;
          const header = this.httpService.getHeaders();
          return this.http.put(this.api + id, vendedor, header)
              .pipe(map(res => {
                  return res;
              }));
      }
  }
}