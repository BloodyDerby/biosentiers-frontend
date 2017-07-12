import { LatLng } from './lat-lng';
import { GeoJsonGeometry } from '../utils/geojson';
import { parsePropertiesInto } from '../utils/models';

export class Poi implements GeoJsonGeometry {
  theme: string;
  location: LatLng;
  createdAt: Date;

  constructor(data?: any) {
    parsePropertiesInto(this, data, 'theme', 'createdAt');
    this.location = LatLng.fromGeoJson(data['geometry']['coordinates']);
  }

  toGeoJson() {
    return {
      type: 'Point',
      coordinates: this.location.toGeoJson()
    };
  }
}
