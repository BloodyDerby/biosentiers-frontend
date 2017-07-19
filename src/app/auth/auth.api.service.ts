import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';

import { BioApiService } from '../api/api.service';
import { PasswordResetRequest } from '../models';

@Injectable()
export class AuthApiService {

  constructor(private api: BioApiService) {
  }

  requestPasswordReset(passwordResetRequest: PasswordResetRequest): Observable<PasswordResetRequest> {
    return this.api
      .post(`/auth/passwordReset`, passwordResetRequest)
      .execute()
      .map(res => new PasswordResetRequest(res.json()));
  }

}
