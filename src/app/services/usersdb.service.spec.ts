import { TestBed } from '@angular/core/testing';

import { UsersdbService } from './usersdb.service';
import { HttpClient, HttpHandler } from '@angular/common/http';

describe('UsersdbService', () => {
  let service: UsersdbService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers:[HttpClient,HttpHandler],
    });
    service = TestBed.inject(UsersdbService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
