import { ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormGroup } from '@angular/forms';
import Color from 'color';
import { FeatureGroup as LeafletFeatureGroup, geoJSON as leafletGeoJsonLayer, Layer as LeafletLayer, Map as LeafletMap, tileLayer as leafletTileLayer } from 'leaflet';
import each from 'lodash/each';
import find from 'lodash/find';
import includes from 'lodash/includes';
import isEqual from 'lodash/isEqual';
import reduce from 'lodash/reduce';
import { Observable } from 'rxjs/Rx';

import { Excursion, LatLngBounds, Poi, Theme, Zone } from '../models';
import { PoisService, RetrievePoiParams } from '../pois';
import { GeoJsonFeature, GeoJsonFeatureCollection, toFeatureCollection } from '../utils/geojson';
import { BioZonesService } from '../zones';

const POI_FILL_OPACITY = 0.5;
const POI_STROKE_OPACITY = 1;

@Component({
  selector: 'bio-excursion-pois-map',
  templateUrl: './excursion-pois-map.component.html',
  styleUrls: ['./excursion-pois-map.component.styl']
})
export class ExcursionPoisMapComponent implements OnInit {
  map: LeafletMap;
  mapData: any;
  poiMapViews: PoisMapView[];
  initError: Error;

  @Input()
  excursion: Excursion;

  @Output()
  onZonesLoaded: EventEmitter<Zone[]>;

  private currentThemeNames: string[];

  constructor(private cdr: ChangeDetectorRef, private poisService: PoisService, private zonesService: BioZonesService) {
    this.poiMapViews = [];
    this.onZonesLoaded = new EventEmitter<Zone[]>();
  }

  ngOnInit() {
    if (!this.excursion) {
      throw new Error('Excursion input is required');
    } else if (!this.excursion.trail) {
      throw new Error('Excursion input must have an associated trail');
    }

    this.loadZones()
      .do(zones => this.initMap(zones))
      .subscribe(undefined, err => this.initError = err);
  }

  ngDoCheck() {
    const themeNames = this.excursion.themes;
    if (!isEqual(themeNames, this.currentThemeNames)) {
      this.currentThemeNames = themeNames;
      this.toggleLoadedThemes();
      this.loadMissingPois();
    }
  }

  onMapReady(map: LeafletMap) {
    this.map = map;
    this.cdr.detectChanges();
  }

  private toggleLoadedThemes() {
    this.poiMapViews.forEach(mapView => mapView.setVisible(includes(this.currentThemeNames, mapView.themeName)));
  }

  private loadZones(): Observable<Zone[]> {
    return this.zonesService.retrieveAll(this.excursion.trail, {
      hrefs: this.excursion.zoneHrefs
    }).do(zones => this.onZonesLoaded.emit(zones));
  }

  private loadMissingPois() {

    const missing: PoisMapView[] = [];
    each(this.currentThemeNames, themeName => {
      const existing = this.getPoisMapView(themeName);
      if (!existing) {
        missing.push(new PoisMapView(themeName));
      }
    });

    if (!missing.length) {
      return;
    }

    this.poisService.retrieveAll(this.excursion.trail, {
      themes: missing.map(mapView => mapView.themeName),
      zones: this.excursion.zoneHrefs
    }).subscribe(pois => {
      each(missing, mapView => {
        mapView.pois = pois.filter(poi => poi.theme === mapView.themeName);
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

  private initMap(zones: Zone[]) {

    this.mapData = {};

    this.mapData.bounds = LatLngBounds.fromBounds(zones.map(zone => zone.bounds)).toLeaflet();

    this.mapData.boundsOptions = {
      padding: [ 20, 20 ]
    };

    const zonesLayer = leafletGeoJsonLayer(toFeatureCollection<Zone>(zones), {
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

  private setThemeVisible(themeName: string, visible: boolean) {
    this.getPoisMapView(themeName).layer.setStyle({
      opacity: visible ? POI_STROKE_OPACITY : 0,
      fillOpacity: visible ? POI_FILL_OPACITY : 0
    });
  }

  private getPoisMapView(themeName: string) {
    return find(this.poiMapViews, { themeName: themeName });
  }

  private getPoiLayerStyle(poi: GeoJsonFeature): any {

    const themeName = poi.properties.theme;
    const color = Theme.color(themeName);

    return {
      radius: 5,
      stroke: true,
      color: new Color(color).darken(0.5).hex(),
      opacity: POI_STROKE_OPACITY,
      fill: true,
      fillColor: color,
      fillOpacity: POI_FILL_OPACITY
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
  themeName: string;

  constructor(themeName: string) {
    this.themeName = themeName;
  }

  setVisible(visible: boolean) {
    this.layer.setStyle({
      opacity: visible ? POI_STROKE_OPACITY : 0,
      fillOpacity: visible ? POI_FILL_OPACITY : 0
    });
  }
}
