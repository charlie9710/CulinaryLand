import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class UserService {


  private readonly USER_KEY = 'currentUser';
  private readonly SEARCH_KEY = 'currentSearch';

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

  setSearchData( instructions: string, image: string, title: string, ingredients: any[]): void {
    const searchData = {  instructions, image, title, ingredients };
    localStorage.setItem(this.SEARCH_KEY, JSON.stringify(searchData));
  }

  getSearchData(): { instructions: string, image: string, title: string, ingredients: any[] } | null {
    const searchData = localStorage.getItem(this.SEARCH_KEY);
    return searchData ? JSON.parse(searchData) : null;
  }

  clearSearchData(): void {
    localStorage.removeItem(this.SEARCH_KEY);
  }

}
