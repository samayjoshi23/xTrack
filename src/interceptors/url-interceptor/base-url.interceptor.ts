import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { AuthService } from 'src/Services/AuthService/auth.service';

@Injectable()
export class BaseUrlInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let apiRequest = request.clone({ url: `${environment.apiBaseUrl}/${request.url}` });

    const authToken = this.authService.getAuthToken();
    if (authToken) {
      const authHeader = `Bearer ${authToken}`;
      apiRequest = apiRequest.clone({ setHeaders: { Authorization: authHeader } });
    }

    return next.handle(apiRequest);
  }
}