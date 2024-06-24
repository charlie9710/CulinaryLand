import { NgModule} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule, DatePipe } from '@angular/common';

import { IonicModule, IonicRouteStrategy,MenuController } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { HomeComponent } from './home/home/home.component';
import { RegisterComponent } from './register/register/register.component';
import { MainComponent } from './main/main/main.component';
import { DetailRecipeComponent } from './detailRecipe/detail-recipe/detail-recipe.component';
import { SearchRecipesComponent } from './searchRecipes/search-recipes/search-recipes.component';
import { RecipeCategoriesComponent } from './RecipeCategories/recipe-categories/recipe-categories.component';
import { SettingsComponent } from './settings/settings/settings.component';
import { FavoritesComponent } from './favorites/favorites/favorites.component';

import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatNativeDateModule } from '@angular/material/core'; 
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';


@NgModule({
  declarations: [AppComponent,HomeComponent,RegisterComponent,MainComponent,DetailRecipeComponent,SearchRecipesComponent,RecipeCategoriesComponent,SettingsComponent,FavoritesComponent],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule,
    FormsModule, 
    ReactiveFormsModule,
    HttpClientModule,
    MatDatepickerModule,
    MatInputModule,
    MatFormFieldModule,
    MatNativeDateModule,
    CommonModule,
    BrowserAnimationsModule,
  ],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy },DatePipe, provideAnimationsAsync()],
  bootstrap: [AppComponent],
})
export class AppModule {}
