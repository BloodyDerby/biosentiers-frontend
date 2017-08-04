import { icon as createLeafletIcon, marker as createLeafletMarker, Marker as LeafletMarker } from 'leaflet';

import { Trail, Zone } from '../models';

export function getEndPointMarker(trail: Trail, zones: Zone[]): LeafletMarker {
  if (!trail) {
    throw new Error('Trail is required');
  } else if (!zones) {
    throw new Error('Zones is required and cannot be empty');
  } else if (!zones.length) {
    return;
  }

  const endPoint = Zone.getEndPointInTrail(trail, zones);
  if (!endPoint) {
    return;
  }

  const marker = createLeafletMarker(endPoint.location.toLeaflet(), {
    icon: createLeafletIcon({
      iconUrl: 'assets/img/leaflet/marker-icon.png',
      iconRetinaUrl: 'assets/img/leaflet/marker-icon-2x.png',
      iconSize: [ 25, 41 ],
      iconAnchor: [ 12.5, 41 ],
      shadowUrl: 'assets/img/leaflet/marker-shadow.png'
    })
  });

  marker.bindTooltip('Fin de la sortie', {
    offset: [ -8, -28 ]
  });

  return marker;
}
