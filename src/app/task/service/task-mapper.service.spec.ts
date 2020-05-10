import { TestBed } from '@angular/core/testing';

import { TaskMapperService } from './task-mapper.service';

describe('TaskMapperService', () => {
  let service: TaskMapperService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TaskMapperService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
