import { TestBed } from '@angular/core/testing';

import { RecipeInformationService } from './recipe-information.service';

describe('RecipeInformationService', () => {
  let service: RecipeInformationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RecipeInformationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
