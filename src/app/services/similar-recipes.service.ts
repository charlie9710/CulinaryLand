import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';

export interface RecipesSimilar{
  id: number;
  title: string;
  sourceUrl: string;
}

type ApiResponse = RecipesSimilar[];

@Injectable({
  providedIn: 'root'
})
export class SimilarRecipesService {

  httpClient = inject(HttpClient);
  
  getAll(query: number): Promise<ApiResponse> {
    const url = `https://api.spoonacular.com/recipes/${query}/similar?apiKey=ed04454ec83a49b29415561c18566c3f`;
    return firstValueFrom(
      this.httpClient.get<ApiResponse>(url)
    );
  }
}
