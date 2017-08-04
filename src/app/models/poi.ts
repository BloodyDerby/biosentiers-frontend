import { Model } from './abstract';
import { LatLng } from './lat-lng';
import { GeoJsonGeometry } from '../utils/geojson';

export class Poi extends Model implements GeoJsonGeometry {
  theme: string;
  location: LatLng;
  createdAt: Date;

  constructor(data?: any) {
    super();
    this.parseProperties(data, 'theme', 'createdAt');
    this.location = LatLng.fromGeoJson(data['geometry']['coordinates']);
  }

  toGeoJson() {
    return {
      type: 'Point',
      coordinates: this.location.toGeoJson()
    };
  }
}
