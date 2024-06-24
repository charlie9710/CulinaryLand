import { Component, OnInit, inject } from '@angular/core';
import { SearchRecipesService, Recipes } from 'src/app/services/search-recipes.service';
import { RecipeInformationService, Ingredientes } from 'src/app/services/recipe-information.service';
import { UserService } from 'src/app/services/user.service';

import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-detail-recipe',
  templateUrl: './detail-recipe.component.html',
  styleUrls: ['./detail-recipe.component.scss'],
})
export class DetailRecipeComponent  implements OnInit {

  user: string = '';

  recipeId: number = 918033;
  recipesService= inject(RecipeInformationService);
  searchQuery: string = '';
  searchImage: string = '';
  searchTitle: string = '';
  ingredientes: Ingredientes[] = [];
  wordsToExclude: string[] = ['<ol>', '</ol>', '<li>', '</li>',  '<p>',  '</p>'];

  recipesServiceSearch= inject(SearchRecipesService);
  searchQueryNew: string = '';
  recipes: Recipes[] = [];

  constructor(private route: ActivatedRoute,private UserService: UserService) { }

  async ngOnInit() {
    this.loadUserData();
    this.route.queryParams.subscribe(params => {
      this.recipeId = params['id']; 
      if (this.recipeId) {
        this.searchInformation(this.recipeId);
      }else{
        this.searchInformation(918033);
      }
    });  
  }
  async searchRecipes(query: string) {
    const response = await this.recipesServiceSearch.getAll(query);
    this.recipes = response.results;
  }
  loadUserData() {
    this.user = this.UserService.getUser()?.user ?? '';
  }
  async searchInformation(query: number) {
    const response = await this.recipesService.getAll(query);
    this.searchQuery = response.instructions;
    this.searchImage = response.image;
    this.searchTitle = response.title;
    this.ingredientes = response.extendedIngredients;
  }
  trackIngredientById(index: number, ingrediente: Ingredientes): number {
    return ingrediente.id ; 
  }
  excludeWords(text: string): string {
    if (!text) return '';

    let regex = new RegExp(this.wordsToExclude.join('|'), 'gi');
    return text.replace(regex, '').replace(/\s\s+/g, ' ').trim();
  }
  onSearch() {
    this.searchRecipes(this.searchQueryNew);
  }
  trackRecipeById(index: number, recipe: Recipes): number {
    return recipe.id; 
  }
  searchRecipesEqual(recipeId: number,title: string) {
    this.searchInformation(recipeId);
    this.searchTitle = title;
  }

}
