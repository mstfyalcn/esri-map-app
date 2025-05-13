import { TestBed } from '@angular/core/testing'; 
import { ArcgisMapService } from './arcgis-map.service';

describe('ArcgisMapService', () => {
  let service: ArcgisMapService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ArcgisMapService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
