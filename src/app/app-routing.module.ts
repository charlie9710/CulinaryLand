import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home/home.component';
import { RegisterComponent } from './register/register/register.component';
import { MainComponent } from './main/main/main.component';
import { DetailRecipeComponent } from './detailRecipe/detail-recipe/detail-recipe.component';
import { RecipeCategoriesComponent } from './RecipeCategories/recipe-categories/recipe-categories.component';
import { RecipeInformationService } from './services/recipe-information.service';
import { SearchRecipesComponent } from './searchRecipes/search-recipes/search-recipes.component';
import { SettingsComponent } from './settings/settings/settings.component';
import { AuthGuardService } from './services/auth-guard.service';
import { FavoritesComponent } from './favorites/favorites/favorites.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'main',
    component: MainComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'detail-recipe',
    component: DetailRecipeComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'recipes-info',
    component: RecipeInformationService, canActivate: [AuthGuardService]
  },
  {
    path: 'recipe-categories',
    component: RecipeCategoriesComponent, canActivate: [AuthGuardService]
  },
  {
    path: 'search-recipe',
    component: SearchRecipesComponent, canActivate: [AuthGuardService]
  },
  {
    path: 'favorites',
    component: FavoritesComponent, canActivate: [AuthGuardService]
  },
  {
    path: 'settings',
    component: SettingsComponent, canActivate: [AuthGuardService]
  },
  { path: '**', redirectTo: 'main'},
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
