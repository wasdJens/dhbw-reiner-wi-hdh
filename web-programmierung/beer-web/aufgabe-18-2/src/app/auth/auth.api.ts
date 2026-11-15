import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, map } from 'rxjs';
import { components } from '../api/schema';
import { API_URL } from '../api-url';
import { toUser } from './user.mapper';
import { Credentials, User } from './user';

// Typen der Server-DTOs aus der OpenAPI-Beschreibung (npm run api:types)
type LoginDto = components['schemas']['LoginDto'];
type RegisterDto = components['schemas']['RegisterDto'];
type AccessTokenDto = components['schemas']['AccessTokenDto_Output'];
type UserDto = components['schemas']['UserDto_Output'];
export type UserWithRolesDto = components['schemas']['UserWithRolesDto_Output'];

@Injectable({ providedIn: 'root' })
export class AuthApi {
  private readonly http = inject(HttpClient);

  login(credentials: Credentials): Observable<string> {
    const body: LoginDto = { name: credentials.name, password: credentials.password };
    return this.http
      .post<AccessTokenDto>(`${API_URL}/auth/login`, body)
      .pipe(map((dto) => dto.accessToken));
  }

  // Die Antwort enthält kein Token; danach meldet AuthService an
  register(credentials: Credentials): Observable<void> {
    const body: RegisterDto = { name: credentials.name, password: credentials.password };
    return this.http.post<UserDto>(`${API_URL}/auth/register`, body).pipe(map(() => undefined));
  }

  me(): Observable<User> {
    return this.http.get<UserWithRolesDto>(`${API_URL}/users/me`).pipe(map(toUser));
  }
}
