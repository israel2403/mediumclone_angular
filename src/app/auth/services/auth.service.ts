import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { map, Observable } from 'rxjs'
import { environment } from '../../../environments/environment.development'
import { CurrentUserInterface } from '../../shared/types/current-user.interface'
import { AuthResponseInterface } from '../types/auth-response.interface'
import { LoginRequestInterface } from '../types/login-request.interface'
import { RegisterRequestInterface } from '../types/register-request.interface'

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  getUser(response: AuthResponseInterface): CurrentUserInterface {
    return response.user
  }

  getCurrentUser(): Observable<CurrentUserInterface> {
    const url = environment.baseUrl + '/users'
    return this.http
      .get<AuthResponseInterface>(url)
      .pipe(map(this.getUser))
  }

  register(data: RegisterRequestInterface): Observable<CurrentUserInterface> {
    const url = environment.baseUrl + '/users'
    return this.http
      .post<AuthResponseInterface>(url, data)
      .pipe(map(this.getUser))
  }

  login(data: LoginRequestInterface): Observable<CurrentUserInterface> {
    const url = environment.baseUrl + '/users/login'
    return this.http
      .post<AuthResponseInterface>(url, data)
      .pipe(map(this.getUser))
  }
}
