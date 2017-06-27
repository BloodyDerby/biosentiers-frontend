import { LatLng as LeafletLatLng } from 'leaflet';

export class LatLng {

  static fromGeoJson(coords: number[]) {
    return new LatLng(coords[1], coords[0]);
  }

  latitude: number;
  longitude: number;

  constructor(latitude: number, longitude: number) {
    if (latitude < -90 || latitude > 90) {
      throw new Error(`Latitude ${latitude} is out of bounds`);
    } else if (longitude < -180 || longitude > 180) {
      throw new Error(`Longitude ${longitude} is out of bounds`);
    }

    this.latitude = latitude;
    this.longitude = longitude;
  }

  toGeoJson(): number[] {
    return [ this.longitude, this.latitude ];
  }

  toLeaflet(): LeafletLatLng {
    return L.latLng(this.latitude, this.longitude);
  }
}
