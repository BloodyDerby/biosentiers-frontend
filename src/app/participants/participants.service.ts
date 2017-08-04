import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';

import { ApiService } from '../api';
import { Excursion, Participant } from '../models';

@Injectable()
export class ParticipantsService {

  constructor(private api: ApiService) {
  }

  create(excursion: Excursion, participant: Participant): Observable<Participant> {
    return this.api
      .post(`/excursions/${excursion.id}/participants`, participant)
      .execute()
      .map(res => new Participant(res.json()));
  }

  retrieveAll(excursion: Excursion): Observable<Participant[]> {
    return this.api
      .get(`/excursions/${excursion.id}/participants`)
      .execute()
      .map(res => res.json().map(json => new Participant(json)));
  }

  update(excursion: Excursion, participant: Participant): Observable<Participant> {
    return this.api
      .patch(`/excursions/${excursion.id}/participants/${participant.id}`, participant)
      .execute()
      .map(res => new Participant(res.json()));
  }

  delete(excursion: Excursion, participant: Participant): Observable<any> {
    return this.api
      .delete(`/excursions/${excursion.id}/participants/${participant.id}`)
      .execute()
      .switchMap(res => Observable.of(participant));
  }

}
