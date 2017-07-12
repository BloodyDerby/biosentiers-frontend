import { LatLng as LeafletLatLng } from 'leaflet';
import compact from 'lodash/compact';

export class LatLng {

  static fromGeoJson(coords: number[]) {
    return new LatLng(coords[1], coords[0], coords[2]);
  }

  latitude: number;
  longitude: number;
  altitude: number;

  constructor(latitude: number, longitude: number, altitude?: number) {
    if (latitude < -90 || latitude > 90) {
      throw new Error(`Latitude ${latitude} is out of bounds`);
    } else if (longitude < -180 || longitude > 180) {
      throw new Error(`Longitude ${longitude} is out of bounds`);
    }

    this.latitude = latitude;
    this.longitude = longitude;
    this.altitude = altitude;
  }

  toGeoJson(): number[] {
    return compact([ this.longitude, this.latitude, this.altitude ]);
  }

  toLeaflet(): LeafletLatLng {
    return L.latLng(this.latitude, this.longitude, this.altitude);
  }
}
