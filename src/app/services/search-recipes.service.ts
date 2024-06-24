import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';

export interface Recipes{
  id: number;
  title: string;
  image: string;
  imageType: string;
}
type ApiResponse = {
  results: Recipes[],offset: number, number: number, totalResults: number
}

@Injectable({
  providedIn: 'root'
})
export class SearchRecipesService {

  httpClient = inject(HttpClient);
  
  getAll(query: string): Promise<ApiResponse> {
    const url = `https://api.spoonacular.com/recipes/complexSearch?apiKey=ed04454ec83a49b29415561c18566c3f&query=${query}`;
    return firstValueFrom(
      this.httpClient.get<ApiResponse>(url)
    );
  }
}
