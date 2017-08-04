import { Model } from './abstract';
import { LatLng } from './lat-lng';
import { GeoJsonGeometry } from '../utils/geojson';

export class ZonePoint extends Model implements GeoJsonGeometry {
  type: string;
  location: LatLng;
  createdAt: Date;

  constructor(data?: any) {
    super();
    this.parseProperties(data, 'type', 'location', 'createdAt');
    this.location = LatLng.fromGeoJson(data['geometry']['coordinates']);
  }

  toGeoJson() {
    return {
      type: 'Point',
      coordinates: this.location.toGeoJson()
    };
  }
}
