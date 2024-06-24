import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class UserService {


  private readonly USER_KEY = 'currentUser';

  constructor() { }

  setUser(user: string, image: string): void {
    const userData = { user, image };
    localStorage.setItem(this.USER_KEY, JSON.stringify(userData));
  }

  getUser(): { user: string, image: string } | null {
    const userData = localStorage.getItem(this.USER_KEY);
    return userData ? JSON.parse(userData) : null;
  }

  clearUser(): void {
    localStorage.removeItem(this.USER_KEY);
  }

  isLoggedIn(): boolean {
    return this.getUser() !== null;
  }

}
