import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BffService {
  private apiUrl = 'http://localhost:9001/bff/conector/exercises/with-images';
  private token = 'eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJYM191NGQ4LVRVY0t0WERDTU01UmR3dzkzdi16M3NTek9qOVdKaXlRandzIn0.eyJleHAiOjE3MzYyMDYzOTIsImlhdCI6MTczNjIwMjc5MiwianRpIjoiYjM4NjY0ZmEtMzY2OS00ZjczLTg4ZTEtY2RhZDRkZjRiYTdjIiwiaXNzIjoiaHR0cDovL2xvY2FsaG9zdDo4MDgwL3JlYWxtcy9tYXN0ZXIiLCJhdWQiOlsiZGFjcy1yZWFsbSIsIm1hc3Rlci1yZWFsbSIsImFjY291bnQiXSwic3ViIjoiYzIwODE1MWUtOTM4Mi00MDE4LTg5YjYtMGMyYzc4MmExNWQ4IiwidHlwIjoiQmVhcmVyIiwiYXpwIjoiZGFjczIwMjMtYmZmIiwic2Vzc2lvbl9zdGF0ZSI6IjA3MzdlMjQ3LTlmNmItNDhlYi04OGQyLTVhY2ZhNmE5ZTg0YiIsImFjciI6IjEiLCJhbGxvd2VkLW9yaWdpbnMiOlsiLyoiLCJodHRwOi8vbG9jYWxob3N0OjQyMDAiXSwicmVhbG1fYWNjZXNzIjp7InJvbGVzIjpbImNyZWF0ZS1yZWFsbSIsImRlZmF1bHQtcm9sZXMtbWFzdGVyIiwib2ZmbGluZV9hY2Nlc3MiLCJhZG1pbiIsInVtYV9hdXRob3JpemF0aW9uIl19LCJyZXNvdXJjZV9hY2Nlc3MiOnsiZGFjcy1yZWFsbSI6eyJyb2xlcyI6WyJ2aWV3LXJlYWxtIiwidmlldy1pZGVudGl0eS1wcm92aWRlcnMiLCJtYW5hZ2UtaWRlbnRpdHktcHJvdmlkZXJzIiwiaW1wZXJzb25hdGlvbiIsImNyZWF0ZS1jbGllbnQiLCJtYW5hZ2UtdXNlcnMiLCJxdWVyeS1yZWFsbXMiLCJ2aWV3LWF1dGhvcml6YXRpb24iLCJxdWVyeS1jbGllbnRzIiwicXVlcnktdXNlcnMiLCJtYW5hZ2UtZXZlbnRzIiwibWFuYWdlLXJlYWxtIiwidmlldy1ldmVudHMiLCJ2aWV3LXVzZXJzIiwidmlldy1jbGllbnRzIiwibWFuYWdlLWF1dGhvcml6YXRpb24iLCJtYW5hZ2UtY2xpZW50cyIsInF1ZXJ5LWdyb3VwcyJdfSwibWFzdGVyLXJlYWxtIjp7InJvbGVzIjpbInZpZXctaWRlbnRpdHktcHJvdmlkZXJzIiwidmlldy1yZWFsbSIsIm1hbmFnZS1pZGVudGl0eS1wcm92aWRlcnMiLCJpbXBlcnNvbmF0aW9uIiwiY3JlYXRlLWNsaWVudCIsIm1hbmFnZS11c2VycyIsInF1ZXJ5LXJlYWxtcyIsInZpZXctYXV0aG9yaXphdGlvbiIsInF1ZXJ5LWNsaWVudHMiLCJxdWVyeS11c2VycyIsIm1hbmFnZS1ldmVudHMiLCJtYW5hZ2UtcmVhbG0iLCJ2aWV3LWV2ZW50cyIsInZpZXctdXNlcnMiLCJ2aWV3LWNsaWVudHMiLCJtYW5hZ2UtYXV0aG9yaXphdGlvbiIsIm1hbmFnZS1jbGllbnRzIiwicXVlcnktZ3JvdXBzIl19LCJhY2NvdW50Ijp7InJvbGVzIjpbIm1hbmFnZS1hY2NvdW50IiwibWFuYWdlLWFjY291bnQtbGlua3MiLCJ2aWV3LXByb2ZpbGUiXX19LCJzY29wZSI6ImVtYWlsIHByb2ZpbGUiLCJzaWQiOiIwNzM3ZTI0Ny05ZjZiLTQ4ZWItODhkMi01YWNmYTZhOWU4NGIiLCJlbWFpbF92ZXJpZmllZCI6ZmFsc2UsInByZWZlcnJlZF91c2VybmFtZSI6ImFkbWluIn0.GV1HHZJ_c2me-18IfL3JmTQpm8DwLDhiEDxDMAD7cwLsY4AXqgXqpkq1SBbH6W_C7r4vYqBVNnPp04Bo0mtXK2ISdzrfn4FQVfmQRVWr2mQ2um0uIrySLmz4wzR4g51ozPHIeAgVpQqfxl4LweeyUn0iTGVR5pkqPNpJuFNqpp9B4xPvtOo445YD04ONl6FvE78wI627b6Gnbx7abWLadKPnVz_0JYtK8gyPo4SDYQ8ZzjZWXFn_Md_e17qfVYCPiro-sx9R22C24G0xQjjGhD3vBwcMp7NB67bg99WUVVnY12sRfGpc0WccRdyAmbd7-Pe_XwBFIFm03Zco6Bo92Q'; // Token manual para pruebas

  constructor(private http: HttpClient) {}

  // Método para obtener datos desde el BFF
  getDatos(): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.token}`);
    console.log('Realizando solicitud a:', this.apiUrl);
    console.log('Encabezados de la solicitud:', headers);

    return this.http.get<any>(this.apiUrl, { headers });
  }
}
