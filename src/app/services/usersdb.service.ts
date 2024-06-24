import { Injectable,inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom,Observable } from 'rxjs';



export interface User {
  user: string;
  password: string;
  name: string;
  last_name: string;
  education_level: string;
  birthdate: string; 
}

export interface ApiResponse {
  results: User[]; 
  offset: number; 
  number: number; 
  totalResults: number; 
}

@Injectable({
  providedIn: 'root'
})
export class UsersdbService {
  

  httpClient = inject(HttpClient);
  
  getUser(query: string): Promise<any[]> { 
    const url = `https://apiculinary.onrender.com/api/users/search_by_username/?username=${query}`;
    return firstValueFrom(
      this.httpClient.get<any[]>(url) 
    );
  }
  createUser(user: User): Promise<User> {
    const url = `https://apiculinary.onrender.com/api/users/create_user/`;
    return firstValueFrom(
      this.httpClient.post<User>(url, user)
    );
  }
  updateUser(username: string, data: any): Observable<any> {
    const url = `https://apiculinary.onrender.com/api/users/update_user/?username=${username}`;
    return this.httpClient.put(url, data);
  }
  getFavoritosByUser(userId: string): Promise<any[]> {
    const url = `https://apiculinary.onrender.com/api/favoritos/user/${userId}/`;
    return firstValueFrom(this.httpClient.get<any[]>(url));
  }
  addFavorito(favorito: any): Promise<any> {
    const url = `https://apiculinary.onrender.com/api/favoritos/add_favorito/`;
    return firstValueFrom(this.httpClient.post<any>(url, favorito));
  }
  deleteFavorito(favoritoId: number): Observable<void> {
    const url = `https://apiculinary.onrender.com/api/favoritos/${favoritoId}/`;
    return this.httpClient.delete<void>(url);
  }
}
