import { Component, OnInit } from '@angular/core';
import Map from '@arcgis/core/Map';
import MapView from '@arcgis/core/views/MapView';
import FeatureLayer from '@arcgis/core/layers/FeatureLayer';
import { TableModule } from 'primeng/table'; 
import { ArcgisMapService } from 'app/core/services/arcgis-map.service';

@Component({
  selector: 'app-map',
  standalone: true,
  imports: [TableModule],
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css'],
})
export class MapComponent implements OnInit {

  selectedFeatureId: number | null = null;
  tableData: any[] = [];
  tableFeatures: __esri.Graphic[] = [];

  private view!: MapView;
  private layer!: FeatureLayer;

  constructor(private mapService: ArcgisMapService) {}

  ngOnInit(): void {
    //uydu görünümü
    const map = new Map({ basemap: 'satellite' });
    //servisde oluşturduğumuz layerı çağırdık
    this.layer = this.mapService.getLayer();
    map.add(this.layer);
    //ArcGIS JavaScript API kullanılarak bir MapView oluşturduk
    //viewDiv ile htmlde gösteriyoruz
    this.view = new MapView({
      container: 'viewDiv',
      map,
      center: [-122.4443, 47.2529],
      zoom: 12,
    });
   //view ve layer yüklendiğinde verilerimizin, değerlerimizin alanına odaklandık,zoomladık
    this.view.when(() => {
      this.layer.when(() => {
        if (this.layer.fullExtent) {
          this.view.goTo(this.layer.fullExtent);
        }
      });

      // Verileri çekiyoruz
      this.mapService.queryAllFeatures().then((features) => {
        this.tableFeatures = features;
        this.tableData = features.map((f) => f.attributes);
      });
    });

    //click eventimiz sonrası veri durumuna göre popup açılır veri gösterilir
    //tıklanan objen tanımlı layer katmanına ait olup olmadığı kontrol edilir, tree_ıd kaydedilir yoksa popup kapanır
    this.view.on('click', (event) => {
      this.view.hitTest(event).then((response) => {
        const graphicHit = (response.results as any[]).find(
          (r) => r.graphic && r.graphic.layer === this.layer
        ) as any;
        if (graphicHit) {
          const graphic = graphicHit.graphic;
          this.selectedFeatureId = graphic.attributes.Tree_ID;
          this.view.popup?.open({
            features: [graphic],
            location: event.mapPoint,
          });
        } else {
          this.selectedFeatureId = null;
          this.view.popup?.close();
        }
      });
    });
  }
//tabloda satıra tıkladığında tetiklenen eventtir
//haritada ilgili noktaya odaklanır ve popup açılıp istediğimiz bilgileri gösterilir
  onRowSelect(row: any) {
    const attrs = row;
    const feature = this.tableFeatures.find(f => f.attributes.Tree_ID === attrs.Tree_ID);
    if (!feature) return;
//objenin konumuna gideriz, popup açarız
    this.view!.goTo({ target: feature.geometry!, zoom: 15 }).then(() => {
      this.view!.popup!.open({
        features: [feature],
        location: feature.geometry as __esri.Point,
      });
    });
  }
}
