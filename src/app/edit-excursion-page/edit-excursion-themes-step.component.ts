import Color from 'color';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FeatureGroup as LeafletFeatureGroup, geoJSON as leafletGeoJsonLayer, Layer as LeafletLayer, Map as LeafletMap, tileLayer as leafletTileLayer } from 'leaflet';
import each from 'lodash/each';
import find from 'lodash/find';
import includes from 'lodash/includes';
import reduce from 'lodash/reduce';
import { Observable } from 'rxjs/Rx';

import { EditExcursionService } from './edit-excursion.service';
import { Excursion, LatLngBounds, Poi, Theme, Trail, Zone } from '../models';
import { PoisService, RetrievePoiParams } from '../pois/pois.service';
import { BioThemesService } from '../themes/themes.service';
import { GeoJsonFeature, GeoJsonFeatureCollection, toFeatureCollection } from '../utils/geojson';
import { BioZonesService, RetrieveZonesParams } from '../zones/zones.service';

const POI_FILL_OPACITY = 0.5;
const POI_STROKE_OPACITY = 1;

@Component({
  selector: 'bio-edit-excursion-themes-step',
  templateUrl: './edit-excursion-themes-step.component.html',
  styleUrls: ['./edit-excursion-themes-step.component.styl']
})
export class EditExcursionThemesStepComponent implements OnInit {

  excursionForm: FormGroup;
  map: LeafletMap;
  mapData: any;
  themes: ThemeView[];

  constructor(private cdr: ChangeDetectorRef, private editExcursionService: EditExcursionService, private poisService: PoisService, private themesService: BioThemesService, private zonesService: BioZonesService) {
  }

  ngOnInit() {

    const initObs = this.editExcursionService.excursionObs.first().do(() => {
      this.excursionForm = this.editExcursionService.excursionForm;
    });

    initObs
      .switchMap((excursion: Excursion) => {
        return Observable.forkJoin(
          this.initPois(excursion),
          this.initThemes(excursion),
          this.initZones(excursion)
        );
      })
      .subscribe((results) => this.initMap(results[0], results[2]));
  }

  onMapReady(map: LeafletMap) {
    this.map = map;
    this.cdr.detectChanges();
  }

  toggleTheme(theme: ThemeView) {
    theme.selected = !theme.selected;
    this.excursionForm.controls.themes.setValue(this.getSelectedThemes());

    theme.layer.setStyle({
      opacity: theme.selected ? POI_STROKE_OPACITY : 0,
      fillOpacity: theme.selected ? POI_FILL_OPACITY : 0
    });
  }

  private initPois(excursion: Excursion): Observable<Poi[]> {

    const params: RetrievePoiParams = {
      zones: excursion.zoneHrefs
    };

    return this.poisService.retrieveAll(excursion.trail, params);
  }

  private initThemes(excursion: Excursion): Observable<Theme[]> {
    return this.themesService.retrieveAll().do(themes => {
      this.themes = themes.map(theme => {
        return new ThemeView(theme, includes(excursion.themes, theme.name));
      });
    });
  }

  private initMap(pois: Poi[], zones: Zone[]) {

    this.mapData = {};

    this.mapData.bounds = LatLngBounds.fromBounds(zones.map(zone => zone.bounds)).toLeaflet();

    this.mapData.boundsOptions = {
      padding: [ 20, 20 ]
    };

    this.themes.forEach(theme => {
      const themePois = pois.filter(poi => poi.theme === theme.name);
      theme.poiCount = themePois.length;
      theme.layer = leafletGeoJsonLayer(toFeatureCollection<Poi>(themePois), {
        pointToLayer: (feature: GeoJsonFeature, latLng) => {
          return L.circleMarker(latLng);
        },
        style: (feature: GeoJsonFeature) => {
          return this.getPoiLayerStyle(feature);
        }
      });
    });

    const zonesLayer = leafletGeoJsonLayer(toFeatureCollection<Zone>(zones), {
      style: (feature: GeoJsonFeature) => this.getZoneLayerStyle(feature)
    });

    const mapLayers = [
      leafletTileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'),
      zonesLayer,
      ...this.themes.map(theme => theme.layer)
    ];

    this.mapData.options = {
      scrollWheelZoom: false,
      layers: mapLayers
    };
  }

  private initZones(excursion: Excursion): Observable<Zone[]> {
    return this.zonesService.retrieveAll(excursion.trail, {
      hrefs: excursion.zoneHrefs
    });
  }

  private isThemeSelected(theme: string): boolean {
    return find(this.themes, { name: theme }).selected;
  }

  private getSelectedThemes(): Array<string> {
    return this.themes.filter(theme => theme.selected).map(theme => theme.name);
  }

  private getPoiLayerStyle(poi: GeoJsonFeature): any {

    const theme = poi.properties.theme;
    const color = Theme.color(theme);
    const visible = this.isThemeSelected(theme);

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

class ThemeView {
  layer: LeafletFeatureGroup;
  poiCount: number;
  selected: boolean;

  constructor(private theme: Theme, selected: boolean) {
    this.selected = selected;
  }

  get name() {
    return this.theme.name;
  }

  get description() {
    return this.theme.description;
  }
}
