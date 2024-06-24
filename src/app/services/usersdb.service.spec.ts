import { TestBed } from '@angular/core/testing';

import { UsersdbService } from './usersdb.service';

describe('UsersdbService', () => {
  let service: UsersdbService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UsersdbService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
