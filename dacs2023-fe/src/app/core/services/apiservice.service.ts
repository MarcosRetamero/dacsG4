import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClientModule } from '@angular/common/http';
import { IRequestTest } from '../models/request.interface';

import { IResponse, ITestResponse } from '../models/response.interface';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class ApiService {
    private baseUrl = environment.backendForFrontendUrl;

    constructor(private http: HttpClient) {

    }

    getPing(): Observable<string> {
        return this.http.get(`${this.baseUrl}/ping`, { responseType: 'text' });
    }

    getConectorPing(): Observable<string> {
        return this.http.get(`${this.baseUrl}/conector/ping`, { responseType: 'text' });
    }

    getTest(): Observable<ITestResponse> {
        return this.http.get<ITestResponse>(`${this.baseUrl}/test`);
    }

    postTest(param: IRequestTest) { 
        const url = `${this.baseUrl}/test`;
        return this.http.post<any[]>(url, param, this.headers);
    }

    get headers() {
        return {
            headers: {
                'Content-Type': 'application/json',
            },
        };
    }

}




