import { Component, OnInit, inject } from '@angular/core';
import { SearchRecipesService, Recipes } from 'src/app/services/search-recipes.service';
import { UserService } from 'src/app/services/user.service';
import { UsersdbService } from 'src/app/services/usersdb.service';

import { Router } from '@angular/router';

@Component({
  selector: 'app-search-recipes',
  templateUrl: './search-recipes.component.html',
  styleUrls: ['./search-recipes.component.scss'],
})
export class SearchRecipesComponent  implements OnInit {
  user: string = '';
  userId: number | null = null;
  constructor(private router: Router,
    private UserService: UserService, 
    private UserDBservice: UsersdbService,
  ) {}

  recipes: Recipes[] = [];
  searchQuery: string = '';
  recipesService= inject(SearchRecipesService);

  async ngOnInit() {
    this.loadUserData();
    this.searchRecipes('pasta');
    await this.searchID();
  }
  async searchRecipes(query: string) {
    const response = await this.recipesService.getAll(query);
    this.recipes = response.results;
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
  goToDetailPage(recipeId: number) {
    this.router.navigate(['/detail-recipe'], { queryParams: { id: recipeId } });
  }
  goToSimilarRecipePage(recipeId: number, titulo: string) {
    this.router.navigate(['/recipe-categories'], { queryParams: { id: recipeId, titulo: titulo } });
  }
  addToFavorites(recipe: any) {
    console.log(recipe.id)
    const favorito = {
      receta_id: recipe.id,
      imagen_url: recipe.image,
      descripcion: recipe.title,
      user: this.userId
    };
    this.UserDBservice.addFavorito(favorito).then(response => {
      console.log('Receta añadida a favoritos:', response);
    }).catch(error => {
      console.error('Error al añadir a favoritos:', error);
    });
  }


  async searchID() {
    try {
      const response: any[] = await this.UserDBservice.getUser(this.user); 
      if (response && response.length > 0) {
        this.userId = response[0].id;
      }
    } catch (error) {
      console.error('Error fetching user ID:', error);
    }
  }

}
