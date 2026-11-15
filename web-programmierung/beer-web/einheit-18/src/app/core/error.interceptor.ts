import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import { API_URL } from '../api-url';
import { AuthService } from '../auth/auth.service';
import { MessageService } from './message.service';

// Generische Fehler an einer Stelle; 400, 409 und den Login behandelt die Seite selbst
export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const auth = inject(AuthService);
  const messages = inject(MessageService);
  const router = inject(Router);
  const isLogin = req.method === 'POST' && req.url === `${API_URL}/auth/login`;

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      // Die englische Meldung des Servers bleibt für Entwickler in der Console
      console.error(`${req.method} ${req.urlWithParams} → ${error.status}`, error.error?.message);
      if (error.status === 0) {
        messages.error('Server nicht erreichbar.');
      } else if (error.status === 401 && !isLogin) {
        // Token fehlt oder ist abgelaufen: abmelden und zur Anmeldung
        auth.logout();
        void router.navigateByUrl('/login').then(() => messages.error('Bitte melde dich an.'));
      } else if (error.status === 403) {
        messages.error('Keine Berechtigung.');
      } else if (error.status === 404) {
        messages.error('Nicht gefunden.');
      } else if (error.status >= 500) {
        messages.error('Etwas ist schiefgelaufen.');
      }
      // Die Seite bekommt den Fehler trotzdem, etwa für 400 und 409
      return throwError(() => error);
    }),
  );
};
