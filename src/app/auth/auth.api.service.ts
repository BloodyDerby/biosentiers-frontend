import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';

import { BioApiService } from '../api/api.service';
import { Invitation, PasswordResetRequest } from '../models';

@Injectable()
export class AuthApiService {

  constructor(private api: BioApiService) {
  }

  sendInvitation(invitation: Invitation): Observable<Invitation> {
    return this.api
      .post('/auth/invitation', invitation)
      .execute()
      .map(res => new Invitation(res.json()));
  }

  retrieveInvitation(authToken: string): Observable<Invitation> {
    return this.api
      .get('/auth/invitation')
      .header('Authorization', `Bearer ${authToken}`)
      .execute()
      .map(res => new Invitation(res.json()));
  }

  requestPasswordReset(passwordResetRequest: PasswordResetRequest): Observable<PasswordResetRequest> {
    return this.api
      .post(`/auth/passwordReset`, passwordResetRequest)
      .execute()
      .map(res => new PasswordResetRequest(res.json()));
  }

  retrievePasswordReset(authToken: string): Observable<PasswordResetRequest> {
    return this.api
      .get('/auth/passwordReset')
      .header('Authorization', `Bearer ${authToken}`)
      .execute()
      .map(res => new PasswordResetRequest(res.json()));
  }

}
