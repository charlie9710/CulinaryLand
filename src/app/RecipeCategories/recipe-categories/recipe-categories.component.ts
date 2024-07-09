import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { SearchRecipesService, Recipes } from 'src/app/services/search-recipes.service';
import { SimilarRecipesService, RecipesSimilar } from 'src/app/services/similar-recipes.service';

@Component({
  selector: 'app-recipe-categories',
  templateUrl: './recipe-categories.component.html',
  styleUrls: ['./recipe-categories.component.scss'],
})
export class RecipeCategoriesComponent implements OnInit {
  user: string = '';
  recipeId: number = 918033;
  recipeTitle: string = 'Chicken Spring Rolls';
  similarRecipes: RecipesSimilar[] = [];
  recipes: Recipes[] = [];
  searchQuery: string = '';

  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private recipesService: SearchRecipesService,
    private similarService: SimilarRecipesService
  ) {}

  async ngOnInit() {
    this.loadUserData();
    this.route.queryParams.subscribe(params => {
      this.recipeId = params['id'] || 918033; 
      this.recipeTitle = params['titulo'] || 'Chicken Spring Rolls'; 
      this.searchRecipes(this.recipeTitle);
      this.searchInformation(this.recipeId);
    });
  }

  async searchRecipes(query: string) {
    const response = await this.recipesService.getAll(query);
    this.recipes = response.results;
  }

  async searchInformation(query: number) {
    const response = await this.similarService.getAll(query);
    this.similarRecipes = response.length > 0 ? response : [];
  }

  loadUserData() {
    const user = this.userService.getUser();
    this.user = user?.user ?? '';
  }

  onSearch() {
    this.searchRecipes(this.searchQuery);
  }

  trackRecipeById(index: number, recipe: Recipes): number {
    return recipe.id;
  }

  searchRecipesEqual(recipeId: number, title: string) {
    this.searchInformation(recipeId);
    this.recipeTitle = title;
  }
}