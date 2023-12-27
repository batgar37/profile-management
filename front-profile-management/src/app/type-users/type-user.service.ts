import { HttpClient } from '@angular/common/http';
import { Injectable, Type } from '@angular/core';
import { TypeUser } from './type-user';
import { Observable, retry } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TypeUserService {
  readonly typeUsersUrl = 'http://localhost:8080/api/type-users';

  constructor(private http: HttpClient) {}

  getAllTypeUser(): Observable<TypeUser[]> {
    return this.http.get<TypeUser[]>(this.typeUsersUrl);
  }

  getTypeUserById(id: number): Observable<TypeUser> {
    return this.http.get<TypeUser>(`${this.typeUsersUrl}/${id}`);
  }

  createTypeUser(typeUser: TypeUser): Observable<TypeUser> {
    return this.http.post<TypeUser>(`${this.typeUsersUrl}/create`, typeUser);
  }

  updateTypeUser(typeUser: TypeUser): Observable<TypeUser> {
    return this.http.put<TypeUser>(`${this.typeUsersUrl}/update`, typeUser);
  }

  delete(id: number) {
    return this.http.delete(`${this.typeUsersUrl}/${id}`);
  }
}
