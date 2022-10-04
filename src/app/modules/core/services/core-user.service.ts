import { Injectable } from '@angular/core';
import { Observable, tap, catchError, throwError } from 'rxjs';

import { IDeleteUser, IUserSettings } from '../models/user-settings.model'
import { ConfigService } from 'src/app/services/config.service';
import { IUserStats } from '../models/app.model';
import { RequestService } from '../../shared/services/http-requests.module';
@Injectable()

export class UserService {
  constructor(
    private requestService: RequestService,
    private configService: ConfigService
  ) { }

  modifyUser(userData: IUserSettings): Observable<any> {
    return this.requestService.httpPost(this.configService.modifyUser, userData)
  }
	
	deleteUser(userData: IDeleteUser): Observable<any> {
		return this.requestService.httpPost(this.configService.deleteUser, userData)
	}

  getUserStats(): Observable<any> {
    return this.requestService.httpGet(this.configService.userStats)
  }

}