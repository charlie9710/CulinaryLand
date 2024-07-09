import { Component, OnInit } from '@angular/core';
import { SearchRecipesService, Recipes } from 'src/app/services/search-recipes.service';
import { UserService } from 'src/app/services/user.service';
import { UsersdbService } from 'src/app/services/usersdb.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search-recipes',
  templateUrl: './search-recipes.component.html',
  styleUrls: ['./search-recipes.component.scss'],
})
export class SearchRecipesComponent implements OnInit {
  user: string = '';
  userId: number | null = null;
  recipes: Recipes[] = [];
  searchQuery: string = '';

  constructor(
    private router: Router,
    private userService: UserService,
    private userDBService: UsersdbService,
    private recipesService: SearchRecipesService 
  ) {}

  async ngOnInit() {
    this.loadUserData();
    this.searchRecipes('pasta');
    await this.searchID();
  }

  async searchRecipes(query: string) {
    try {
      const response = await this.recipesService.getAll(query);
      this.recipes = response.results;
    } catch (error) {
      console.error('Error fetching recipes:', error);
    }
  }

  loadUserData() {
    this.user = this.userService.getUser()?.user ?? '';
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
    console.log(recipe.id);
    const favorito = {
      receta_id: recipe.id,
      imagen_url: recipe.image,
      descripcion: recipe.title,
      user: this.userId,
    };
    this.userDBService.addFavorito(favorito).then(
      (response) => {
        console.log('Receta añadida a favoritos:', response);
      },
      (error) => {
        console.error('Error al añadir a favoritos:', error);
      }
    );
  }

  async searchID() {
    try {
      const response: any[] = await this.userDBService.getUser(this.user);
      if (response && response.length > 0) {
        this.userId = response[0].id;
      }
    } catch (error) {
      console.error('Error fetching user ID:', error);
    }
  }
}