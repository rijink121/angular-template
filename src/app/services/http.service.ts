import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http: HttpClient) { }

  get(url: string, options: any): Promise<any> {
    return this.http.get<any>(url, options).toPromise();
  }

  post(url: string, body: any, options: any): Promise<any> {
    return this.http.post<any>(url, body, options).toPromise();
  }

  put(url: string, body: any, options: any): Promise<any> {
    return this.http.put<any>(url, body, options).toPromise();
  }

  delete(url: string, options: any): Promise<any> {
    return this.http.delete<any>(url, options).toPromise();
  }

  patch(url: string, body: any, options: any): Promise<any> {
    return this.http.patch<any>(url, body, options).toPromise();
  }
}
