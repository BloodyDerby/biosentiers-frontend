import Color from 'color';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import includes from 'lodash/includes';
import { Observable, ReplaySubject, Subscription } from 'rxjs/Rx';

import { EditExcursionService } from './edit-excursion.service';
import { Excursion, Theme, Trail, Zone } from '../models';
import { ThemesService } from '../themes';
import { RetrieveZonesParams, ZonesService } from '../zones/zones.service';
import { spread } from '../utils/async';

@Component({
  selector: 'bio-edit-excursion-themes-step',
  templateUrl: './edit-excursion-themes-step.component.html',
  styleUrls: ['./edit-excursion-themes-step.component.styl']
})
export class EditExcursionThemesStepComponent implements OnInit, OnDestroy {
  excursion: Excursion
  excursionForm: FormGroup;
  excursionSubscription: Subscription;
  themeViews: ThemeView[];
  zones: Zone[];
  initError: Error;

  private zonesLoadedSubject: ReplaySubject<Zone[]>;

  constructor(private editExcursionService: EditExcursionService, private themesService: ThemesService, private zonesService: ZonesService) {
    this.zonesLoadedSubject = new ReplaySubject<Zone[]>(1);
  }

  ngOnInit() {

    const excursionObs = this.editExcursionService.excursionObs.first().do(excursion => {
      this.excursionForm = this.editExcursionService.excursionForm;
    });

    const zonesLoadedObs = this.zonesLoadedSubject.asObservable().first();

    Observable.forkJoin(excursionObs, zonesLoadedObs)
      .switchMap(spread((excursion, zones) => this.initThemeViews(excursion, zones)))
      .subscribe(undefined, err => this.initError = err);

    this.excursionSubscription = this.editExcursionService.excursionObs.subscribe(excursion => this.excursion = excursion);
  }

  ngOnDestroy() {
    this.excursionSubscription.unsubscribe();
  }

  onZonesLoaded(zones: Zone[]) {
    this.zones = zones;
    this.zonesLoadedSubject.next(zones);
  }

  toggleTheme(themeView: ThemeView) {
    themeView.selected = !themeView.selected;
    this.excursionForm.controls.themes.setValue(this.getSelectedThemeNames());
  }

  selectAll() {
    if (this.excursionForm.get('themes').value.length < this.themeViews.length) {
      this.excursionForm.get('themes').setValue(this.themeViews.map(themeView => themeView.name));
      this.themeViews.forEach(themeView => themeView.selected = true);
    }
  }

  unselectAll() {
    if (this.excursionForm.get('themes').value.length !== 0) {
      this.excursionForm.get('themes').setValue([]);
      this.themeViews.forEach(themeView => themeView.selected = false);
    }
  }

  private initThemeViews(excursion: Excursion, zones: Zone[]): Observable<Theme[]> {
    return this.themesService.retrieveAll().do(themes => {
      this.themeViews = themes.map(theme => {
        return new ThemeView(theme, includes(excursion.themes, theme.name));
      });
    });
  }

  private getSelectedThemeNames(): string[] {
    return this.themeViews.filter(themeView => themeView.selected).map(theme => theme.name);
  }

}

class ThemeView {
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
