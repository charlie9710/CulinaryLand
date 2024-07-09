import { TestBed } from '@angular/core/testing';

import { SimilarRecipesService } from './similar-recipes.service';
import { HttpClient, HttpHandler } from '@angular/common/http';

describe('SimilarRecipesService', () => {
  let service: SimilarRecipesService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers:[HttpClient,HttpHandler],
    });
    service = TestBed.inject(SimilarRecipesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
