import { Injectable } from '@angular/core';
import { Headers, Http, RequestOptions } from '@angular/http';
import { environment } from './../../environments/environment';

@Injectable()
export class HttpService {

  constructor(
    private http: Http
) { }

getHeaders(contentTypeJson?: boolean) {
    const headers = new Headers();
    if (contentTypeJson === undefined || contentTypeJson) {
        headers.append('Content-Type', 'application/json');
    } else {
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
    }
    const options = new RequestOptions({ headers: headers });
    return options;
}

getShopImob(): string {
    return environment.HOST_API;
}
}