import { TestBed } from '@angular/core/testing';

import { RecipeInformationService } from './recipe-information.service';
import { HttpClient, HttpHandler } from '@angular/common/http';

describe('RecipeInformationService', () => {
  let service: RecipeInformationService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers:[HttpClient,HttpHandler],
    });
    service = TestBed.inject(RecipeInformationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
