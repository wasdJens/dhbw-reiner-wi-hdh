import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { map } from 'rxjs';
import { AuthService } from '../auth/auth.service';

// Komfort: Admin-Seiten nur für Admins; entscheiden tut der Server mit 403
export const adminGuard: CanActivateFn = () => {
  const router = inject(Router);
  return inject(AuthService)
    .loadUser()
    .pipe(map((user) => (user?.isAdmin ? true : router.parseUrl('/beers'))));
};
