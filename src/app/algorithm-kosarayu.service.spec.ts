import { TestBed } from '@angular/core/testing';

import { AlgorithmKosarayuService } from './algorithm-kosarayu.service';

describe('AlgorithmKosarayuService', () => {
  let service: AlgorithmKosarayuService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AlgorithmKosarayuService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
