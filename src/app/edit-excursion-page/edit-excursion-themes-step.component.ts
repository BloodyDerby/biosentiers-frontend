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

@Component({
  selector: 'bio-edit-excursion-themes-step',
  templateUrl: './edit-excursion-themes-step.component.html',
  styleUrls: ['./edit-excursion-themes-step.component.styl']
})
export class EditExcursionThemesStepComponent implements OnInit {
  excursion: Excursion
  excursionForm: FormGroup;
  excursionThemes: Theme[];
  map: LeafletMap;
  mapData: any;
  themes: ThemeView[];
  zones: Zone[];
  initError: Error;

  constructor(private cdr: ChangeDetectorRef, private editExcursionService: EditExcursionService, private poisService: PoisService, private themesService: BioThemesService, private zonesService: BioZonesService) {
  }

  ngOnInit() {

    const initObs = this.editExcursionService.excursionObs.first().do(excursion => {
      this.excursion = excursion;
      this.excursionForm = this.editExcursionService.excursionForm;
    });

    initObs
      .switchMap(excursion => Observable.forkJoin(
        Observable.of(excursion),
        this.initZones(excursion)
      ))
      .switchMap(results => this.initThemes(results[0], results[1]))
      .subscribe(undefined, err => this.initError = err);
  }

  toggleTheme(theme: ThemeView) {
    theme.selected = !theme.selected;
    this.excursionForm.controls.themes.setValue(this.getSelectedThemes());
    this.updateExcursionThemes();
  }

  private initThemes(excursion: Excursion, zones: Zone[]): Observable<Theme[]> {
    return this.themesService.retrieveAll().do(themes => {
      this.themes = themes.map(theme => {
        return new ThemeView(theme, includes(excursion.themes, theme.name));
      });

      this.updateExcursionThemes();

      // TODO: display poi counts
      const loadCounts = themes.map(theme => this.countPois(excursion, zones, theme));
      Observable.forkJoin(...loadCounts).subscribe(results => {
        console.log(results);
      });
    });
  }

  private countPois(excursion: Excursion, zones: Zone[], theme: Theme): Observable<number> {
    return this.poisService.count(excursion.trail, {
      themes: [ theme.name ],
      zones: zones.map(zone => zone.href)
    }).map(res => res.pagination.effectiveTotal);
  }

  private initZones(excursion: Excursion): Observable<Zone[]> {
    return this.zonesService.retrieveAll(excursion.trail, {
      hrefs: excursion.zoneHrefs
    }).do(zones => this.zones = zones);
  }

  private isThemeSelected(theme: string): boolean {
    return find(this.themes, { name: theme }).selected;
  }

  private getSelectedThemes(): Array<string> {
    return this.themes.filter(theme => theme.selected).map(theme => theme.name);
  }

  private updateExcursionThemes() {
    this.excursionThemes = this.themes.filter(themeView => themeView.selected).map(themeView => themeView.theme);
  }

}

class ThemeView {
  poiCount: number;
  selected: boolean;
  theme: Theme;

  constructor(theme: Theme, selected: boolean) {
    this.selected = selected;
    this.theme = theme;
  }

  get name() {
    return this.theme.name;
  }

  get description() {
    return this.theme.description;
  }
}
