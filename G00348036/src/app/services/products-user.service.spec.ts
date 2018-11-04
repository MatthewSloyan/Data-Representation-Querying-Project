import { TestBed } from '@angular/core/testing';

import { ProductsUserService } from './products-user.service';

describe('ProductsUserService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ProductsUserService = TestBed.get(ProductsUserService);
    expect(service).toBeTruthy();
  });
});
