import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from 'app/core/services/auth.service';  // Usar el AuthService para obtener el token
import { switchMap } from 'rxjs/operators';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log('Interceptando solicitud HTTP...');

    // Obtener el token utilizando el AuthService
    return this.authService.getToken().pipe(
      switchMap(token => {
        if (token) {
          // Si hay un token, lo agregamos al encabezado
          console.log('Token obtenido desde AuthService:', token);

          const cloned = req.clone({
            setHeaders: {
              Authorization: `Bearer ${token}`,
            },
          });

          console.log('Solicitud clonada con el encabezado Authorization:', cloned.headers.get('Authorization'));
          return next.handle(cloned);
        } else {
          // Si no hay token, pasamos la solicitud sin modificarla
          console.warn('No se encontró un token, enviando solicitud sin encabezado Authorization.');
          return next.handle(req);
        }
      })
    );
  }
}
