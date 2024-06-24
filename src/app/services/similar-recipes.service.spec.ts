import { TestBed } from '@angular/core/testing';

import { SimilarRecipesService } from './similar-recipes.service';

describe('SimilarRecipesService', () => {
  let service: SimilarRecipesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SimilarRecipesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
