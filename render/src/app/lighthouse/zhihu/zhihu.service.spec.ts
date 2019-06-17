import { TestBed } from '@angular/core/testing';

import { ZhihuService } from './zhihu.service';

describe('ZhihuService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ZhihuService = TestBed.get(ZhihuService);
    expect(service).toBeTruthy();
  });
});
