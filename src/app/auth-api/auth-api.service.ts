import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';

import { ApiService } from '../api';
import { Invitation, PasswordResetRequest } from '../models';

@Injectable()
export class AuthApiService {

  constructor(private api: ApiService) {
  }

  sendInvitation(invitation: Invitation): Observable<Invitation> {
    return this.api
      .post('/auth/invitations', invitation)
      .execute()
      .map(res => new Invitation(res.json()));
  }

  retrieveInvitation(authToken: string): Observable<Invitation> {
    return this.api
      .get('/auth/invitations')
      .header('Authorization', `Bearer ${authToken}`)
      .execute()
      .map(res => new Invitation(res.json()[0]));
  }

  requestPasswordReset(passwordResetRequest: PasswordResetRequest): Observable<PasswordResetRequest> {
    return this.api
      .post(`/auth/passwordResets`, passwordResetRequest)
      .execute()
      .map(res => new PasswordResetRequest(res.json()));
  }

  retrievePasswordReset(authToken: string): Observable<PasswordResetRequest> {
    return this.api
      .get('/auth/passwordResets')
      .header('Authorization', `Bearer ${authToken}`)
      .execute()
      .map(res => new PasswordResetRequest(res.json()[0]));
  }

}
