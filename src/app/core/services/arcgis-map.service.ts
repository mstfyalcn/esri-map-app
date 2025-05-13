 

import { Injectable } from '@angular/core';
import FeatureLayer from '@arcgis/core/layers/FeatureLayer';
import Graphic from '@arcgis/core/Graphic';

@Injectable({
  providedIn: 'root',
})
export class ArcgisMapService {
  private featureLayer!: FeatureLayer;

  constructor() {
    //harita üzerinde ağaç verilerinni alan katmanımızı doldurduk fieldInfos a mapledik
    //URL'deki verileri haritaya bağladık (harita yüklendiğinde)
    this.featureLayer = new FeatureLayer({
      url: 'https://services.arcgis.com/V6ZHFr6zdgNZuVG0/arcgis/rest/services/Landscape_Trees/FeatureServer/0',
      outFields: ['*'],
      popupTemplate: {
        title: '{TREEID}',
        content: [
          {
            type: 'fields',
            fieldInfos: [
              { fieldName: 'Cmn_Name', label: 'Ağaç Adı' },
              { fieldName: 'Sci_Name', label: 'Bilimsel Adı' },
              { fieldName: 'Condition', label: 'Durumu' },
              { fieldName: 'DBH1', label: 'Çapı' },
            ],
          },
        ],
      },
    });
  }
//best practis için kodu parçalayarak optimize ettik
  getLayer(): FeatureLayer {
    return this.featureLayer;
  }

  //Graphic tipinde tüm özelliklerimizi çektik
  //katman için query oluşturduk
  async queryAllFeatures(): Promise<Graphic[]> {
    const query = this.featureLayer.createQuery();
    query.where = '1=1';
    query.outFields = ['*'];
    query.returnGeometry = true;

    const result = await this.featureLayer.queryFeatures(query);
    return result.features;
  }
}
