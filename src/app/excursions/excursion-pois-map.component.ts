import { ChangeDetectorRef, Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormGroup } from '@angular/forms';
import Color from 'color';
import { FeatureGroup as LeafletFeatureGroup, geoJSON as leafletGeoJsonLayer, Layer as LeafletLayer, Map as LeafletMap, tileLayer as leafletTileLayer } from 'leaflet';
import each from 'lodash/each';
import find from 'lodash/find';
import includes from 'lodash/includes';
import reduce from 'lodash/reduce';
import { Observable } from 'rxjs/Rx';

import { LatLngBounds, Poi, Theme, Trail, Zone } from '../models';
import { PoisService, RetrievePoiParams } from '../pois';
import { GeoJsonFeature, GeoJsonFeatureCollection, toFeatureCollection } from '../utils/geojson';

const POI_FILL_OPACITY = 0.5;
const POI_STROKE_OPACITY = 1;

@Component({
  selector: 'bio-excursion-pois-map',
  templateUrl: './excursion-pois-map.component.html',
  styleUrls: ['./excursion-pois-map.component.styl']
})
export class ExcursionPoisMapComponent implements OnChanges, OnInit {
  map: LeafletMap;
  mapData: any;
  poiMapViews: PoisMapView[];

  @Input()
  trail: Trail;

  @Input()
  themes: Theme[];

  @Input()
  zones: Zone[];

  constructor(private cdr: ChangeDetectorRef, private poisService: PoisService) {
    this.poiMapViews = [];
  }

  ngOnInit() {
    this.initMap();
  }

  ngDoCheck() {
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.themes) {
      this.toggleLoadedThemes();
      this.loadMissingPois();
    }
  }

  onMapReady(map: LeafletMap) {
    this.map = map;
    this.cdr.detectChanges();
  }

  private toggleLoadedThemes() {
    const activeThemeNames = this.themes.map(theme => theme.name);
    this.poiMapViews.forEach(mapView => mapView.setVisible(includes(activeThemeNames, mapView.theme.name)));
  }

  private loadMissingPois() {

    const missing: PoisMapView[] = [];
    each(this.themes, theme => {
      const existing = this.getPoisMapView(theme);
      if (!existing) {
        missing.push(new PoisMapView(theme));
      }
    });

    if (!missing.length) {
      return;
    }

    this.poisService.retrieveAll(this.trail, {
      themes: missing.map(mapView => mapView.theme.name),
      zones: this.zones.map(zone => zone.href)
    }).subscribe(pois => {
      each(missing, mapView => {
        mapView.pois = pois.filter(poi => poi.theme === mapView.theme.name);
      });

      this.addPoiMapViews(missing);
    });
  }

  private addPoiMapViews(poiMapViews: PoisMapView[]) {
    poiMapViews.forEach(mapView => {

      mapView.layer = leafletGeoJsonLayer(toFeatureCollection<Poi>(mapView.pois), {
        pointToLayer: (feature: GeoJsonFeature, latLng) => {
          return L.circleMarker(latLng);
        },
        style: (feature: GeoJsonFeature) => {
          return this.getPoiLayerStyle(feature);
        }
      });

      mapView.layer.addTo(this.map);
      this.poiMapViews.push(mapView);
    });
  }

  private initMap() {

    this.mapData = {};

    this.mapData.bounds = LatLngBounds.fromBounds(this.zones.map(zone => zone.bounds)).toLeaflet();

    this.mapData.boundsOptions = {
      padding: [ 20, 20 ]
    };

    const zonesLayer = leafletGeoJsonLayer(toFeatureCollection<Zone>(this.zones), {
      style: (feature: GeoJsonFeature) => this.getZoneLayerStyle(feature)
    });

    const mapLayers = [
      leafletTileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'),
      zonesLayer
    ];

    this.mapData.options = {
      scrollWheelZoom: false,
      layers: mapLayers
    };
  }

  private setThemeVisible(theme: Theme, visible: boolean) {
    this.getPoisMapView(theme).layer.setStyle({
      opacity: visible ? POI_STROKE_OPACITY : 0,
      fillOpacity: visible ? POI_FILL_OPACITY : 0
    });
  }

  private getPoisMapView(theme: Theme) {
    return find(this.poiMapViews, { theme: theme });
  }

  private getPoiLayerStyle(poi: GeoJsonFeature): any {

    const theme = poi.properties.theme;
    const color = Theme.color(theme);
    const visible = true/*this.isThemeSelected(theme)*/;

    return {
      radius: 5,
      stroke: true,
      color: new Color(color).darken(0.5).hex(),
      opacity: visible ? POI_STROKE_OPACITY : 0,
      fill: true,
      fillColor: color,
      fillOpacity: visible ? POI_FILL_OPACITY : 0
    };
  }

  private getZoneLayerStyle(zone: GeoJsonFeature): any {
    return {
      stroke: true,
      color: '#000000',
      opacity: 1,
      fill: true,
      fillColor: '#000000',
      fillOpacity: 0.5
    };
  }

}

class PoisMapView {
  layer: LeafletFeatureGroup;
  pois: Poi[];
  theme: Theme;

  constructor(theme: Theme) {
    this.theme = theme;
  }

  setVisible(visible: boolean) {
    this.layer.setStyle({
      opacity: visible ? POI_STROKE_OPACITY : 0,
      fillOpacity: visible ? POI_FILL_OPACITY : 0
    });
  }
}
