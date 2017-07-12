import identity from 'lodash/identity';

type Properties = { [key: string]: any };
type PropertiesGenerator<T extends GeoJsonGeometry> = (geometry: T) => Properties;

export interface GeoJsonGeometry {
  toGeoJson(): any;
}

export class GeoJsonFeature {
  type: string;
  geometry: any;
  properties: { [key: string]: any };

  constructor(geometry: GeoJsonGeometry, properties?: Properties) {
    this.type = 'Feature';
    this.geometry = geometry.toGeoJson();
    this.properties = properties || {};
  }
}

export class GeoJsonFeatureCollection {
  type: string;
  features: GeoJsonFeature[];

  constructor(features: GeoJsonFeature[]) {
    this.type = 'FeatureCollection';
    this.features = features;
  }
}

export function toFeature<T extends GeoJsonGeometry>(geometry: T, properties: PropertiesGenerator<T> = identity): GeoJsonFeature {
  return new GeoJsonFeature(geometry, properties(geometry));
}

export function toFeatureCollection<T extends GeoJsonGeometry>(geometries: T[], properties: PropertiesGenerator<T> = identity): GeoJsonFeatureCollection {
  return new GeoJsonFeatureCollection(geometries.map(geometry => toFeature<T>(geometry, properties)));
}
