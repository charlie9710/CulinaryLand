import { Component, OnInit,inject } from '@angular/core';
import { SearchRecipesService,Recipes } from 'src/app/services/search-recipes.service';
import { SimilarRecipesService,RecipesSimilar } from 'src/app/services/similar-recipes.service';
import { ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-recipe-categories',
  templateUrl: './recipe-categories.component.html',
  styleUrls: ['./recipe-categories.component.scss'],
})
export class RecipeCategoriesComponent  implements OnInit {
  user: string = '';
  recipeId: number = 918033;
  recipeTitle: string = 'Chicken Spring Rolls';
  SimilarService= inject(SimilarRecipesService);
  similarRecipes: RecipesSimilar[] = []; 

  recipesService= inject(SearchRecipesService);
  searchQuery: string = '';
  recipes: Recipes[] = [];


  constructor(private route: ActivatedRoute,private UserService: UserService) { }

  async searchRecipes(query: string) {
    const response = await this.recipesService.getAll(query);
    this.recipes = response.results;
  }

  ngOnInit() {
    this.loadUserData();
    this.route.queryParams.subscribe(params => {
      this.recipeId = params['id']; 
      this.recipeTitle = params['titulo']
      this.searchRecipes(this.recipeTitle);
      if (this.recipeId) {
        this.searchInformation(this.recipeId);
      }else{
        this.searchInformation(918033);
        this.recipeTitle ='Chicken Spring Rolls';
      }
    });  
  }
  async searchInformation(query: number) {
    const response = await this.SimilarService.getAll(query);
    if (response.length > 0) {
      this.similarRecipes = response; 
    } else {
      this.similarRecipes = []; 
    }
  }
  loadUserData() {
    this.user = this.UserService.getUser()?.user ?? '';
  }
  onSearch() {
    this.searchRecipes(this.searchQuery);
  }
  trackRecipeById(index: number, recipe: Recipes): number {
    return recipe.id; 
  }
  searchRecipesEqual(recipeId: number,title: string) {
    console.log(recipeId)
    this.searchInformation(recipeId);
    this.recipeTitle = title;
  }

}
