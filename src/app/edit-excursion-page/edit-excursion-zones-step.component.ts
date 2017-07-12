import { ChangeDetectorRef, Component, OnInit, ViewChild, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { LeafletDirective } from '@asymmetrik/angular2-leaflet';
import { geoJSON, Layer as LeafletLayer, Map as LeafletMap, tileLayer } from 'leaflet';
import each from 'lodash/each';
import extend from 'lodash/find';
import find from 'lodash/find';
import includes from 'lodash/includes';
import reduce from 'lodash/reduce';
import { Observable } from 'rxjs/Rx';

import { BioZonesService } from '../zones/zones.service';
import { Excursion } from '../models/excursion';
import { EditExcursionService } from './edit-excursion.service';
import { LatLngBounds } from '../models/lat-lng-bounds';
import { Zone } from '../models/zone';
import { GeoJsonFeature, GeoJsonFeatureCollection, toFeatureCollection } from '../utils/geojson';

const ZONE_SELECTED = Symbol('zone-selected');
const ZONE_UPDATE_STYLE = Symbol('zone-update-style');

@Component({
  selector: 'bio-edit-excursion-zones-step',
  templateUrl: './edit-excursion-zones-step.component.html',
  styleUrls: ['./edit-excursion-zones-step.component.styl']
})
export class EditExcursionZonesStepComponent implements OnInit {

  map: LeafletMap;
  mapData: any;
  trailHref: string;
  zones: Zone[];

  private excursionForm: FormGroup;

  constructor(private cdr: ChangeDetectorRef, private editExcursionService: EditExcursionService, private zonesService: BioZonesService) {
  }

  ngOnInit() {

    // Retrieve the shared form from the edition service
    const initObs = this.editExcursionService.excursionObs.first().do((excursion: Excursion) => {
      this.trailHref = excursion.trail.href;
      this.excursionForm = this.editExcursionService.excursionForm;
    });

    // Initialize the zones, then the map
    initObs
      .switchMap((excursion: Excursion) => this.initZones(excursion))
      .subscribe(() => this.initMap());
  }

  onMapReady(map: LeafletMap) {
    this.map = map;
    this.cdr.detectChanges();
  }

  isZoneSelected(zone: Zone): boolean {
    return zone[ZONE_SELECTED];
  }

  private initZones(excursion: Excursion): Observable<Zone[]> {
    return this.zonesService.retrieveAll(excursion.trail).do((zones: Zone[]) => {
      this.zones = each(zones, (zone: Zone) => {
        zone[ZONE_SELECTED] = includes(excursion.zoneHrefs || [], zone.href);
      });
    });
  }

  private initMap() {

    this.mapData = {};

    this.mapData.bounds = LatLngBounds.fromBounds(this.zones.map(zone => zone.bounds)).toLeaflet();

    this.mapData.boundsOptions = {
      padding: [ 20, 20 ]
    };

    this.mapData.options = {
      scrollWheelZoom: false,
      layers: [
        tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'),
        geoJSON(this.getZonesFeatureCollection(), {
          style: (feature: GeoJsonFeature) => {
            return this.getZoneLayerStyle(this.getZone(feature));
          },
          onEachFeature: (feature: GeoJsonFeature, layer: LeafletLayer) => {

            const zone = this.getZone(feature);
            zone[ZONE_UPDATE_STYLE] = () => {
              layer['setStyle'](this.getZoneLayerStyle(zone));
            };

            layer.on({
              click: (event) => {
                this.toggleZone(this.getZone(feature));
              }
            })
          }
        })
      ]
    };
  }

  private toggleZone(zone: Zone) {
    zone[ZONE_SELECTED] = !zone[ZONE_SELECTED];
    zone[ZONE_UPDATE_STYLE]();
    this.excursionForm.controls.zoneHrefs.setValue(this.getSelectedZones());
  }

  private getSelectedZones(): string[] {
    return this.zones.filter(zone => this.isZoneSelected(zone)).map(zone => zone.href);
  }

  private getZonesFeatureCollection(): GeoJsonFeatureCollection {
    return toFeatureCollection<Zone>(this.zones, (zone: Zone) => {
      return {
        position: zone.getPositionInTrail(this.trailHref)
      };
    });
  }

  private getZoneLayerStyle(zone: Zone): any {
    return {
      stroke: true,
      color: zone[ZONE_SELECTED] ? '#008b00' : '#8b0000',
      fill: true,
      fillColor: zone[ZONE_SELECTED] ? '#00ff00' : '#ff0000',
      fillOpacity: 0.5
    };
  }

  private getZone(zoneRef: number | string | GeoJsonFeature): Zone {

    let position: number;
    if (typeof(zoneRef) == 'number') {
      position = zoneRef;
    } else if (typeof(zoneRef) == 'string') {
      position = parseInt(zoneRef, 10);
    } else {
      position = zoneRef.properties['position'];
    }

    return find(this.zones, zone => zone.getPositionInTrail(this.trailHref) === position);
  }

}
