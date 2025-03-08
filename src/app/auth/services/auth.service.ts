import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { map, Observable } from 'rxjs'
import { CurrentUserInterface } from '../../shared/types/current-user.interface'
import { AuthResponseInterface } from '../types/auth-response.interface'
import { RegisterRequestInterface } from '../types/register-request.interface'

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  register(data: RegisterRequestInterface): Observable<CurrentUserInterface> {
    const url = 'http://localhost:3000/api/articles'
    return this.http
      .post<AuthResponseInterface>(url, data)
      .pipe(map((response: AuthResponseInterface) => response.user))
  }
}
