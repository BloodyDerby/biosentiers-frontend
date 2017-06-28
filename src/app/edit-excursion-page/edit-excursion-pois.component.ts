import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { LeafletDirective } from '@asymmetrik/angular2-leaflet';
import Leaflet from 'leaflet';
import { Layer as LeafletLayer } from 'leaflet';
import { Map } from 'leaflet';
import cloneDeep from 'lodash/cloneDeep';
import each from 'lodash/each';
import find from 'lodash/find';
import includes from 'lodash/includes';
import reduce from 'lodash/reduce';

import { BioThemesService } from '../themes/themes.service';
import { BioZonesService } from '../zones/zones.service';
import { Excursion } from '../models/excursion';
import { EditExcursionService } from './edit-excursion.service';
import { LatLngBounds } from '../models/lat-lng-bounds';
import { Theme } from '../models/theme';
import { Zone } from '../models/zone';

@Component({
  selector: 'bio-edit-excursion-pois',
  templateUrl: './edit-excursion-pois.component.html',
  styleUrls: ['./edit-excursion-pois.component.styl']
})
export class EditExcursionPoisComponent implements OnInit {

  @Input()
  private excursion: Excursion;

  themes: Theme[];
  selectedThemes: any;
  zones: Zone[];
  selectedZones: { [s: string]: boolean };
  zoneLayers: { [s: string]: LeafletLayer };
  mapData: any;

  private map: Map;
  @ViewChild('map')
  private mapDirective: LeafletDirective;

  constructor(private editExcursionService: EditExcursionService, private themesService: BioThemesService, private zonesService: BioZonesService) {
    this.zoneLayers = {};
  }

  ngOnInit() {
    this.initThemes();

    this.editExcursionService.excursionObs.first().subscribe((excursion) => {
      if (!excursion) {
        return;
      }

      this.excursion = excursion;
      this.initZones(excursion);
      this.autoSelectThemes();
    });
  }

  onMapReady(map: Map) {
    this.map = map;
  }

  initThemes() {
    this.themesService.retrieveAll().subscribe((themes) => {

      this.themes = themes;
      this.selectedThemes = reduce(themes, (memo, theme) => {
        memo[theme.name] = false;
        return memo;
      }, {});

      this.autoSelectThemes();
    });
  }

  autoSelectThemes() {
    if (this.excursion && this.selectedThemes) {
      for (let themeName in this.selectedThemes) {
        this.selectedThemes[themeName] = includes(this.excursion.themes || [], themeName);
      }
    }
  }

  toggleTheme(theme: any) {
    this.selectedThemes[theme.name] = !this.selectedThemes[theme.name];
    this.excursion.themes = this.getSelectedThemes();
    this.editExcursionService.save();
  }

  getSelectedThemes(): Array<string> {
    return reduce(this.selectedThemes, (memo, selected, theme) => {
      if (selected) {
        memo.push(theme);
      }

      return memo;
    }, []);
  }

  initZones(excursion: Excursion) {
    this.zonesService.retrieveAll(excursion.trail).subscribe((zones) => {

      this.zones = zones;
      this.selectedZones = reduce(zones, (memo, zone) => {
        memo[zone.position.toString()] = includes(excursion.zones || [], zone.position);
        return memo;
      }, {});

      this.initMap();
    });
  }

  toggleZone(zone: any) {

    this.selectedZones[zone.position.toString()] = !this.selectedZones[zone.position.toString()];
    this.updateZoneLayerStyle(zone.position);

    this.excursion.zones = this.getSelectedZones();
    this.editExcursionService.save();
  }

  getSelectedZones(): Array<number> {
    return reduce(this.selectedZones, (memo, selected, position) => {
      if (selected) {
        memo.push(parseInt(position, 10));
      }

      return memo;
    }, []);
  }

  initMap() {

    this.mapData = {};

    this.mapData.bounds = LatLngBounds.fromBounds(this.zones.map(zone => zone.bounds)).toLeaflet();

    this.mapData.boundsOptions = {
      padding: [ 20, 20 ]
    };

    this.mapData.options = {
      scrollWheelZoom: false,
      layers: [
        Leaflet.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'),
        L.geoJSON(this.getZonesFeatureCollection(), {
          style: (feature) => {
            return this.getZoneLayerStyle(feature.properties['position']);
          },
          onEachFeature: (feature, layer) => {
            this.zoneLayers[feature.properties['position'].toString()] = layer;

            layer.on({
              click: (event) => {
                this.toggleZone(this.getZoneByFeature(feature));
              }
            })
          }
        })
      ]
    };
  }

  getZonesFeatureCollection(): any {
    return {
      name: 'zone',
      type: 'FeatureCollection',
      features: this.zones.map(zone => {
        return {
          type: 'Feature',
          geometry: zone.toGeoJson(),
          properties: {
            position: zone.position
          }
        };
      })
    };
  }

  getZoneLayerStyle(position): any {
    return {
      stroke: true,
      color: this.selectedZones[position.toString()] ? '#008b00' : '#8b0000',
      fill: true,
      fillColor: this.selectedZones[position.toString()] ? '#00ff00' : '#ff0000',
      fillOpacity: 0.5
    };
  }

  getZoneByPosition(position) {
    return find(this.zones, { position: position });
  }

  getZoneByFeature(feature) {
    return this.getZoneByPosition(feature.properties['position']);
  }

  updateZoneLayerStyle(position) {
    this.zoneLayers[position.toString()]['setStyle'](this.getZoneLayerStyle(position));
  }

}
