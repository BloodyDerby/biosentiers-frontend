import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import includes from 'lodash/includes';
import reduce from 'lodash/reduce';

import { EditExcursionService } from './edit-excursion.service';
import { Excursion } from '../models/excursion';
import { Theme } from '../models/theme';
import { BioThemesService } from '../themes/themes.service';

const THEME_SELECTED = Symbol();

@Component({
  selector: 'bio-edit-excursion-themes-step',
  templateUrl: './edit-excursion-themes-step.component.html'
})
export class EditExcursionThemesStepComponent implements OnInit {

  themes: Theme[];
  excursionForm: FormGroup;

  constructor(private editExcursionService: EditExcursionService, private themesService: BioThemesService) {
  }

  ngOnInit() {
    this.excursionForm = this.editExcursionService.excursionForm;
    this.editExcursionService.excursionObs.first().subscribe(excursion => this.initThemes(excursion));
  }

  isThemeSelected(theme: Theme): boolean {
    return theme[THEME_SELECTED];
  }

  toggleTheme(theme: Theme) {
    theme[THEME_SELECTED] = !theme[THEME_SELECTED];
    this.excursionForm.controls.themes.setValue(this.getSelectedThemes());
  }

  private initThemes(excursion) {
    this.themesService.retrieveAll().subscribe((themes) => {
      themes.forEach(theme => {
        theme[THEME_SELECTED] = includes(excursion.themes, theme.name);
      });

      this.themes = themes;
    });
  }

  private getSelectedThemes(): Array<string> {
    return this.themes.filter(theme => this.isThemeSelected(theme)).map(theme => theme.name);
  }

}
