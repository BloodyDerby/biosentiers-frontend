import extend from 'lodash/extend';
import pick from 'lodash/pick';
import moment from 'moment';

import { LatLng } from './lat-lng';
import { LatLngBounds } from './lat-lng-bounds';

export class Zone {

  position: number;
  keyword: string;
  description: string;
  nature: string;
  polygon: LatLng[];
  bounds: LatLngBounds;
  createdAt: Date;

  constructor(data?: Object) {
    extend(this, pick(data || {}, 'position', 'keyword', 'description', 'nature'));

    if (data['createdAt']) {
      this.createdAt = moment(data['createdAt']).toDate();
    }

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
