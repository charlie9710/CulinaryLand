import { TestBed } from '@angular/core/testing';
import { HttpClient, HttpHandler } from '@angular/common/http';

import { SearchRecipesService } from './search-recipes.service';

describe('SearchRecipesService', () => {
  let service: SearchRecipesService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers:[HttpClient,HttpHandler],
    });
    service = TestBed.inject(SearchRecipesService);
    
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
