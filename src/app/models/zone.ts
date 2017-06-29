import { LatLng } from './lat-lng';
import { LatLngBounds } from './lat-lng-bounds';
import { GeoJsonGeometry } from '../utils/geojson';
import { parsePropertiesInto } from '../utils/models';

export class Zone implements GeoJsonGeometry {

  position: number;
  keyword: string;
  description: string;
  nature: string;
  polygon: LatLng[];
  bounds: LatLngBounds;
  createdAt: Date;

  constructor(data?: any) {
    parsePropertiesInto(this, data, 'position', 'keyword', 'description', 'nature', 'createdAt');
    this.polygon = data['geometry']['coordinates'][0].map(LatLng.fromGeoJson);
    this.bounds = LatLngBounds.fromCoordinates(this.polygon);
  }

  toGeoJson() {
    return {
      type: 'Polygon',
      coordinates: [
        this.polygon.map(latLng => latLng.toGeoJson())
      ]
    };
  }
}
