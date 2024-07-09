import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { firstValueFrom } from 'rxjs';

export interface Ingredientes{
  name : string;
  id: number;
}
export interface ApiResponse {
  extendedIngredients: Ingredientes[];
  instructions: string;
  image: string;
  title: string;
}

@Injectable({
  providedIn: 'root'
})
export class RecipeInformationService {

  constructor(private httpClient: HttpClient) { }
  getAll(query: number): Promise<ApiResponse> {
    const url = `https://api.spoonacular.com/recipes/${query}/information?apiKey=ed04454ec83a49b29415561c18566c3f`;
    return firstValueFrom(
      this.httpClient.get<ApiResponse>(url)
    );
  }
}