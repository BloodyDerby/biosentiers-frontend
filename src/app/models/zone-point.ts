import { LatLng } from './lat-lng';
import { GeoJsonGeometry } from '../utils/geojson';
import { parsePropertiesInto } from '../utils/models';

export class ZonePoint implements GeoJsonGeometry {
  type: string;
  location: LatLng;
  createdAt: Date;

  constructor(data?: any) {
    parsePropertiesInto(this, data, 'type', 'location', 'createdAt');
    this.location = LatLng.fromGeoJson(data['geometry']['coordinates']);
  }

  toGeoJson() {
    return {
      type: 'Point',
      coordinates: this.location.toGeoJson()
    };
  }
}
