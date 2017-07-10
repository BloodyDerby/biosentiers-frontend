import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import moment from 'moment';

import { Excursion } from '../models/excursion';
import { Participant } from '../models/participant';

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

  @ViewChild('canvas')
  private canvas: ElementRef;

  constructor() {
  }

  ngOnInit() {
    const qrData = {
      version: 1,
      excursion: {
        creatorName: this.excursion.creator.fullName,
        id: this.excursion.id,
        date: moment(this.excursion.plannedAt).toDate(),
        name: this.excursion.name,
        participant: {
          id: this.participant.id,
          name: this.participant.name,
        },
        themes: this.excursion.themes,
        // FIXME: determine zone index from their position in the database
        zones: this.excursion.zones.map(n => n - 1)
      }
    };

    const encodedQrData = bioqr.encode(qrData, { format: 'numeric' });

    var qrSegments = [
      { data: encodedQrData, mode: 'numeric' }
    ];

    var qrOptions = {
      version: 10,
      errorCorrectionLevel: 'Q',
      scale: 6,
      margin: 0
    };

    qrcodelib.toCanvas(this.canvas.nativeElement, qrSegments, qrOptions, function(err) {
      if (err) {
        console.warn(err);
      }
    });
  }

}
