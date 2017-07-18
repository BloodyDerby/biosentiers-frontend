import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import find from 'lodash/find';
import moment from 'moment';

import { Excursion, Participant, Zone } from '../models';

declare const bioqr: any;
declare const qrcodelib: any;

@Component({
  selector: 'bio-excursion-qrcode',
  template: '<canvas #canvas></canvas>'
})
export class ExcursionQrcodeComponent implements OnInit {

  @Input()
  private excursion: Excursion;

  @Input()
  private participant: Participant;

  @Input()
  private zones: Zone[];

  @ViewChild('canvas')
  private canvas: ElementRef;

  constructor() {
  }

  ngOnInit() {

    const qrSegments = [
      { data: this.getEncodedBioCodeData(), mode: 'numeric' }
    ];

    this.renderQrCode(qrSegments, this.canvas.nativeElement);
  }

  private renderQrCode(segments: any[], element: ElementRef) {

    var qrOptions = {
      version: 10,
      errorCorrectionLevel: 'Q',
      scale: 6,
      margin: 0
    };

    qrcodelib.toCanvas(element, segments, qrOptions, function(err) {
      if (err) {
        console.warn(err);
      }
    });
  }

  private getEncodedBioCodeData() {
    if (!this.excursion) {
      throw new Error('Excursion is required');
    } else if (!this.participant) {
      throw new Error('Participant is required');
    } else if (!this.zones) {
      throw new Error('Excursion zones are required');
    }

    const zonePositions = this.excursion.zoneHrefs.map(href => {
      const zone = find(this.zones, { href: href });
      if (!zone) {
        throw new Error(`Zone ${href} was not loaded`);
      }

      return zone.getPositionInTrail(this.excursion.trail);
    });

    const qrData = {
      version: 1,
      excursion: {
        creatorName: this.excursion.creator.fullName,
        id: this.excursion.id,
        date: moment(this.excursion.plannedAt).toDate(),
        name: this.excursion.name || `Sortie du ${moment(this.excursion.plannedAt).format('LL')}`,
        participant: {
          id: this.participant.id,
          name: this.participant.name,
        },
        themes: this.excursion.themes,
        // Zone positions are 1-based in the API, but 0-based in the QR code
        zones: zonePositions.map(p => p - 1)
      }
    };

    console.log(qrData);

    return bioqr.encode(qrData, {
      format: 'numeric'
    });
  }

}
