import { LatLng } from './lat-lng';
import { LatLngBounds } from './lat-lng-bounds';
import get from 'lodash/get';
import extend from 'lodash/extend';
import isInteger from 'lodash/isInteger';
import last from 'lodash/last';
import reduce from 'lodash/reduce';
import sortBy from 'lodash/sortBy';
import { Trail } from './trail';
import { GeoJsonGeometry } from '../utils/geojson';
import { parsePropertiesInto } from '../utils/models';
import { ZonePoint } from './zone-point';

export class Zone implements GeoJsonGeometry {
  static getEndPointInTrail(trail: Trail, zones: Zone[]): ZonePoint {

    const lastZone = last(sortBy(zones, zone => zone.getPositionInTrail(trail)));
    if (!lastZone) {
      return;
    } else if (!lastZone.points) {
      throw new Error(`Zone ${lastZone.href} has no points`);
    } else if (!lastZone.points.end) {
      throw new Error(`Zone ${lastZone.href} has no end point`);
    }

    return lastZone.points.end;
  }

  id: string;
  href: string;
  type: string;
  description: string;
  natureType: string;
  polygon: LatLng[];
  bounds: LatLngBounds;
  createdAt: Date;
  points: { [key: string]: ZonePoint };
  trailHrefs: { [key: string]: ZoneTrailData };

  constructor(data?: any) {
    parsePropertiesInto(this, data, 'id', 'href', 'type', 'description', 'natureType', 'createdAt');

    this.polygon = data['geometry']['coordinates'][0].map(LatLng.fromGeoJson);
    this.bounds = LatLngBounds.fromCoordinates(this.polygon);

    this.points = reduce(get(data, 'points', {}), (memo, pointData, pointType) => {
      memo[pointType] = new ZonePoint(extend(pointData, { type: pointType }));
      return memo;
    }, {});

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
