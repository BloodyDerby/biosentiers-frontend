import { Component, forwardRef, Input, OnInit } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { LeafletDirective } from '@asymmetrik/angular2-leaflet';
import { geoJSON as createLeafletGeoJsonLayer, tileLayer as createLeafletTileLayer, Layer as LeafletLayer, Map as LeafletMap, Marker as LeafletMarker } from 'leaflet';
import find from 'lodash/find';
import includes from 'lodash/includes';
import pull from 'lodash/pull';
import { Observable } from 'rxjs/Rx';

import { getEndPointMarker } from '../excursions';
import { Excursion, LatLngBounds, Trail, Zone } from '../models';
import { GeoJsonFeature, GeoJsonFeatureCollection, toFeatureCollection } from '../utils/geojson';

@Component({
  selector: 'bio-zone-map',
  templateUrl: './zone-map.component.html',
  styleUrls: ['./zone-map.component.styl'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ZoneMapComponent),
      multi: true
    }
  ]
})
export class ZoneMapComponent implements ControlValueAccessor, OnInit {
  map: LeafletMap;
  mapData: any;

  @Input()
  zones: Zone[];

  @Input()
  trail: Trail;

  private onChange: (value: string[]) => void;
  private onTouched: (...args: any[]) => void;
  private selectedZones: string[];
  private touched: boolean;
  private zoneViews: ZoneView[];
  private endPointMarker: LeafletMarker;

  constructor() {
    this.touched = false;
  }

  ngOnInit() {
    if (!this.zones) {
      throw new Error('Zones input is required');
    } else if (!this.zones.length) {
      throw new Error('At least one zone is required');
    }

    this.initZoneViews();
    this.initMap();
  }

  writeValue(value: string[]) {
    this.selectedZones = value;
    this.updateZoneStyles();
    this.updateEndPointMarker();
  }

  registerOnChange(onChange: (value: string[]) => void) {
    this.onChange = onChange;
  }

  registerOnTouched(onTouched: (...args: any[]) => void) {
    this.touched = false;
    this.onTouched = onTouched;
  }

  onMapReady(map: LeafletMap) {
    this.map = map;
    this.updateEndPointMarker();
  }

  private isZoneSelected(zoneView: ZoneView): boolean {
    return includes(this.selectedZones, zoneView.zone.href);
  }

  private updateZoneStyles() {
    this.zoneViews.forEach(zoneView => this.updateZoneStyle(zoneView));
  }

  private updateZoneStyle(zoneView: ZoneView) {
    zoneView.layer['setStyle'](this.getZoneLayerStyle(zoneView));
  }

  private toggleZone(zoneView: ZoneView) {
    if (this.isZoneSelected(zoneView)) {
      pull(this.selectedZones, zoneView.zone.href);
    } else {
      this.selectedZones.push(zoneView.zone.href);
    }

    if (!this.touched) {
      this.touched = true;
      this.onTouched();
    }

    this.updateZoneStyle(zoneView);
    this.updateEndPointMarker();
    this.onChange(this.selectedZones);
  }

  private updateEndPointMarker() {
    if (!this.map || !this.trail || !this.zones) {
      return;
    } else if (this.endPointMarker) {
      this.map.removeLayer(this.endPointMarker);
      delete this.endPointMarker;
    }

    const selectedZones = this.zoneViews.filter(view => this.isZoneSelected(view)).map(view => view.zone);
    this.endPointMarker = getEndPointMarker(this.trail, selectedZones);
    if (this.endPointMarker) {
      this.endPointMarker.addTo(this.map);
    }
  }

  private initZoneViews() {
    this.zoneViews = this.zones.map(zone => new ZoneView(zone));
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
        createLeafletTileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'),
        createLeafletGeoJsonLayer(this.getZonesFeatureCollection(), {
          style: (feature: GeoJsonFeature) => {
            return this.getZoneLayerStyle(this.getZoneView(feature));
          },
          onEachFeature: (feature: GeoJsonFeature, layer: LeafletLayer) => {

            const zoneView = this.getZoneView(feature);
            zoneView.layer = layer;

            layer.on({
              click: (event) => {
                this.toggleZone(this.getZoneView(feature));
              }
            })
          }
        })
      ]
    };
  }

  private getZonesFeatureCollection(): GeoJsonFeatureCollection {
    return toFeatureCollection<Zone>(this.zones, zone => {
      return {
        position: zone.getPositionInTrail(this.trail)
      };
    });
  }

  private getZoneLayerStyle(zoneView: ZoneView): any {
    return {
      stroke: true,
      color: this.isZoneSelected(zoneView) ? '#008b00' : '#8b0000',
      fill: true,
      fillColor: this.isZoneSelected(zoneView) ? '#00ff00' : '#ff0000',
      fillOpacity: 0.5
    };
  }

  private getZoneView(zoneRef: number | string | GeoJsonFeature): ZoneView {

    let position: number;
    if (typeof(zoneRef) == 'number') {
      position = zoneRef;
    } else if (typeof(zoneRef) == 'string') {
      position = parseInt(zoneRef, 10);
    } else {
      position = zoneRef.properties['position'];
    }

    return find(this.zoneViews, zoneView => zoneView.zone.getPositionInTrail(this.trail) === position);
  }

}

class ZoneView {
  layer: LeafletLayer;
  zone: Zone;

  constructor(zone: Zone) {
    this.zone = zone;
  }
}
