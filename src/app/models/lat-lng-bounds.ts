import flatten from 'lodash/flatten';

import { LatLng } from './lat-lng';
import { LatLngBounds as LeafletLatLngBounds } from 'leaflet';

export class LatLngBounds {

  static fromBounds(bounds: LatLngBounds[]): LatLngBounds {
    return LatLngBounds.fromCoordinates(flatten(bounds.map(b => [ b.southWest, b.northEast ])));
  }

  static fromCoordinates(coords: LatLng[]): LatLngBounds {

    let minLat: number, minLng: number, maxLat: number, maxLng: number;
    coords.forEach((latLng) => {
      if (minLng === undefined || latLng.longitude < minLng) {
        minLng = latLng.longitude;
      }
      if (maxLng === undefined || latLng.longitude > maxLng) {
        maxLng = latLng.longitude;
      }
      if (minLat === undefined || latLng.latitude < minLat) {
        minLat = latLng.latitude;
      }
      if (maxLat === undefined || latLng.latitude > maxLat) {
        maxLat = latLng.latitude;
      }
    });

    return new LatLngBounds(new LatLng(minLat, minLng), new LatLng(maxLat, maxLng));
  }

  southWest: LatLng;
  northEast: LatLng;

  constructor(southWest: LatLng, northEast: LatLng) {
    this.southWest = southWest;
    this.northEast = northEast;
  }

  toLeaflet(): LeafletLatLngBounds {
    return L.latLngBounds(this.southWest.toLeaflet(), this.northEast.toLeaflet());
  }
}
