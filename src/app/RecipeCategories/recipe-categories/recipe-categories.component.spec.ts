import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { RecipeCategoriesComponent } from './recipe-categories.component';
import { ActivatedRoute, convertToParamMap } from '@angular/router';
import { of } from 'rxjs';
import { HttpClientTestingModule } from '@angular/common/http/testing'; 
import { SearchRecipesService } from 'src/app/services/search-recipes.service'; 

describe('RecipeCategoriesComponent', () => {
  let component: RecipeCategoriesComponent;
  let fixture: ComponentFixture<RecipeCategoriesComponent>;

  const mockActivatedRoute = {
    snapshot: {
      paramMap: convertToParamMap({ id: '1' })
    },
    queryParams: of({ id: '1', titulo: 'Chicken Spring Rolls' })
  };

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ RecipeCategoriesComponent ],
      imports: [
        IonicModule.forRoot(),
        HttpClientTestingModule 
      ],
      providers: [
        { provide: ActivatedRoute, useValue: mockActivatedRoute }
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(RecipeCategoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should search recipes on user input', () => {
    const searchQuery = 'Pasta Carbonara'; 
    component.searchQuery = searchQuery;
  
    spyOn(component, 'searchRecipes'); 
  
    component.onSearch(); 
  
    expect(component.searchRecipes).toHaveBeenCalledWith(searchQuery); 
  });
});