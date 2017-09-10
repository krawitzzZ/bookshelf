import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { environment } from '../../../environment';

@Injectable()
export class ApiService {
  constructor(private http: Http) {}

  private baseUrl = environment.apiUrl;

  get(url: string): Promise<any> {
    const completeUrl = `${this.baseUrl}${url}`;
    return this.http
      .get(completeUrl)
      .toPromise()
      .then(this.extractData)
      .catch(this.handleError);
  }

  put(url: string, body: any): Promise<any> {
    const completeUrl = `${this.baseUrl}${url}`;
    return this.http
      .put(completeUrl, body)
      .toPromise()
      .then(this.extractData)
      .catch(this.handleError);
  }

  post(url: string, body: any): Promise<any> {
    const completeUrl = `${this.baseUrl}${url}`;
    return this.http
      .post(completeUrl, body)
      .toPromise()
      .then(this.extractData)
      .catch(this.handleError);
  }

  delete(url: string): Promise<any> {
    const completeUrl = `${this.baseUrl}${url}`;
    return this.http
      .delete(completeUrl)
      .toPromise()
      .then(this.extractData)
      .catch(this.handleError);
  }

  uploadFile(file: File): Promise<any> {
    const completeUrl = `${this.baseUrl}/upload`;
    const body = new FormData();
    body.append('file', file);
    const headers = new Headers();
    return this.http
      .post(completeUrl, body, { headers })
      .toPromise()
      .then(this.extractData)
      .catch(this.handleError);
  }

  private extractData(res: Response): Promise<any> {
    return res.json();
  }

  private handleError(err: any): Promise<any> {
    const error = err.json();
    const errMsg = error.message
      ? error.message
      : error.status ? `Server responsed with status ${error.status}` : 'Server Error';
    console.error(errMsg, error);
    return Promise.reject(errMsg);
  }
}
