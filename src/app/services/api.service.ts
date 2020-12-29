import { Injectable } from '@angular/core';
import { HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { environment } from 'environments/environment';
import { Auth } from '../models/Auth';
import { HttpService } from './http.service';
import { ApiResponse, LoginResponse, ApiGetAllResponse, ApiGetOneResponse, ApiGetCountResponse } from '../models/ApiResponse';
import { QueryParams } from '../models/QueryParams';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private apiBaseUrl = environment.API_ENDPOINT;

  constructor(private httpService: HttpService, private authService: AuthService) { }

  generateQueryUrl(path: string, options?: QueryParams) {
    let url = `${this.apiBaseUrl}/api/${path}?`;
    if (typeof options === 'undefined') { return url; }
    if (!isNaN(options.limit)) { url += 'limit=' + options.limit + '&'; }
    if (!isNaN(options.offset)) { url += 'offset=' + options.offset + '&'; }
    if (options.sort && Array.isArray(options.sort)) { url += 'sort=' + JSON.stringify(options.sort) + '&'; }
    if (options.where && typeof options.where === 'object') { url += 'where=' + JSON.stringify(options.where) + '&'; }
    if (options.filters && typeof options.filters === 'object') { url += 'filters=' + JSON.stringify(options.filters) + '&'; }
    if (options.select && Array.isArray(options.select)) { url += 'select=' + options.select.join(',') + '&'; }
    if (options.populate && Array.isArray(options.populate)) { url += 'populate=' + JSON.stringify(options.populate) + '&'; }
    if (options.data && typeof options.data === 'object') {
      for (const key in options.data) {
        if (options.data.hasOwnProperty(key)) {
          url += `${key}=${options.data[key]}&`;
        }
      }
    }
    return url;
  }

  getHttpOption(additionalHeaders?: any) {
    const headers: any = {
      'Content-Type': 'application/json',
      ...additionalHeaders
    };
    if (!!this.authService.status) {
      headers.Authorization = `Bearer ${this.authService.token}`;
    }
    return {
      headers: new HttpHeaders(headers)
    };
  }

  async authenticate(auth: Auth): Promise<LoginResponse> {
    try {
      const response = await this.httpService.post(`${this.apiBaseUrl}/auth/admin`, auth, {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
        })
      });
      return response;
    } catch (e) {
      if (e instanceof HttpErrorResponse) {
        return e.status ? e.error : { error: e, message: 'network error' };
      } else {
        return { error: e, message: e.message || 'error' };
      }
    }
  }

  async get(url: string, options?: QueryParams): Promise<ApiResponse> {
    try {
      const response = await this.httpService.get(this.generateQueryUrl(url, options), this.getHttpOption());
      return response;
    } catch (e) {
      return this.errorHandler(e);
    }
  }

  async post(url: string, body?: any, options?: QueryParams): Promise<ApiResponse> {
    try {
      const response = await this.httpService.post(this.generateQueryUrl(url, options), body, this.getHttpOption());
      return response;
    } catch (e) {
      return this.errorHandler(e);
    }
  }

  async put(url: string, body?: any, options?: QueryParams): Promise<ApiResponse> {
    try {
      const response = await this.httpService.put(this.generateQueryUrl(url, options), body, this.getHttpOption());
      return response;
    } catch (e) {
      return this.errorHandler(e);
    }
  }

  async delete(url: string, options?: QueryParams): Promise<ApiResponse> {
    try {
      const response = await this.httpService.delete(this.generateQueryUrl(url, options), this.getHttpOption());
      return response;
    } catch (e) {
      return this.errorHandler(e);
    }
  }

  async patch(url: string, body?: any, options?: QueryParams): Promise<ApiResponse> {
    try {
      const response = await this.httpService.patch(this.generateQueryUrl(url, options), body, this.getHttpOption());
      return response;
    } catch (e) {
      return this.errorHandler(e);
    }
  }

  async me(): Promise<ApiGetOneResponse> {
    try {
      const response = await this.httpService.get(this.generateQueryUrl(`user/me`), this.getHttpOption());
      return response;
    } catch (e) {
      return this.errorHandler(e);
    }
  }

  async getAll(entity: string, options?: QueryParams): Promise<ApiGetAllResponse> {
    try {
      const response = await this.httpService.get(this.generateQueryUrl(entity, options), this.getHttpOption());
      return response;
    } catch (e) {
      return this.errorHandler(e);
    }
  }

  async getById(entity: string, id: number | string, options?: QueryParams): Promise<ApiGetOneResponse> {
    try {
      const response = await this.httpService.get(this.generateQueryUrl(`${entity}/${id}`, options), this.getHttpOption());
      return response;
    } catch (e) {
      return this.errorHandler(e);
    }
  }

  async getCount(entity: string, options?: QueryParams): Promise<ApiGetCountResponse> {
    try {
      const response = await this.httpService.get(this.generateQueryUrl(`${entity}/count`, options), this.getHttpOption());
      return response;
    } catch (e) {
      return this.errorHandler(e);
    }
  }

  async create(entity: string, body?: any, options?: QueryParams): Promise<ApiGetOneResponse> {
    try {
      const response = await this.httpService.post(this.generateQueryUrl(entity, options), body, this.getHttpOption());
      return response;
    } catch (e) {
      return this.errorHandler(e);
    }
  }

  async updateById(entity: string, id: number | string, body?: any, options?: QueryParams): Promise<ApiGetOneResponse> {
    try {
      const response = await this.httpService.put(this.generateQueryUrl(`${entity}/${id}`, options), body, this.getHttpOption());
      return response;
    } catch (e) {
      return this.errorHandler(e);
    }
  }

  async deleteById(entity: string, id: number | string, options?: QueryParams): Promise<ApiGetOneResponse> {
    try {
      const response = await this.httpService.delete(this.generateQueryUrl(`${entity}/${id}`, options), this.getHttpOption());
      return response;
    } catch (e) {
      return this.errorHandler(e);
    }
  }

  errorHandler(e: any): any {
    if (e instanceof HttpErrorResponse) {
      return e.status ? { error: e.error, message: e.error?.message || 'network error' } : { error: e, message: 'network error' };
    } else {
      return { error: e, message: e.message || 'error' };
    }
  }
}
