import { TestBed } from '@angular/core/testing';

import { SqlParsingService } from './sql-parsing.service';

describe('SqlParsingService', () => {
  let service: SqlParsingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SqlParsingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
