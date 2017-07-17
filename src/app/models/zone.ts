import { LatLng } from './lat-lng';
import { LatLngBounds } from './lat-lng-bounds';
import get from 'lodash/get';
import isInteger from 'lodash/isInteger';
import reduce from 'lodash/reduce';
import { Trail } from './trail';
import { GeoJsonGeometry } from '../utils/geojson';
import { parsePropertiesInto } from '../utils/models';

export class Zone implements GeoJsonGeometry {
  id: string;
  href: string;
  type: string;
  description: string;
  natureType: string;
  polygon: LatLng[];
  bounds: LatLngBounds;
  createdAt: Date;
  trailHrefs: { [key: string]: ZoneTrailData };

  constructor(data?: any) {
    parsePropertiesInto(this, data, 'id', 'href', 'type', 'description', 'natureType', 'createdAt');
    this.polygon = data['geometry']['coordinates'][0].map(LatLng.fromGeoJson);
    this.bounds = LatLngBounds.fromCoordinates(this.polygon);
    this.trailHrefs = reduce(get(data, 'trailHrefs', {}), (memo, trailData, href) => {
      memo[href] = new ZoneTrailData(trailData);
      return memo;
    }, {});
  }

  getPositionInTrail(trailRef: string | Trail): number {

    const trailHref = typeof(trailRef) == 'string' ? trailRef : trailRef.href;

    const trailData: ZoneTrailData = this.trailHrefs[trailHref];
    if (!trailData) {
      throw new Error(`Zone ${this.href} is not linked to trail ${trailHref}`);
    }

    const position = trailData.position;
    if (position === undefined) {
      throw new Error(`No position found for zone ${this.href} in trail ${trailHref}`);
    } else if (!isInteger(position) || position < 1) {
      throw new Error(`Position ${position} is invalid for zone ${this.href} in trail ${trailHref}`);
    }

    return position;
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

class ZoneTrailData {
  position: number;

  constructor(data?: any) {
    parsePropertiesInto(this, data, 'position');
  }
}
